import { FiBarChart2, FiFolder, FiShield, FiTrendingUp, FiDollarSign } from 'react-icons/fi';
import styles from './FeaturesBar.module.css';

const features = [
  { Icon: FiBarChart2, title: 'Accurate', desc: 'Every number matters.' },
  { Icon: FiFolder, title: 'Organized', desc: 'Clean books. Clear view.' },
  { Icon: FiShield, title: 'Trusted', desc: 'Reliable support you can count on.' },
  { Icon: FiTrendingUp, title: 'Growth Focused', desc: 'Insights that drive your business forward.' },
  { Icon: FiDollarSign, title: 'Profit Driven', desc: 'Better numbers. Stronger bottom line.' },
];

export default function FeaturesBar() {
  return (
    <section className={styles.bar}>
      <div className="container">
        <div className={styles.grid}>
          {features.map(({ Icon, title, desc }) => (
            <div key={title} className={styles.item}>
              <div className={styles.icon}><Icon size={24} /></div>
              <div className={styles.title}>{title}</div>
              <div className={styles.desc}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
