//ХАРДКОД все хранится в localstorage потом заменим на запросы к бд




const USERS_KEY = 'gpo_users';
const SESSION_KEY = 'gpo_session';


const DEMO_USERS = [
  { name: 'Тест Кандидат', email: 'candidate@test.ru', password: '123456', role: 'candidate' },
  { name: 'Тест HR', email: 'hr@test.ru', password: '123456', role: 'hr' },
  { name: 'Тест Руководитель', email: 'manager@test.ru', password: '123456', role: 'manager' },
  { name: 'Тест Админ', email: 'admin@test.ru', password: '123456', role: 'admin' },
];

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Регистрация: отправляем данные на бэкенд (POST /api/auth/register)
export async function register({ firstName, lastName, email, phone, password }) {
  try {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        password,
      }),
    });

    if (res.ok) return { ok: true };

    const data = await res.json().catch(() => ({}));
    if (res.status === 409) return { ok: false, error: data.detail };
    if (res.status === 422) return { ok: false, error: 'Проверьте правильность введённых данных' };
    return { ok: false, error: 'Ошибка сервера, попробуйте позже' };
  } catch {
    return { ok: false, error: 'Нет связи с сервером' };
  }
}

// Вход: проверяем email и пароль, запоминаем, кто вошёл
export async function login(email, password) {
  const user = [...DEMO_USERS, ...readUsers()].find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return { ok: false, error: 'Неверный email или пароль' };
  }

  const session = { name: user.name, email: user.email, role: user.role };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { ok: true, session };
}

// Кто сейчас вошёл (или null, если никто)
export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

// Выход
export function logout() {
  localStorage.removeItem(SESSION_KEY);
}