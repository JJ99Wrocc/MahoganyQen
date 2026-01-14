// ===============================
// IMPORTY
// ===============================
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const crypto = require("crypto");
const path = require("path");

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

// ===============================
// KONFIGURACJA
// ===============================
const PORT = process.env.PORT || 3002;
const CALENDAR_ID =
  process.env.CALENDAR_ID ||
  "8b61c25a0e56dfc35848864ed7cf55fe06376af0f65f32690f30f8315a14d7e0@group.calendar.google.com";

// ===============================
// EXPRESS
// ===============================
const app = express();
app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

// ===============================
// SECURITY CORE
// ===============================
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

// ===============================
// RATE LIMIT
// ===============================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 80,
});
app.use(limiter);

// ===============================
// TOKEN ANTI-BOT / ANTI-REPLAY
// ===============================
const tokens = new Map();

app.get("/token", (req, res) => {
  const token = crypto.randomUUID();
  tokens.set(token, Date.now() + 60000);
  res.json({ token });
});

// cleanup RAM
setInterval(() => {
  const now = Date.now();
  for (const [token, exp] of tokens.entries()) {
    if (exp < now) tokens.delete(token);
  }
}, 60000);

// ===============================
// MONGODB
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error", err));

// ===============================
// NODEMAILER
// ===============================
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// ===============================
// GOOGLE CALENDAR
// ===============================
const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
});

const calendar = google.calendar({ version: "v3", auth });

// ===============================
// EVENTS
// ===============================
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

// ===============================
// BOOKINGS (ONLY IDS)
app.get("/bookings", async (req, res) => {
  const bookings = await Booking.find({}, { slotId: 1, _id: 0 });
  res.json(bookings);
});

// ===============================
// BOOK SLOT
app.post("/book", async (req, res, next) => {
  try {
    const { token, id, name, email, date, time } = req.body;

    // TOKEN CHECK
    if (!tokens.has(token) || tokens.get(token) < Date.now()) {
      return res.status(403).json({ error: "Invalid token" });
    }
    tokens.delete(token);

    // INPUT VALIDATION
    if (typeof name !== "string" || name.length < 2 || name.length > 50) {
      return res.status(400).json({ error: "Invalid name" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (!id || !date || !time) {
      return res.status(400).json({ error: "Invalid booking data" });
    }

    // ATOMIC DB LOCK
    try {
      await Booking.create({
        slotId: id,
        name,
        email,
        date,
        time,
      });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({ error: "Slot already booked" });
      }
      throw err;
    }

    await transporter.sendMail({
      from: `"Booking" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Potwierdzenie rezerwacji ✅",
      text: `Cześć ${name},

📅 ${date}
⏰ ${time}

Do zobaczenia!`,
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// ===============================
// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err);
  res.status(500).json({ error: "Internal server error" });
});

// ===============================
// Serwowanie frontendu React
// ===============================
// Serwowanie statycznego frontendu
// ZAMIANA wildcard GET "*" na Express 5 friendly


app.use(express.static(path.join(__dirname, "my-app/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "my-app/build", "index.html"));
});
// ===============================
// START
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
