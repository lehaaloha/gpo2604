const PATHS = {
  home: 'M4 11.5 12 4l8 7.5M6 10v9h5v-5h2v5h5v-9',
  tests: 'M8 4h8v3H8zM6 7h12v13H6zM9 12h6M9 15h6',
  chart: 'M5 20V10M12 20V4M19 20v-7',
  flag: 'M6 21V4h11l-3 4 3 4H6',
  route: 'M6 19a3 3 0 1 1 0-6 3 3 0 0 1 0 6ZM18 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.5 15 15.5 9',
  users: 'M8 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 20a5.5 5.5 0 0 1 11 0M17 12a3 3 0 1 0 0-6M21.5 20a5 5 0 0 0-6-4.9',
  plus: 'M12 5v14M5 12h14',
  review: 'M7 3h10v18l-5-3-5 3Z',
  briefcase: 'M4 8h16v11H4zM8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M4 13h16',
  shield: 'M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z',
  list: 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  settings: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19.4 13.5c.1-.5.1-1 0-1.5l1.6-1.2-1.5-2.6-1.9.6a6.6 6.6 0 0 0-1.3-.8l-.3-2H9l-.3 2c-.5.2-.9.5-1.3.8l-1.9-.6-1.5 2.6L5.6 12c-.1.5-.1 1 0 1.5L4 14.7l1.5 2.6 1.9-.6c.4.3.8.6 1.3.8l.3 2h5l.3-2c.5-.2.9-.5 1.3-.8l1.9.6 1.5-2.6z',
  bell: 'M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 13 6 9ZM9.5 17.5a2.5 2.5 0 0 0 5 0',
  logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
};


function Icon({ name, size = 20 }) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

export default Icon;