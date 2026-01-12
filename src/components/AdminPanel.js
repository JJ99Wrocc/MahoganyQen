import React, { useState } from "react";
import { db } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";

function AdminPanel() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleAddSlot = async () => {
    if (!date || !time) return alert("Wypełnij datę i godzinę!");
    try {
      await addDoc(collection(db, "availableSlots"), {
        date: date.trim(), // np. "2026-01-01"
        time: time.trim()  // np. "10:00"
      });
      alert("Dodano nowy slot!");
      setDate("");
      setTime("");
    } catch (err) {
      console.error(err);
      alert("Błąd przy dodawaniu slotu.");
    }
  };

  return (
    <div>
      <h2>Panel – dodaj dostępne godziny</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button onClick={handleAddSlot}>Dodaj slot</button>
    </div>
  );
}

export default AdminPanel;
