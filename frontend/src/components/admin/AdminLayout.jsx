import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiGrid, FiUsers, FiPackage, FiBook, FiMessageSquare, FiSettings, FiLogOut, FiExternalLink, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import styles from './AdminLayout.module.css';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: <FiGrid size={18}/> },
  { to: '/admin/contacts', label: 'Contacts / Leads', icon: <FiUsers size={18}/> },
  { to: '/admin/services', label: 'Services & Pricing', icon: <FiPackage size={18}/> },
  { to: '/admin/resources', label: 'Resources', icon: <FiBook size={18}/> },
  { to: '/admin/testimonials', label: 'Testimonials', icon: <FiMessageSquare size={18}/> },
  { to: '/admin/settings', label: 'Settings', icon: <FiSettings size={18}/> },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <span className={styles.logoBar} style={{ background: '#1F3A5F' }} />
            <span className={styles.logoBar} style={{ background: '#2C5282' }} />
            <span className={styles.logoBar} style={{ background: '#718096' }} />
            <span className={styles.logoBar} style={{ background: '#38A169' }} />
            <span className={styles.logoBar} style={{ background: '#2F855A' }} />
          </div>
          <div>
            <div className={styles.siteName}>Streamside</div>
            <div className={styles.adminLabel}>Admin Panel</div>
          </div>
          <button className={styles.closeBtn} onClick={() => setSidebarOpen(false)}><FiX /></button>
        </div>

        <nav className={styles.nav}>
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`} onClick={() => setSidebarOpen(false)}>
              <span className={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <a href="/" target="_blank" rel="noreferrer" className={styles.viewSite}>
            <FiExternalLink size={14}/> View Website
          </a>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>{user?.name?.charAt(0) || 'A'}</div>
            <div>
              <div className={styles.userName}>{user?.name}</div>
              <div className={styles.userRole}>{user?.role}</div>
            </div>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}><FiLogOut size={16}/> Log Out</button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className={styles.main}>
        <header className={styles.topbar}>
          <button className={styles.menuBtn} onClick={() => setSidebarOpen(true)}><FiMenu size={22}/></button>
          <div className={styles.topbarRight}>
            <span className={styles.greeting}>Welcome back, {user?.name?.split(' ')[0]}</span>
          </div>
        </header>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
