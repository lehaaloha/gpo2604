import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import { ROLE_LIST, NAV } from '../data/cabinetData';
import { getMyTests } from '../services/tests';
import './Cabinet.css';



function CandidateOverview() {
  const stats = {};
  const notifications = [];

  return (
    <div className="overview-grid">
      <div className="card stat-card">
        <span className="stat-label">Назначено тестов</span>
        <span className="stat-value">{stats.assignedTests ?? '—'}</span>
      </div>

      <div className="card stat-card">
        <span className="stat-label">Пройдено</span>
        <span className="stat-value">{stats.completedTests ?? '—'}</span>
      </div>

      <div className="card stat-card">
        <span className="stat-label">Статус заявки</span>
        <span className="stat-value">{stats.applicationStatus ?? '—'}</span>
      </div>

      <div className="card wide-card">
        <h2>Мои тестирования</h2>
        <p className="empty-hint">Пока нет назначенных тестирований.</p>
      </div>

      <div className="card wide-card">
        <h2>Уведомления</h2>

        {notifications.length === 0 ? (
          <p className="empty-hint">Новых уведомлений нет.</p>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className="notification-item">
              <span>{n.text}</span>
              <span>{n.date}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
function HrOverview() {
  const stats = {};
  const awaitingDecision = [];
  const hiringRequests = [];
  const notifications = [];

  return (
    <div className="overview-grid overview-grid-4">
      <div className="card stat-card">
        <span className="stat-label">Кандидатов в базе</span>
        <span className="stat-value">{stats.candidatesTotal ?? '—'}</span>
      </div>

      <div className="card stat-card">
        <span className="stat-label">Активных опросов</span>
        <span className="stat-value">{stats.activeSurveys ?? '—'}</span>
      </div>

      <div className="card stat-card">
        <span className="stat-label">Ждут решения</span>
        <span className="stat-value">{stats.awaitingDecision ?? '—'}</span>
      </div>

      <div className="card stat-card">
        <span className="stat-label">Performance Review в процессе</span>
        <span className="stat-value">{stats.reviewsInProgress ?? '—'}</span>
      </div>

      <div className="card wide-card">
        <h2>Ждут решения</h2>
        {awaitingDecision.length === 0 ? (
          <p className="empty-hint">Нет кандидатов, ожидающих решения.</p>
        ) : (
          awaitingDecision.map((c) => (
            <div key={c.id} className="candidate-item">
              <span>{c.name}</span>
              <span>{c.vacancy}</span>
            </div>
          ))
        )}
      </div>

      <div className="card wide-card">
        <h2>Запросы на подбор</h2>
        {hiringRequests.length === 0 ? (
          <p className="empty-hint">Новых запросов нет.</p>
        ) : (
          hiringRequests.map((r) => (
            <div key={r.id} className="request-item">
              <span>{r.title}</span>
              <span>{r.manager}</span>
            </div>
          ))
        )}
      </div>

      <div className="card wide-card">
        <h2>Уведомления</h2>
        {notifications.length === 0 ? (
          <p className="empty-hint">Новых уведомлений нет.</p>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className="notification-item">
              <span>{n.text}</span>
              <span>{n.date}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


function ManagerOverview() {
  const stats = {};
  const awaitingConclusion = [];
  const notifications = [];

  return (
    <div className="overview-grid overview-grid-4">
      <div className="card stat-card">
        <span className="stat-label">Кандидатов на мои вакансии</span>
        <span className="stat-value">{stats.candidatesOnMyVacancies ?? '—'}</span>
      </div>

      <div className="card stat-card">
        <span className="stat-label">Ждут заключения</span>
        <span className="stat-value">{stats.awaitingConclusion ?? '—'}</span>
      </div>

      <div className="card stat-card">
        <span className="stat-label">Ревью к заполнению</span>
        <span className="stat-value">{stats.reviewsToFill ?? '—'}</span>
      </div>

      <div className="card stat-card">
        <span className="stat-label">Запросов на подбор</span>
        <span className="stat-value">{stats.hiringRequests ?? '—'}</span>
      </div>

      <div className="card wide-card">
        <h2>Ждут вашего заключения</h2>
        {awaitingConclusion.length === 0 ? (
          <p className="empty-hint">Нет кандидатов, ожидающих заключения.</p>
        ) : (
          awaitingConclusion.map((c) => (
            <div key={c.id} className="candidate-item">
              <span>{c.name}</span>
              <span>{c.vacancy}</span>
            </div>
          ))
        )}
      </div>

      <div className="card wide-card">
        <h2>Уведомления</h2>
        {notifications.length === 0 ? (
          <p className="empty-hint">Новых уведомлений нет.</p>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className="notification-item">
              <span>{n.text}</span>
              <span>{n.date}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}



function AdminOverview() {
  const stats = {};
  const aiModules = [];

  return (
    <div className="overview-grid">
      <div className="card stat-card">
        <span className="stat-label">Пользователей</span>
        <span className="stat-value">{stats.usersTotal ?? '—'}</span>
      </div>

      <div className="card stat-card">
        <span className="stat-label">Заблокированных</span>
        <span className="stat-value">{stats.usersBlocked ?? '—'}</span>
      </div>

      <div className="card stat-card">
        <span className="stat-label">Вопросов в банке</span>
        <span className="stat-value">{stats.questionsTotal ?? '—'}</span>
      </div>

      <div className="card wide-card">
        <h2>AI-модули</h2>
        {aiModules.length === 0 ? (
          <p className="empty-hint">Нет данных о модулях.</p>
        ) : (
          aiModules.map((m) => (
            <div key={m.id} className="module-item">
              <span>{m.name}</span>
              <span>{m.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}



const STATUS_LABELS = {
  available: 'Доступно',
  in_progress: 'Продолжить',
  in_review: 'На проверке',
  checked: 'Проверено',
};


function CandidateTests() {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getMyTests()
      .then(setTests)
      .catch((e) => setError(e.detail || 'Не удалось загрузить тестирования'))
      .finally(() => setLoading(false));
  }, []);

  function openTest(test) {
    if (test.status === 'available' || test.status === 'in_progress') {
      navigate(`/test/${test.session_id}`);
    } else {
      navigate(`/test/${test.session_id}/result`);
    }
  }

  if (loading) return <p className="empty-hint">Загрузка…</p>;
  if (error) return <p className="empty-hint">{error}</p>;
  if (tests.length === 0) return <p className="empty-hint">Назначенных тестирований пока нет</p>;

  return (
    <div className="tests-grid">
      {tests.map((test) => (
        <div className="test-card" key={test.session_id}>
          <h3>{test.title}</h3>
          <p>{test.vacancy}</p>
          <p>
            Вопросов: {test.questions_count} · {test.time_limit_minutes} мин
          </p>
          <span className="badge">{STATUS_LABELS[test.status]}</span>
          <button onClick={() => openTest(test)}>
            {test.status === 'available' && 'Начать'}
            {test.status === 'in_progress' && 'Продолжить'}
            {(test.status === 'in_review' || test.status === 'checked') && 'Результат'}
          </button>
        </div>
      ))}
    </div>
  );
}



function Cabinet() {
  const navigate = useNavigate();
  const [role, setRole] = useState('candidate');
  const [section, setSection] = useState('overview');

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setSection('overview');
  };

  const currentNav = NAV[role];
  const currentItem = currentNav.find((item) => item.id === section);

  function renderContent() {
    if (role === 'candidate' && section === 'overview'){
      return <CandidateOverview />;
    }
    if (role === 'hr' && section === 'overview') {
      return <HrOverview />;
    }
    if (role === 'manager' && section === 'overview') {
      return <ManagerOverview />;
    }
    if (role === 'admin' && section === 'overview') {
      return <AdminOverview />;
    }
    if (role === 'candidate' && section === 'tests'){
      return <CandidateTests />
    }
    
    return <p>Раздел «{currentItem?.label}» пока пуст.</p>
  }

  return (
    <div className="cabinet">
      <aside className="cabinet-sidebar">
        <div className="cabinet-brand">ТУТ ЛОГО</div>

        <label className="cabinet-role-switch">
          Роль (временно, для теста)
          <select value={role} onChange={handleRoleChange}>
            {ROLE_LIST.map((r) => (
              <option key={r.key} value={r.key}>{r.label}</option>
            ))}
          </select>
        </label>

        <nav className="cabinet-nav">
          {currentNav.map((item) => (
            <button
              key={item.id}
              className={item.id === section ? 'nav-item active' : 'nav-item'}
              onClick={() => setSection(item.id)}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="nav-item logout" onClick={() => navigate('/signin')}>
          <Icon name="logout" />
          <span>Выйти</span>
        </button>
      </aside>

      <main className="cabinet-main">
        <header className="cabinet-header">
          <h1>{currentItem?.label}</h1>
          <button className="bell" aria-label="Уведомления">
            <Icon name="bell" />
          </button>
        </header>

        <section className="cabinet-content">
          {renderContent()}
        </section>
      </main>
    </div>
  );
}

export default Cabinet;