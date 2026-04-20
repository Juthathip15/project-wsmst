const API_BASE = "http://127.0.0.1:8080/api/v1";

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/login`, {
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
  const res = await fetch(`${API_BASE}/profile`, {
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
  const res = await fetch(`${API_BASE}/patients`, {
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
  const res = await fetch(`${API_BASE}/health-records`, {
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
  const res = await fetch(`${API_BASE}/patients/${patientId}/history`, {
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
  const res = await fetch(`${API_BASE}/register`, {
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

export async function getUsage(token) {
  const res = await fetch(`${API_BASE}/usage`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

export async function subscribePlan(token, plan) {
  const res = await fetch(`${API_BASE}/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ plan }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}
export async function getApiProductBySlug(slug) {
  const res = await fetch(`${API_BASE}/api-products/${slug}`);

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}
export async function getApiProducts() {
  const res = await fetch(`${API_BASE}/api-products`);

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}