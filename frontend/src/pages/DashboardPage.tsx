import dashboard from '../data/dashboard.json';
import styles from '../styles/app.module.css';

function DashboardPage() {
  return (
    <div className={styles.pageCard}>
      <h2 className={styles.pageTitle}>Dashboard</h2>
      <p className={styles.pageSubtitle}>A quick overview of people operations.</p>
      <div className={`${styles.grid} ${styles.grid3}`}>
        <div className={styles.statTile}>
          <h3>Greeting</h3>
          <p className={styles.statValue}>{dashboard.greeting}</p>
        </div>
        {dashboard.stats.map((item) => (
          <div key={item.title} className={styles.statTile}>
            <h3>{item.title}</h3>
            <p className={styles.statValue}>{item.value}</p>
          </div>
        ))}
      </div>
      <div className={styles.tableCard} style={{ marginTop: '16px' }}>
        <h3>Recent Announcements</h3>
        <ul className={styles.list}>
          {dashboard.announcements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DashboardPage;
