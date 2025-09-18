const API_URL = "http://localhost:4000/api"; // tu backend

export async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  return res.json();
}
