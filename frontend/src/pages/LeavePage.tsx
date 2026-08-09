import { useState, type FormEvent } from 'react';
import leaveRequests from '../data/leaveRequests.json';
import styles from '../styles/app.module.css';

function LeavePage() {
  const [requests, setRequests] = useState(leaveRequests);
  const [form, setForm] = useState({ employee: '', type: 'Vacation', start: '', end: '', status: 'Pending' });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRequests((current) => [
      ...current,
      {
        id: Date.now(),
        employee: form.employee,
        type: form.type,
        start: form.start,
        end: form.end,
        status: form.status
      }
    ]);
    setForm({ employee: '', type: 'Vacation', start: '', end: '', status: 'Pending' });
  };

  return (
    <div className={styles.pageCard}>
      <h2 className={styles.pageTitle}>Leave</h2>
      <p className={styles.pageSubtitle}>Track employee leave requests and submit new requests.</p>
      <div className={styles.grid}>
        <div className={styles.tableCard}>
          <h3>Leave Requests</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.employee}</td>
                  <td>{request.type}</td>
                  <td>{request.start}</td>
                  <td>{request.end}</td>
                  <td>{request.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.formCard}>
          <h3>Request Leave</h3>
          <form className={styles.formGrid} onSubmit={handleSubmit}>
            <label>
              Employee
              <input value={form.employee} onChange={(event) => setForm({ ...form, employee: event.target.value })} required />
            </label>
            <label>
              Leave Type
              <select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}>
                <option value="Vacation">Vacation</option>
                <option value="Sick">Sick</option>
                <option value="Personal">Personal</option>
              </select>
            </label>
            <label>
              Start Date
              <input type="date" value={form.start} onChange={(event) => setForm({ ...form, start: event.target.value })} required />
            </label>
            <label>
              End Date
              <input type="date" value={form.end} onChange={(event) => setForm({ ...form, end: event.target.value })} required />
            </label>
            <label>
              Status
              <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
              </select>
            </label>
            <div style={{ gridColumn: '1 / -1' }}>
              <button type="submit">Submit Request</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LeavePage;
