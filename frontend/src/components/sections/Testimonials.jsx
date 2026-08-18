import { useState, useEffect } from 'react';
import { FiStar } from 'react-icons/fi';
import { testimonialAPI } from '../../utils/api';
import styles from './Testimonials.module.css';

const fallback = [
  { _id: '1', name: 'Mike R.', businessName: 'Island Excavation Ltd.', businessType: 'Excavation & Landscaping', location: 'Nanaimo, BC', quote: "Before Streamside, I was spending my evenings trying to figure out QuickBooks. Now I actually get to relax after work. Wendy keeps everything organized and I always know where my business stands.", rating: 5 },
  { _id: '2', name: 'Sarah L.', businessName: 'Pacific Coast Painting', businessType: 'Painting Contractor', location: 'Victoria, BC', quote: "I came to Wendy with two years of messy books and was embarrassed about the state they were in. She never made me feel judged—just got to work and cleaned everything up. Highly recommend.", rating: 5 },
  { _id: '3', name: 'Dave K.', businessName: 'Coastal Property Services', businessType: 'Property Maintenance', location: 'Courtenay, BC', quote: "Streamside Bookkeeping takes care of everything—payroll, GST filings, monthly reports. I spend my time on the business, not the books. Best investment I've made.", rating: 5 },
];

export default function Testimonials() {
  const [items, setItems] = useState(fallback);

  useEffect(() => {
    testimonialAPI.getPublic()
      .then(r => { if (r.data.testimonials?.length) setItems(r.data.testimonials); })
      .catch(() => {});
  }, []);

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: 52 }}>
          <span className="eyebrow">Client Stories</span>
          <h2 className="section-title">What Vancouver Island Business Owners Say</h2>
        </div>
        <div className={styles.grid}>
          {items.slice(0, 3).map(t => (
            <div key={t._id} className={styles.card}>
              <div className={styles.stars}>
                {[...Array(t.rating || 5)].map((_, i) => <FiStar key={i} className={styles.star} />)}
              </div>
              <blockquote className={styles.quote}>"{t.quote}"</blockquote>
              <div className={styles.author}>
                <div className={styles.avatar}>
                  {t.avatarUrl
                    ? <img src={t.avatarUrl} alt={t.name} />
                    : <span>{t.name.charAt(0)}</span>}
                </div>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.biz}>{t.businessName}{t.location && ` · ${t.location}`}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
