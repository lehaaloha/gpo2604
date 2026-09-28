import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import { ROLE_LIST, NAV } from '../data/cabinetData';
import './Cabinet.css';

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

  return (
    <div className="cabinet">
      <aside className="cabinet-sidebar">
        <div className="cabinet-brand">ГПО АСУ-2604</div>

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
          <p>Раздел «{currentItem?.label}» пока пуст.</p>
        </section>
      </main>
    </div>
  );
}

export default Cabinet;