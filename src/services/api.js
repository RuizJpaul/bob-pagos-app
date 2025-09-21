const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

function getAuthHeaders() {
  try {
    const raw = localStorage.getItem('bob_user');
    if (!raw) return {};
    const user = JSON.parse(raw);
    return {
      'x-user-email': user.email,
      'x-user-id': user.id
    };
  } catch (e) {
    return {};
  }
}

/**
 * apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email }) })
 * Returns parsed JSON body (object) or throws Error with message.
 */
export async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const { headers = {}, ...rest } = options;
  const finalHeaders = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...headers
  };

  const res = await fetch(url, { headers: finalHeaders, ...rest });

  // if no content
  if (res.status === 204) return null;

  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }

  if (!res.ok) {
    // backend often returns { error: '...' } or similar
    const message = (data && (data.error || data.message)) || res.statusText || 'Error';
    throw new Error(message);
  }

  return data;
}
