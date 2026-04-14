import { useEffect, useState } from "react";
import {
  createHealthRecord,
  getPatientHistory,
  getPatients,
  getProfile,
  getUsage,
  login,
  register,
} from "./api/api";

import AnalysisResult from "./components/AnalysisResult";
import HealthRecordForm from "./components/HealthRecordForm";
import LoginForm from "./components/LoginForm";
import PatientList from "./components/PatientList";
import RegisterForm from "./components/RegisterForm";
import UsageDashboard from "./components/UsageDashboard";
import PricingPage from "./components/PricingPage";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [history, setHistory] = useState([]);
  const [usage, setUsage] = useState(null);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  async function handleLogin(email, password) {
    const data = await login(email, password);
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    setError("");
  }

  async function handleRegister(formData) {
    await register(formData);
    alert("Register success! Please login.");
    setIsRegister(false);
    setError("");
  }

  async function loadPatients(currentToken) {
    setLoadingPatients(true);
    setError("");
    try {
      const data = await getPatients(currentToken);
      setPatients(data);
    } catch (err) {
      setError(err.message || "Failed to load patients");
    } finally {
      setLoadingPatients(false);
    }
  }

  async function loadHistory(patientId, currentToken = token) {
    try {
      const data = await getPatientHistory(currentToken, patientId);
      setHistory(data);
    } catch (err) {
      setHistory([]);
      setError(err.message || "Failed to load history");
    }
  }

  async function loadUsage(currentToken = token) {
    try {
      const data = await getUsage(currentToken);
      setUsage(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load usage");
    }
  }

  async function handleCreateRecord(payload) {
    await createHealthRecord(token, payload);
    await loadHistory(payload.patientId);
    await loadUsage(token);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setPatients([]);
    setSelectedPatient(null);
    setHistory([]);
    setUsage(null);
    setError("");
    setIsRegister(false);
    setShowPricing(false);
  }

  useEffect(() => {
    if (token) {
      loadPatients(token);
      loadUsage(token);
    }
  }, [token]);

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const profile = await getProfile(token);
        setUser(profile);
      } catch (err) {
        console.error(err);
      }
    }

    if (token && !user) {
      loadUserProfile();
    }
  }, [token, user]);

  useEffect(() => {
    if (selectedPatient) {
      loadHistory(selectedPatient.id);
    }
  }, [selectedPatient]);

  if (!token) {
    return (
      <div className="container">
        <h1>Health Data Platform</h1>

        {error && <p className="error">{error}</p>}

        {isRegister ? (
          <RegisterForm onRegister={handleRegister} />
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}

        <div style={{ marginTop: "16px" }}>
          <button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Go to Login" : "Create Account"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="topbar">
        <div className="topbar-left">
          <h1>Health Data Platform</h1>
          <button
            className="secondary-btn"
            onClick={() => setShowPricing(!showPricing)}
          >
            {showPricing ? "Back to Dashboard" : "View Pricing"}
          </button>
        </div>

        <div className="topbar-right">
          <span>{user?.fullName || "User"}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      {showPricing ? (
        <PricingPage
  token={token}
  currentPlan={usage?.plan || user?.plan || "basic"}
  onPlanChanged={async () => {
    await loadUsage(token);
    const profile = await getProfile(token);
    setUser(profile);
  }}
/>
      ) : (
        <>
          {loadingPatients && <p>Loading patients...</p>}

          <div className="grid">
            <PatientList
              patients={patients}
              selectedPatientId={selectedPatient?.id}
              onSelectPatient={setSelectedPatient}
            />

            <HealthRecordForm
              patient={selectedPatient}
              onCreateRecord={handleCreateRecord}
            />

            <AnalysisResult history={history} />

            <UsageDashboard usage={usage} />
          </div>
        </>
      )}
    </div>
  );
}