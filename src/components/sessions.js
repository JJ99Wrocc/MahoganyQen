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

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const [company, setCompany] = useState("");

  const formLoadTime = useRef(Date.now());
  const lastSubmitTime = useRef(0);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  const fetchToken = () => {
    fetch("https://mahoganyqen.onrender.com/token")
      .then((res) => res.json())
      .then((data) => setToken(data.token))
      .catch(() => setToken(null));
  };

  useEffect(() => {
    fetchToken();
  }, []);

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
          calendarDesc: event.description || "",
          summary: event.summary || t("noDescription"),
        }));

      setAvailableSlots(slots);
    } catch (err) {
      console.error(err);
      alert(t("fetchErrorAlert"));
    }
  };

  useEffect(() => {
    fetchSlots();
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
      case "warszawa": return "available-day warszawa";
      case "londyn": return "available-day londyn";
      case "wroclaw": return "available-day wroclaw";
      default: return "available-day";
    }
  };

  const handleOpenCalendar = () => setOpenCalendar(prev => !prev);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setOpenCalendar(false);

    const formatted = formatDate(date);
    const hours = availableSlots.filter((slot) => slot.date === formatted);
    setAvailableHours(hours);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (company !== "") return;
    if (Date.now() - formLoadTime.current < 3000) return alert("Zbyt szybkie wysłanie formularza.");
    if (Date.now() - lastSubmitTime.current < 5000) return alert("Zbyt wiele prób. Odczekaj chwilę.");
    lastSubmitTime.current = Date.now();

    if (!selectedSlot || !name || !email || !token) return alert(t("fillAllFields"));
    if (name.length < 2 || name.length > 50) return alert(t("invalidName"));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert(t("invalidEmail"));

    setLoading(true);
    try {
      const res = await fetch("https://mahoganyqen.onrender.com/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedSlot.value,
          name, email, message,
          date: formatDate(selectedDate),
          time: selectedSlot.label,
          token, ts: Date.now(),
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
      setMessage("");
      setToken(null);
      fetchToken();
      fetchSlots();
    } catch {
      alert(t("bookingError"));
    } finally {
      setLoading(false);
    }
  };

  const selectStyles = {
    control: (provided) => ({ ...provided, minHeight: "40px", height: "40px", }),
    menu: (provided) => ({ ...provided, maxHeight: "150px", }),
    menuList: (provided) => ({ ...provided, maxHeight: "150px", }),
  };

  const slotOptions = availableHours.map((slot) => ({
    value: slot.id,
    label: `${slot.time} - ${slot.summary}`,
    calendarDesc: slot.calendarDesc,
  }));

  return (
    <div className="session-page-container">
      {/* BACKGROUND ELEMENTS */}
      <div className="session-bg-img" aria-hidden="true"></div>
      <div className="session-bg-overlay" aria-hidden="true"></div>
      <div className="session-bg-shadow-bottom" aria-hidden="true"></div>

      {/* 1. TYTUŁ NAD FORMULARZEM */}
      <header className="booking-pre-header">
          <div className="booking-ornament" aria-hidden="true">
              <span className="line"></span>
              <span className="diamond"></span>
              <span className="line"></span>
          </div>
          <p className="booking-status">{t("System Online Concierge")}</p>
          <h1 className="booking-main-title">{t("Reservation Protocol")}</h1>
      </header>

      {/* 2. FORMULARZ */}
      <section id="sessions-booking" className="session-booking" aria-labelledby="session-title">
        <div className="session-header">
          <h2 id="session-title">{t("bookSession")}</h2>
          <p id="session-desc">{t("chooseDateTime")}</p>
        </div>

        <form className="session-form" onSubmit={handleSubmit} noValidate>
          {/* Honeypot for bots */}
          <div style={{ display: "none" }} aria-hidden="true">
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} tabIndex="-1" autoComplete="off" />
          </div>

          <div className="form-group">
            <label id="label-date">{t("chooseDate")}:</label>
            <button 
              type="button" 
              className="date-open-btn" 
              onClick={handleOpenCalendar}
              aria-expanded={openCalendar}
              aria-haspopup="grid"
              aria-labelledby="label-date"
            >
              {selectedDate ? formatDate(selectedDate) : t("chooseDate")}
            </button>
          </div>

          {/* CALENDAR BLOCK */}
          <div 
            className="calendar-wrapper" 
            style={{ display: openCalendar ? "block" : "none" }}
            aria-hidden={!openCalendar}
          >
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
                  <span className="day-with-tooltip" data-tooltip={slot.summary}>{day}</span>
                ) : (
                  <span>{day}</span>
                );
              }}
            />
          </div>

          {availableHours.length > 0 && (
            <div className="form-group" aria-live="polite">
              <label htmlFor="hour-select">{t("chooseHour")}:</label>
              <Select
                id="hour-select"
                value={selectedSlot}
                onChange={setSelectedSlot}
                options={slotOptions}
                styles={selectStyles}
                placeholder={t("chooseHour")}
                aria-label={t("chooseHour")}
              />
              {selectedSlot && selectedSlot.calendarDesc && (
                <div className="slot-description-box" role="note">
                  <p className="slot-description-text">{selectedSlot.calendarDesc}</p>
                </div>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="user-name">{t("name")}:</label>
            <input 
              id="user-name"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              placeholder="Identities" 
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="user-email">E-mail:</label>
            <input 
              id="user-email"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="Secure Contact" 
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="user-message">{t("message") || "Additional Details"}:</label>
            <textarea 
              id="user-message"
              className="session-textarea" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              placeholder="Tell me more about your vision..."
              rows="4"
            />
          </div>

          <button 
            type="submit" 
            className="session-submit" 
            disabled={loading || !token}
            aria-busy={loading}
          >
            {loading ? t("processing") : t("bookSession")}
          </button>
        </form>
      </section>
    </div>
  );
}

export default Sessions;