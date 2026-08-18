import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLock, FiMail, FiEye, FiEyeOff } from 'react-icons/fi';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(form.email, form.password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>
            {[16,20,14,22,28].map((h, i) => (
              <div key={i} className={styles.bar} style={{ height: h, background: ['#1F3A5F','#2C5282','#718096','#38A169','#2F855A'][i] }} />
            ))}
          </div>
          <h1 className={styles.title}>Streamside Admin</h1>
          <p className={styles.subtitle}>Sign in to manage your website</p>
        </div>

        {error && <div className={styles.error}><FiLock size={14}/> {error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className={styles.inputWrap}>
              <FiMail className={styles.inputIcon} size={16}/>
              <input
                className={`form-input ${styles.input}`}
                type="email"
                placeholder="admin@streamsidebookkeeping.ca"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className={styles.inputWrap}>
              <FiLock className={styles.inputIcon} size={16}/>
              <input
                className={`form-input ${styles.input}`}
                type={showPass ? 'text' : 'password'}
                placeholder="Your password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowPass(v => !v)}>
                {showPass ? <FiEyeOff size={16}/> : <FiEye size={16}/>}
              </button>
            </div>
          </div>
          <button type="submit" className={`btn btn-primary btn-lg ${styles.submitBtn}`} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className={styles.back}><a href="/">← Back to website</a></p>
      </div>
    </div>
  );
}
