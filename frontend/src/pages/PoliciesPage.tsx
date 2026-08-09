import { useState } from 'react';
import policies from '../data/policies.json';
import styles from '../styles/app.module.css';

function PoliciesPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={styles.pageCard}>
      <h2 className={styles.pageTitle}>Policies</h2>
      <p className={styles.pageSubtitle}>Expand each policy for more detail.</p>
      {policies.map((policy, index) => {
        const isOpen = index === openIndex;
        return (
          <div key={policy.title} className={styles.accordionItem}>
            <button className={styles.accordionHeader} onClick={() => setOpenIndex(isOpen ? null : index)}>
              {policy.title}
            </button>
            {isOpen ? <div className={styles.accordionBody}>{policy.body}</div> : null}
          </div>
        );
      })}
    </div>
  );
}

export default PoliciesPage;
