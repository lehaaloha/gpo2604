export const ROLE_LIST = [
  { key: 'candidate', label: 'Кандидат' },
  { key: 'hr', label: 'HR-менеджер' },
  { key: 'manager', label: 'Руководитель' },
  { key: 'admin', label: 'Администратор' },
];


export const NAV = {
  candidate: [
    { id: 'overview', label: 'Обзор', icon: 'home' },
    { id: 'tests', label: 'Мои тестирования', icon: 'tests' },
    { id: 'results', label: 'Результаты', icon: 'chart' },
    { id: 'status', label: 'Статус заявки', icon: 'flag' },
    { id: 'roadmap', label: 'Роадмап развития', icon: 'route' },
  ],
  hr: [
    { id: 'overview', label: 'Обзор', icon: 'home' },
    { id: 'constructor', label: 'Конструктор опросов', icon: 'plus' },
    { id: 'bank', label: 'Банк вопросов', icon: 'list' },
    { id: 'candidates', label: 'База кандидатов', icon: 'users' },
    { id: 'decisions', label: 'Решения о найме', icon: 'flag' },
    { id: 'performance', label: 'Performance Review', icon: 'review' },
  ],
  manager: [
    { id: 'overview', label: 'Обзор', icon: 'home' },
    { id: 'candidates', label: 'Кандидаты на вакансии', icon: 'users' },
    { id: 'approvals', label: 'Согласование найма', icon: 'flag' },
    { id: 'performance', label: 'Performance Review', icon: 'review' },
    { id: 'requests', label: 'Запрос на подбор', icon: 'briefcase' },
  ],
  admin: [
    { id: 'overview', label: 'Обзор', icon: 'home' },
    { id: 'users', label: 'Пользователи', icon: 'users' },
    { id: 'bank', label: 'Банк вопросов', icon: 'list' },
    { id: 'roles', label: 'Роли и права', icon: 'shield' },
    { id: 'logs', label: 'Журналы', icon: 'list' },
    { id: 'ai', label: 'AI-модули', icon: 'settings' },
  ],
};