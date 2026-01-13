require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");

const app = express();
app.use(cors());
app.use(express.json());

// =======================================================
// OAuth2 CLIENT
// =======================================================
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.SECRET_ID,
  process.env.REDIRECT
);

// =======================================================
// ROUTE: LOGIN / HOME
// =======================================================
app.get("/", (req, res) => {
  try {
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/calendar.readonly"],
    });
    res.redirect(url);
  } catch (err) {
    console.error("OAuth URL generation error:", err);
    res.sendStatus(500); // klient NIC nie widzi
  }
});

// =======================================================
// ROUTE: REDIRECT (GOOGLE CALLBACK)
// =======================================================
app.get("/redirect", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    console.error("No code in redirect");
    return res.sendStatus(400); // brak komunikatu dla klienta
  }

  oauth2Client.getToken(code, (err, tokens) => {
    if (err) {
      console.error("Could not get token:", err);
      return res.sendStatus(500);
    }

    oauth2Client.setCredentials(tokens);
    res.sendStatus(204); // sukces, ale bez tekstu
  });
});

// =======================================================
// ROUTE: GET CALENDARS
// =======================================================
app.get("/calendar", async (req, res) => {
  try {
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const response = await calendar.calendarList.list();
    const calendars = response.data.items;
    res.json(calendars);
  } catch (err) {
    console.error("Error fetching calendars:", err);
    res.sendStatus(500);
  }
});

// =======================================================
// ROUTE: GET EVENTS
// =======================================================
app.get("/events", async (req, res) => {
  const calendarId = req.query.calendarId ?? "primary";

  try {
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const response = await calendar.events.list({
      calendarId,
      timeMin: new Date().toISOString(),
      maxResults: 15,
      singleEvents: true,
      orderBy: "startTime",
    });
    const events = response.data.items;
    res.json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.sendStatus(500);
  }
});

// =======================================================
// START SERVER
// =======================================================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`✅ Backend działa na http://localhost:${PORT}`)
);
