import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
import { serviceAPI } from '../../utils/api';
import styles from './PricingSection.module.css';

const fallback = [
  { _id: '1', name: 'Essentials', tagline: 'Feel confident your books are taken care of.', price: '$345', priceNote: '/month + applicable taxes', features: ['Monthly bookkeeping','Bank & credit card reconciliations','Financial reports','GST/PST tracking','Year-end accountant-ready records'], type: 'plan' },
  { _id: '2', name: 'Growth', tagline: 'Stay on top of the numbers as your business grows.', price: '$545', priceNote: '/month + applicable taxes', badge: 'MOST POPULAR', featured: true, features: ['Everything in Essentials','GST/PST filing','A/R tracking','A/P tracking','Enhanced monthly reporting','Accountant coordination','Monthly check-in'], type: 'plan' },
  { _id: '3', name: 'Complete', tagline: 'Hand over the bookkeeping and focus on running your business.', price: '$745', priceNote: '/month + applicable taxes', features: ['Everything in Growth','Full-cycle bookkeeping','Payroll','A/P and A/R management','Invoicing support','Government reporting','Year-end payroll reporting','Monthly financial review'], type: 'plan' },
  { _id: '4', name: 'Books Rescue & Rebuild', tagline: "Behind on your books? We'll help get them flowing again.", price: '$195–$295', priceNote: 'diagnostic review', features: ['Review & assessment','Clean-up plan creation','Catch-up bookkeeping','Rebuild accurate records','Action plan & next steps','Diagnostic fee credited toward clean-up'], type: 'rescue' },
];

export default function PricingSection() {
  const [services, setServices] = useState(fallback);

  useEffect(() => {
    serviceAPI.getPublic({ type: 'plan' })
      .then(r => { if (r.data.services?.length) setServices(r.data.services); })
      .catch(() => {});
  }, []);

  const plans = services.filter(s => s.type === 'plan');
  const rescue = services.find(s => s.type === 'rescue') || fallback[3];

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: 56 }}>
          <span className="eyebrow">Bookkeeping Plans</span>
          <h2 className="section-title">Simple Plans. Powerful Results.</h2>
          <p className="section-subtitle">Choose the level of support that fits your business — all plans include a free Bookkeeping Fit Call to get started.</p>
        </div>

        <div className={styles.plansGrid}>
          {plans.map(plan => (
            <div key={plan._id} className={`${styles.card} ${plan.featured ? styles.featured : ''}`}>
              {plan.badge && <div className={styles.badge}>{plan.badge}</div>}
              <div className={styles.cardHeader}>
                <h3 className={styles.name}>{plan.name}</h3>
                <p className={styles.tagline}>{plan.tagline}</p>
              </div>
              <div className={styles.price}>
                <span className={styles.priceNum}>{plan.price}</span>
                <span className={styles.priceNote}>{plan.priceNote}</span>
              </div>
              <ul className={styles.features}>
                {(plan.features || []).map(f => (
                  <li key={f}><FiCheck className={styles.check} size={15}/> {f}</li>
                ))}
              </ul>
              <Link to="/contact" className={`btn ${plan.featured ? 'btn-primary' : 'btn-outline-dark'} ${styles.cta}`}>
                {plan.ctaText || 'Book a Free Bookkeeping Fit Call'}
              </Link>
            </div>
          ))}
        </div>

        {/* Rescue card */}
        <div className={styles.rescueCard}>
          <div className={styles.rescueLeft}>
            <span className={styles.rescueBadge}>BOOKS RESCUE & REBUILD</span>
            <h3 className={styles.rescueTitle}>{rescue.tagline}</h3>
            <p className={styles.rescueDesc}>We review where things stand, create a clean-up plan and get your books current so you can move forward with confidence. A fixed project quote is provided after reviewing the books.</p>
          </div>
          <div className={styles.rescueRight}>
            <div className={styles.rescuePrice}>
              <div className={styles.rescuePriceNum}>{rescue.price}</div>
              <div className={styles.rescuePriceNote}>{rescue.priceNote}</div>
              <div className={styles.rescueCredit}>Credited toward clean-up if you proceed</div>
            </div>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Book a Books Rescue Review <FiArrowRight size={16}/>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
