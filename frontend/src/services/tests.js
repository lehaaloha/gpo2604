const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch {
    throw { status: 0, detail: 'Нет связи с сервером' };
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw { status: response.status, detail: data?.detail };
  }
  return data;
}

export const getMyTests = () => request('/api/tests/my');

export const startTest = (sessionId) =>
  request(`/api/tests/${sessionId}/start`, { method: 'POST' });

export const saveAnswer = (sessionId, questionId, optionIds, text) =>
  request(`/api/tests/${sessionId}/answers/${questionId}`, {
    method: 'PUT',
    body: JSON.stringify({ option_ids: optionIds, text }),
  });

export const finishTest = (sessionId) =>
  request(`/api/tests/${sessionId}/finish`, { method: 'POST' });

export const getResult = (sessionId) => request(`/api/tests/${sessionId}/result`);