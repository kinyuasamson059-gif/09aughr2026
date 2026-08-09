import { Routes, Route, NavLink } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LeavePage from './pages/LeavePage';
import EmployeesPage from './pages/EmployeesPage';
import PoliciesPage from './pages/PoliciesPage';
import ChatWidget from './components/ChatWidget';
import styles from './styles/app.module.css';

const navItems = [
  { path: '/', label: 'Dashboard' },
  { path: '/leave', label: 'Leave' },
  { path: '/employees', label: 'Employees' },
  { path: '/policies', label: 'Policies' }
];

function App() {
  return (
    <div className={styles.appShell}>
      <aside className={styles.sidebar}>
        <div className={styles.brandBlock}>
          <h1>PeopleHub — HR Portal</h1>
          <p>Streamlined workforce support</p>
        </div>
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className={styles.contentArea}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/leave" element={<LeavePage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/policies" element={<PoliciesPage />} />
        </Routes>
      </main>
      <ChatWidget />
    </div>
  );
}

export default App;
