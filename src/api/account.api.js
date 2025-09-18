const API_URL = import.meta.env.VITE_API_URL;

export async function getAccount(email) {
  const res = await fetch(`${API_URL}/accounts/${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error("Error al obtener cuenta");
  return res.json();
}
