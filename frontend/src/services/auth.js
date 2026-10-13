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

// Регистрация: запоминаем нового кандидата
export async function register({ name, email, phone, password }) {
  const allUsers = [...DEMO_USERS, ...readUsers()];

  if (allUsers.some((u) => u.email === email)) {
    return { ok: false, error: 'Этот email уже зарегистрирован' };
  }

  const user = { name, email, phone, password, role: 'candidate' };
  localStorage.setItem(USERS_KEY, JSON.stringify([...readUsers(), user]));
  return { ok: true };
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