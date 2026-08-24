import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiPhone, FiMenu, FiX } from 'react-icons/fi';
import styles from './Navbar.module.css';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          <img src="/logo.png" alt="Streamside Bookkeeping" className={styles.logoImg} />
        </Link>
        <nav className={styles.nav}>
          {navLinks.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.cta}>
          <a href="tel:2508896907" className={styles.phone}><FiPhone size={14}/> 250-889-6907</a>
          <Link to="/contact" className="btn btn-primary btn-sm">Book a Free Call</Link>
        </div>
        <button className={styles.toggle} onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          {open ? <FiX size={24}/> : <FiMenu size={24}/>}
        </button>
      </div>
      <div className={`${styles.mobileMenu} ${open ? styles.mobileOpen : ''}`}>
        <div className={styles.mobileInner}>
          {navLinks.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `${styles.mobileLink} ${isActive ? styles.active : ''}`} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
          <div className={styles.mobilePhone}><FiPhone size={14}/> 250-889-6907</div>
          <Link to="/contact" className="btn btn-primary" onClick={() => setOpen(false)} style={{ marginTop: 8 }}>Book a Free Consultation</Link>
        </div>
      </div>
    </header>
  );
}
