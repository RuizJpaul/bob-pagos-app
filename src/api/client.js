const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

async function request(path, { method = 'GET', body = null, headers = {}, signal } = {}) {
  const url = `${API_BASE}${path}`;
  const opts = { method, headers: { ...headers }, signal };

  if (body instanceof FormData) {
    opts.body = body;
  } else if (body != null) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }

  const res = await fetch(url, opts);
  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  if (!res.ok) {
    const payload = isJson ? await res.json() : { message: await res.text() };
    const error = new Error(payload.message || `HTTP ${res.status}`);
    error.status = res.status;
    error.payload = payload;
    throw error;
  }
  return isJson ? await res.json() : null;
}

export default request;
