const API_BASE = "http://127.0.0.1:8080";

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

export async function getProfile(token) {
  const res = await fetch(`${API_BASE}/api/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

export async function getPatients(token) {
  const res = await fetch(`${API_BASE}/api/patients`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

export async function createHealthRecord(token, payload) {
  const res = await fetch(`${API_BASE}/api/health-records`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

export async function getPatientHistory(token, patientId) {
  const res = await fetch(`${API_BASE}/api/patients/${patientId}/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

export async function register(data) {
  const res = await fetch(`${API_BASE}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}