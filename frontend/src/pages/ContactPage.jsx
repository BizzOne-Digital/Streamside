import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { contactAPI } from '../utils/api';
import styles from './ContactPage.module.css';

const businessTypes = ['Construction contractor / renovator','Landscaper / excavation','Disposal, hauling & waste','Electrician / plumber / HVAC','Painting / roofing / flooring','Automotive & equipment service','Cleaning / property maintenance','Salon / personal service','Other trades or service business'];

const helpOptions = ['Monthly bookkeeping','Payroll administration','GST/PST filing','Accounts payable & receivable','Catch-up / clean-up bookkeeping','QuickBooks Online setup','Books Rescue & Rebuild','Year-end preparation','Not sure — I need advice'];

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', businessName:'', email:'', phone:'', businessType:'', helpNeeded:'', preferredContact:'email', additionalInfo:'' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address';
    if (!form.helpNeeded) e.helpNeeded = 'Please select what you need help with';
    return e;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('sending');
    try {
      await contactAPI.submit(form);
      setStatus('success');
      setForm({ name:'', businessName:'', email:'', phone:'', businessType:'', helpNeeded:'', preferredContact:'email', additionalInfo:'' });
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <>
      <div className={styles.pageHero}>
        <div className="container">
          <span className="eyebrow" style={{ color: '#9AE6B4' }}>Get in Touch</span>
          <h1 style={{ color: '#fff', fontSize: 'clamp(2rem,4vw,3rem)', marginBottom: 16 }}>Let's Talk About Your Bookkeeping</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 560, fontSize: '1.05rem', lineHeight: 1.7 }}>
            Ready to spend less time worrying about your books and more time running your business?
          </p>
        </div>
        <div className={styles.wave}><svg viewBox="0 0 1440 60" preserveAspectRatio="none"><path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white"/></svg></div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {/* Info sidebar */}
            <div className={styles.sidebar}>
              <h2 className={styles.sideTitle}>What Happens Next?</h2>
              {[
                { num: '1', title: 'Tell me about your business', desc: 'Complete the form and let me know what kind of bookkeeping help you\'re looking for.' },
                { num: '2', title: 'We\'ll have a conversation', desc: 'We\'ll schedule a free Bookkeeping Fit Call to discuss your needs and current setup.' },
                { num: '3', title: 'You\'ll receive a clear recommendation', desc: 'If we\'re a good fit, I\'ll recommend the right service plan with clear pricing before we move forward.' },
              ].map(s => (
                <div key={s.num} className={styles.step}>
                  <div className={styles.stepNum}>{s.num}</div>
                  <div>
                    <h4 className={styles.stepTitle}>{s.title}</h4>
                    <p className={styles.stepDesc}>{s.desc}</p>
                  </div>
                </div>
              ))}

              <div className={styles.contactInfo}>
                <h3 className={styles.contactTitle}>Contact Streamside</h3>
                <a href="tel:2508896907" className={styles.contactItem}><FiPhone size={16}/> 250-889-6907</a>
                <a href="mailto:streamsidebookkeeping@gmail.com" className={styles.contactItem}><FiMail size={16}/> streamsidebookkeeping@gmail.com</a>
                <div className={styles.contactItem}><FiMapPin size={16}/> Vancouver Island, BC</div>
              </div>

              <div className={styles.privacy}>
                <FiAlertCircle size={14} style={{ flexShrink: 0, marginTop: 2 }} />
                <p>Your privacy matters. Please don't send banking information, passwords, or financial documents through this form. Streamside uses a secure process for exchanging sensitive documents once we begin working together.</p>
              </div>
            </div>

            {/* Form */}
            <div className={styles.formWrap}>
              {status === 'success' ? (
                <div className={styles.success}>
                  <FiCheckCircle size={52} className={styles.successIcon} />
                  <h2>Thank You!</h2>
                  <p>Your message has been received. You should receive a confirmation email shortly. I'll be in touch within 1–2 business days to schedule your free Bookkeeping Fit Call.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <h2 className={styles.formTitle}>Start with a Free Bookkeeping Fit Call</h2>
                  <div className={styles.row2}>
                    <div className="form-group">
                      <label className="form-label">Name *</label>
                      <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
                      {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Business Name</label>
                      <input className="form-input" name="businessName" value={form.businessName} onChange={handleChange} placeholder="Your business name" />
                    </div>
                  </div>
                  <div className={styles.row2}>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input className="form-input" name="phone" value={form.phone} onChange={handleChange} placeholder="250-000-0000" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Type of Business</label>
                    <select className="form-input" name="businessType" value={form.businessType} onChange={handleChange}>
                      <option value="">Select your business type...</option>
                      {businessTypes.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">What bookkeeping help are you looking for? *</label>
                    <select className="form-input" name="helpNeeded" value={form.helpNeeded} onChange={handleChange}>
                      <option value="">Select an option...</option>
                      {helpOptions.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                    {errors.helpNeeded && <span className="form-error">{errors.helpNeeded}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Preferred method of contact</label>
                    <div className={styles.radioGroup}>
                      {['email','phone'].map(v => (
                        <label key={v} className={styles.radio}>
                          <input type="radio" name="preferredContact" value={v} checked={form.preferredContact === v} onChange={handleChange} />
                          <span>{v.charAt(0).toUpperCase() + v.slice(1)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Anything else you'd like me to know? (optional)</label>
                    <textarea className="form-input" name="additionalInfo" value={form.additionalInfo} onChange={handleChange} rows={4} placeholder="Any additional details about your business or bookkeeping situation..." style={{ resize: 'vertical' }} />
                  </div>
                  {status === 'error' && <div className={styles.errorMsg}><FiAlertCircle size={16}/> Something went wrong. Please try again or email us directly.</div>}
                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending...' : 'Send My Message'}
                  </button>
                  <p className={styles.disclaimer}>No spam. No obligation. Just a friendly conversation about your books.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
