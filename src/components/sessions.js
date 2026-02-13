import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/sessions.css";
import { useTranslation } from "react-i18next";
import i18n from "../i18n.js";
import Select from "react-select";

function Sessions() {
  const { t } = useTranslation();

  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableHours, setAvailableHours] = useState([]);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // 🔐 token anty-bot
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔐 DODANE: honeypot (bot trap)
  const [company, setCompany] = useState("");

  // 🔐 DODANE: anti-spam timing
  const formLoadTime = useRef(Date.now());
  const lastSubmitTime = useRef(0);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  // ===============================
  // 🔐 POBRANIE TOKENA (ANTI-BOT)
  // ===============================
  const fetchToken = () => {
    fetch("https://mahoganyqen.onrender.com/token")
      .then((res) => res.json())
      .then((data) => setToken(data.token))
      .catch(() => setToken(null));
  };

  useEffect(() => {
    fetchToken();
  }, []);

  // ===============================
  // POBIERANIE SLOTÓW Z KALENDARZA I BOOKINGÓW
  // ===============================
  const fetchSlots = async () => {
    try {
      const res = await fetch("https://mahoganyqen.onrender.com/events");
      if (!res.ok) throw new Error(t("backendNotResponding"));
      const data = await res.json();

      const bookedRes = await fetch("https://mahoganyqen.onrender.com/bookings");
      const booked = await bookedRes.json();

      const slots = data
        .filter((event) => !booked.some((b) => b.slotId === event.id))
        .map((event) => ({
          id: event.id,
          date: event.start.dateTime
            ? event.start.dateTime.split("T")[0]
            : event.start.date,
          time: event.start.dateTime
            ? event.start.dateTime.split("T")[1].slice(0, 5)
            : "",
          summary: event.summary || t("noDescription"), // <- TO JEST TYTUŁ Z GOOGLE CALENDAR
        }));

      setAvailableSlots(slots);
    } catch (err) {
      console.error(err);
      alert(t("fetchErrorAlert"));
    }
  };

  useEffect(() => {
    fetchSlots();
    console.log("🔥 NEW BUILD LOADED");
  }, [t]);

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const availableDates = [...new Set(availableSlots.map((slot) => slot.date))];

  const normalizeCity = (str) =>
    str.toLowerCase().replace(/ą/g, "a").replace(/ł/g, "l");

  const getDayClassName = (date) => {
    const formatted = formatDate(date);
    const slot = availableSlots.find((s) => s.date === formatted);
    if (!slot) return "";

    switch (normalizeCity(slot.summary)) {
      case "warszawa":
        return "available-day warszawa";
      case "londyn":
        return "available-day londyn";
      case "wroclaw":
        return "available-day wroclaw";
      default:
        return "available-day";
    }
  };

  const handleOpenCalendar = () => setOpenCalendar(true);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setOpenCalendar(false);

    const formatted = formatDate(date);
    const hours = availableSlots.filter((slot) => slot.date === formatted);
    setAvailableHours(hours);
  };

  // ===============================
  // 🔐 HANDLE SUBMIT (FULL HARDENED)
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (company !== "") return;

    if (Date.now() - formLoadTime.current < 3000) {
      return alert("Zbyt szybkie wysłanie formularza.");
    }

    if (Date.now() - lastSubmitTime.current < 5000) {
      return alert("Zbyt wiele prób. Odczekaj chwilę.");
    }
    lastSubmitTime.current = Date.now();

    if (!selectedSlot || !name || !email || !token) {
      return alert(t("fillAllFields"));
    }

    if (name.length < 2 || name.length > 50) {
      return alert(t("invalidName"));
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return alert(t("invalidEmail"));
    }

    setLoading(true);

    try {
      const res = await fetch("https://mahoganyqen.onrender.com/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedSlot.value,
          name,
          email,
          date: formatDate(selectedDate),
          time: selectedSlot.label,
          token,
          ts: Date.now(),
        }),
      });

      if (res.status === 403) {
        alert("Sesja wygasła. Odśwież stronę.");
        fetchToken();
        return;
      }

      if (res.status === 409) {
        alert(t("slotAlreadyBooked"));
        return;
      }

      if (!res.ok) throw new Error();

      alert(t("slotBooked"));

      setSelectedDate(null);
      setSelectedSlot(null);
      setAvailableHours([]);
      setName("");
      setEmail("");
      setCompany("");
      setToken(null);
      fetchToken();

      // 🔹 ODŚWIEŻ SLOTY, żeby zniknął z dostępnych
      fetchSlots();
    } catch {
      alert(t("bookingError"));
    } finally {
      setLoading(false);
    }
  };

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "40px",
      height: "40px",
    }),
    menu: (provided) => ({
      ...provided,
      maxHeight: "150px",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "150px",
    }),
  };

  const slotOptions = availableHours.map((slot) => ({
    value: slot.id,
    label: `${slot.time} - ${slot.summary}`,
  }));

  return (
    <section
      id="sessions-booking"
      className="session-booking"
      aria-label={t("bookingSession")}
    >
      <div className="session-header">
        <h2 id="session-title">{t("bookSession")}</h2>
        <p id="session-desc">{t("chooseDateTime")}</p>
      </div>

      <form className="session-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{ display: "none" }}
          tabIndex="-1"
          autoComplete="off"
        />

        <label>{t("chooseDate")}:</label>
        <button type="button" className="date-open-btn" onClick={handleOpenCalendar}>
          {t("chooseDate")}
        </button>

        <div className="calendar-wrapper" style={{ display: openCalendar ? "block" : "none" }}>
          <DatePicker
            key={availableDates.join(",")}
            selected={selectedDate}
            onChange={handleDateChange}
            minDate={new Date()}
            inline
            dayClassName={(date) => {
              const baseClass = getDayClassName(date);
              const formatted = formatDate(date);
              const slot = availableSlots.find((s) => s.date === formatted);
              return slot ? `${baseClass} day-with-tooltip` : baseClass;
            }}
            filterDate={(date) => availableDates.includes(formatDate(date))}
            renderDayContents={(day, date) => {
              const formatted = formatDate(date);
              const slot = availableSlots.find((s) => s.date === formatted);
              return slot ? (
                <span className="day-with-tooltip" data-tooltip={slot.summary}>
                  {day}
                </span>
              ) : (
                <span>{day}</span>
              );
            }}
          />
        </div>

        {availableHours.length > 0 && (
          <Select
            value={selectedSlot}
            onChange={setSelectedSlot}
            options={slotOptions}
            styles={selectStyles}
            placeholder={t("chooseHour")}
          />
        )}

        <label>{t("name")}:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />

        <label>E-mail:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} required />

        <button
          type="submit"
          className="session-submit"
          disabled={loading || !token}
        >
          {loading ? t("processing") : t("bookSession")}
        </button>
      </form>
    </section>
  );
}

export default Sessions;
  