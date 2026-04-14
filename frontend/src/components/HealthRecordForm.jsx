import { useState } from "react";

export default function HealthRecordForm({ patient, onCreateRecord }) {
  const [recordDate, setRecordDate] = useState("2026-04-13");
  const [note, setNote] = useState("annual checkup");
  const [bmi, setBmi] = useState("27.5");
  const [bloodSugar, setBloodSugar] = useState("130");
  const [cholesterol, setCholesterol] = useState("210");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function getBMIStatus(value) {
    const v = Number(value);
    if (v < 18.5) return "low";
    if (v < 25) return "normal";
    if (v < 30) return "risk";
    return "high";
  }

  function getSugarStatus(value) {
    const v = Number(value);
    if (v < 100) return "normal";
    if (v < 126) return "risk";
    return "high";
  }

  function getCholesterolStatus(value) {
    const v = Number(value);
    if (v < 200) return "normal";
    if (v < 240) return "risk";
    return "high";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const payload = {
        patientId: patient.id,
        recordDate,
        note,
        items: [
          {
            itemType: "BMI",
            value: Number(bmi),
            unit: "kg/m2",
            status: getBMIStatus(bmi),
          },
          {
            itemType: "Blood Sugar",
            value: Number(bloodSugar),
            unit: "mg/dL",
            status: getSugarStatus(bloodSugar),
          },
          {
            itemType: "Cholesterol",
            value: Number(cholesterol),
            unit: "mg/dL",
            status: getCholesterolStatus(cholesterol),
          },
        ],
      };

      await onCreateRecord(payload);
      setMessage("Health record created successfully");
    } catch (err) {
      setError(err.message || "Failed to create health record");
    }
  }

  if (!patient) {
    return (
      <div className="card">
        <h2>Health Record</h2>
        <p>Please select a patient first</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Create Health Record</h2>
      <p>
        Selected patient: <strong>{patient.fullName}</strong>
      </p>

      <form onSubmit={handleSubmit} className="form">
        <input type="date" value={recordDate} onChange={(e) => setRecordDate(e.target.value)} />
        <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note" />
        <input type="number" step="0.1" value={bmi} onChange={(e) => setBmi(e.target.value)} placeholder="BMI" />
        <input
          type="number"
          step="0.1"
          value={bloodSugar}
          onChange={(e) => setBloodSugar(e.target.value)}
          placeholder="Blood Sugar"
        />
        <input
          type="number"
          step="0.1"
          value={cholesterol}
          onChange={(e) => setCholesterol(e.target.value)}
          placeholder="Cholesterol"
        />
        <button type="submit">Save Record</button>
      </form>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}