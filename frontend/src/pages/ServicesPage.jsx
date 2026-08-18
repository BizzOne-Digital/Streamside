import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
import { serviceAPI } from '../utils/api';
import CTABanner from '../components/sections/CTABanner';
import styles from './ServicesPage.module.css';

const addons = ['Payroll services','Accounts payable management','Accounts receivable management','Customer invoicing','WorkSafeBC reporting','Employer Health Tax reporting','T4/T4A preparation','ROE preparation','Additional bank or credit-card accounts','Higher transaction volumes','QuickBooks Online setup','Catch-up and clean-up bookkeeping','Custom reporting'];

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    serviceAPI.getPublic()
      .then(r => setServices(r.data.services || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const plans = services.filter(s => s.type === 'plan');
  const rescue = services.find(s => s.type === 'rescue');

  return (
    <>
      <div className={styles.pageHero}>
        <div className="container">
          <span className="eyebrow" style={{ color: '#9AE6B4' }}>Service Plans</span>
          <h1 style={{ color: '#fff', fontSize: 'clamp(2rem,4vw,3rem)', marginBottom: 16 }}>Simple Plans. Powerful Results.</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 560, fontSize: '1.05rem', lineHeight: 1.7 }}>
            Choose the level of support that fits where your business is today. All plans start with a free Bookkeeping Fit Call.
          </p>
        </div>
        <div className={styles.wave}><svg viewBox="0 0 1440 60" preserveAspectRatio="none"><path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white"/></svg></div>
      </div>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className={styles.loading}>Loading service plans...</div>
          ) : (
            <div className={styles.plansGrid}>
              {plans.map(plan => (
                <div key={plan._id} className={`${styles.card} ${plan.featured ? styles.featured : ''}`}>
                  {plan.badge && <div className={styles.badge}>{plan.badge}</div>}
                  <div className={styles.cardTop}>
                    <h2 className={styles.name}>{plan.name}</h2>
                    <p className={styles.tagline}>{plan.tagline}</p>
                    <div className={styles.price}>
                      <span className={styles.priceNum}>{plan.price}</span>
                      <span className={styles.priceNote}>{plan.priceNote}</span>
                    </div>
                    <p className={styles.desc}>{plan.description}</p>
                  </div>
                  <div className={styles.divider} />
                  <p className={styles.includesLabel}>Includes:</p>
                  <ul className={styles.features}>
                    {(plan.features || []).map(f => (
                      <li key={f}><FiCheck className={styles.check} size={15}/> {f}</li>
                    ))}
                  </ul>
                  <Link to="/contact" className={`btn ${plan.featured ? 'btn-primary' : 'btn-outline-dark'} ${styles.cta}`}>
                    Book a Free Bookkeeping Fit Call
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Rescue section */}
          {rescue && (
            <div className={styles.rescueSection}>
              <div className={styles.rescueInner}>
                <div className={styles.rescueLeft}>
                  <span className={styles.rescueBadge}>BOOKS RESCUE & REBUILD</span>
                  <h2 className={styles.rescueTitle}>{rescue.tagline}</h2>
                  <p className={styles.rescueDesc}>{rescue.description}</p>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginTop: 10, fontStyle: 'italic' }}>A fixed project quote will be provided after reviewing the books.</p>
                  <ul className={styles.rescueFeatures}>
                    {(rescue.features || []).map(f => <li key={f}><FiCheck size={14}/> {f}</li>)}
                  </ul>
                </div>
                <div className={styles.rescueRight}>
                  <div className={styles.rescuePriceNum}>{rescue.price}</div>
                  <div className={styles.rescuePriceNote}>{rescue.priceNote}</div>
                  <div className={styles.rescueCredit}>Credited toward clean-up if you proceed</div>
                  <Link to="/contact" className="btn btn-primary btn-lg" style={{ justifyContent: 'center', width: '100%' }}>
                    Book a Books Rescue Review <FiArrowRight size={16}/>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Add-ons */}
          <div className={styles.addons}>
            <h3 className={styles.addonsTitle}>Optional Add-On Services</h3>
            <p className={styles.addonsDesc}>Add-ons are quoted based on volume and complexity. Additional services can be added to your monthly bookkeeping plan based on your business needs.</p>
            <div className={styles.addonsList}>
              {addons.map(a => <div key={a} className={styles.addonItem}><FiCheck size={14} style={{ color: 'var(--green)', flexShrink: 0 }}/> {a}</div>)}
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--grey-text)', marginTop: 20, fontStyle: 'italic' }}>We'll recommend the services that make sense for your business during your Bookkeeping Fit Call.</p>
          </div>
        </div>
      </section>

      <CTABanner title="Not Sure Which Plan You Need?" subtitle="That's completely fine. During your Bookkeeping Fit Call, we'll look at your business and recommend the best place to start." cta1="Book Your Free Fit Call" />
    </>
  );
}
