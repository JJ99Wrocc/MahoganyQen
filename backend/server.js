// ===============================
// IMPORTY
// ===============================
require("dotenv").config();
const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { google } = require("googleapis");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const crypto = require("crypto");
const { Resend } = require('resend'); // Zmiana na Resend
const compression = require('compression');
const serviceAccount = {
  type: "service_account",
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_URL
};

const Booking = require("./models/Booking");


const PORT = process.env.PORT || 3002;
const CALENDAR_ID =
  process.env.CALENDAR_ID ||
  "8b61c25a0e56dfc35848864ed7cf55fe06376af0f65f32690f30f8315a14d7e0@group.calendar.google.com";

const resend = new Resend(process.env.SMTP_PASS);


const app = express();

app.set('trust proxy', 1);

app.get("/", (req, res) => {
  res.status(200).send("API is running");
});


app.use(helmet());
app.disable("x-powered-by");

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://mahoganyqen.com"
        : "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: false,
  })
);

app.use(bodyParser.json({ limit: "10kb" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 80,
});
app.use(limiter);

const tokens = new Map();

app.get("/token", (req, res) => {
  const token = crypto.randomUUID();
  tokens.set(token, Date.now() + 60000);
  res.json({ token });
});

setInterval(() => {
  const now = Date.now();
  for (const [token, exp] of tokens.entries()) {
    if (exp < now) tokens.delete(token);
  }
}, 60000);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error", err));

console.log("✅ Resend Email API initialized");


const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
});

const calendar = google.calendar({ version: "v3", auth });


app.get("/events", async (req, res) => {
  try {
    const response = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: new Date().toISOString(),
      maxResults: 2500,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items.map((e) => ({
      id: e.id,
      start: e.start,
      end: e.end,
      summary: e.summary || "",
    }));

    res.json(events);
  } catch {
    res.status(500).json({ error: "Calendar error" });
  }
});

app.get("/bookings", async (req, res) => {
  const bookings = await Booking.find({}, { slotId: 1, _id: 0 });
  res.json(bookings);
});


app.post("/book", async (req, res, next) => {
  try {
    const { token, id, name, email, date, time, phone, message } = req.body;

    // 1. Walidacja tokenu
    if (!tokens.has(token) || tokens.get(token) < Date.now()) {
      return res.status(403).json({ error: "Invalid token" });
    }
    tokens.delete(token);

    // 2. Zapis do MongoDB (Telefon i Message)
    try {
      await Booking.create({
        slotId: id,
        name,
        email,
        date,
        phone,
        time,
        message,
      });
      console.log("✅ Zapisano w MongoDB");
    } catch (err) {
      if (err.code === 11000) return res.status(409).json({ error: "Slot already booked" });
      throw err;
    }

    // 3. Wysyłka e-maila przez Resend (Poprawny format await)
    console.log("🔹 Próba wysyłki e-maila do:", email);
    
    try {
      const emailData = await resend.emails.send({
        from: 'rezerwacje@mahoganyqen.com',
        to: [email],
        cc: ['Mahoganyqencontact@gmail.com'],
        subject: "Potwierdzenie rezerwacji ✅",
        html: `
          <div style="font-family: sans-serif; line-height: 1.5;">
            <h2>Cześć ${name}!</h2>
            <p>Twoja rezerwacja została potwierdzona.</p>
            <ul>
              <li><strong>Data:</strong> ${date}</li>
              <li><strong>Godzina:</strong> ${time}</li>
              <li><strong>Telefon:</strong> ${phone}</li>
              <li><strong>Wiadomość:</strong> ${message || "Brak dodatkowych informacji"}</li>
            </ul>
            <hr />
            <p>To jest automatyczne potwierdzenie systemu Mahoganyqen.</p>
          </div>
        `
      });
      console.log("✅ E-mail wysłany:", emailData);
    } catch (mailError) {
      // Logujemy błąd maila, ale nie crashujemy serwera
      console.error("❌ Błąd Resend:", mailError.message);
    }

    // 4. JEDYNA odpowiedź do klienta (na samym końcu, po wszystkim)
    return res.status(200).json({ success: true, message: "Rezerwacja zakończona!" });

  } catch (err) {
    console.error("🔥 Krytyczny błąd serwera:", err);
    if (!res.headersSent) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
});

// ===============================
// ERROR HANDLER & STATIC FILES (ELITE CACHE VERSION)
// ===============================

// Aktywujemy kompresję Gzip - to sprawi, że pliki będą 3x lżejsze do pobrania
app.use(compression());

// Globalny handler błędów
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err);
  if (!res.headersSent) {
    res.status(500).json({ error: "Internal server error" });
  }
});


app.use('/static', express.static(path.join(__dirname, 'my-app/build/static'), {
    maxAge: '31536000s', immutable: true , etag: true }));

app.get(/^(?!\/(events|bookings|book|token)).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, "my-app/build", "index.html"));
});

// 4. START SERWERA
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
