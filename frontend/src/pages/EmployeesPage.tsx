import { useMemo, useState } from 'react';
import employees from '../data/employees.json';
import styles from '../styles/app.module.css';

function EmployeesPage() {
  const [query, setQuery] = useState('');

  const filteredEmployees = useMemo(() => {
    const normalizedQuery = query.toLowerCase();
    return employees.filter((employee) =>
      [employee.name, employee.role, employee.department, employee.email].some((field) => field.toLowerCase().includes(normalizedQuery))
    );
  }, [query]);

  return (
    <div className={styles.pageCard}>
      <h2 className={styles.pageTitle}>Employees</h2>
      <p className={styles.pageSubtitle}>Search the employee directory.</p>
      <input
        className={styles.searchBox}
        placeholder="Search by name, role, department, or email"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.email}>
                <td>{employee.name}</td>
                <td>{employee.role}</td>
                <td>{employee.department}</td>
                <td>{employee.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeesPage;
