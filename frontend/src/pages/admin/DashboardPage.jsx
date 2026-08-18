import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiPackage, FiBook, FiMessageSquare, FiArrowRight, FiTrendingUp } from 'react-icons/fi';
import { contactAPI, serviceAPI, resourceAPI, testimonialAPI } from '../../utils/api';
import styles from './DashboardPage.module.css';

const statusColor = { new: '#3182CE', contacted: '#DD6B20', qualified: '#2F855A', converted: '#553C9A', closed: '#718096' };

export default function DashboardPage() {
  const [stats, setStats] = useState({ contacts: 0, newContacts: 0, services: 0, resources: 0, testimonials: 0 });
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      contactAPI.getAll({ limit: 5 }),
      serviceAPI.getAll(),
      resourceAPI.getAll(),
      testimonialAPI.getAll(),
    ]).then(([c, s, r, t]) => {
      setRecentContacts(c.data.contacts || []);
      setStats({
        contacts: c.data.total || 0,
        newContacts: (c.data.contacts || []).filter(x => x.status === 'new').length,
        services: (s.data.services || []).length,
        resources: (r.data.resources || []).length,
        testimonials: (t.data.testimonials || []).length,
      });
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const statCards = [
    { icon: <FiUsers size={22}/>, label: 'Total Leads', value: stats.contacts, sub: `${stats.newContacts} new`, color: '#3182CE', link: '/admin/contacts' },
    { icon: <FiPackage size={22}/>, label: 'Service Plans', value: stats.services, sub: 'Published plans', color: '#2F855A', link: '/admin/services' },
    { icon: <FiBook size={22}/>, label: 'Resources', value: stats.resources, sub: 'Guides & articles', color: '#DD6B20', link: '/admin/resources' },
    { icon: <FiMessageSquare size={22}/>, label: 'Testimonials', value: stats.testimonials, sub: 'Client reviews', color: '#553C9A', link: '/admin/testimonials' },
  ];

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <p className={styles.pageSub}>Overview of your Streamside Bookkeeping website</p>
      </div>

      {/* Stat cards */}
      <div className={styles.statsGrid}>
        {statCards.map(s => (
          <Link to={s.link} key={s.label} className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: `${s.color}18`, color: s.color }}>{s.icon}</div>
            <div className={styles.statBody}>
              <div className={styles.statNum}>{loading ? '—' : s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
              <div className={styles.statSub}>{s.sub}</div>
            </div>
            <FiArrowRight size={16} className={styles.statArrow} />
          </Link>
        ))}
      </div>

      {/* Recent Contacts */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}><FiTrendingUp size={18}/> Recent Inquiries</h2>
          <Link to="/admin/contacts" className="btn btn-outline-dark btn-sm">View All</Link>
        </div>
        {loading ? (
          <div className={styles.empty}>Loading...</div>
        ) : recentContacts.length === 0 ? (
          <div className={styles.empty}>No contacts yet. Your form submissions will appear here.</div>
        ) : (
          <div className={styles.table}>
            <div className={styles.tableHead}>
              <div>Name</div><div>Business</div><div>Email</div><div>Help Needed</div><div>Status</div><div>Date</div>
            </div>
            {recentContacts.map(c => (
              <Link to={`/admin/contacts`} key={c._id} className={styles.tableRow}>
                <div className={styles.name}>{c.name}</div>
                <div className={styles.cell}>{c.businessName || '—'}</div>
                <div className={styles.cell}>{c.email}</div>
                <div className={styles.cell}>{c.helpNeeded}</div>
                <div><span className={styles.badge} style={{ background: `${statusColor[c.status]}18`, color: statusColor[c.status] }}>{c.status}</span></div>
                <div className={styles.date}>{new Date(c.createdAt).toLocaleDateString('en-CA')}</div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle} style={{ marginBottom: 16 }}>Quick Actions</h2>
        <div className={styles.quickActions}>
          {[
            { to: '/admin/contacts', label: 'View New Leads', icon: <FiUsers size={18}/>, color: '#3182CE' },
            { to: '/admin/services', label: 'Edit Service Plans', icon: <FiPackage size={18}/>, color: '#2F855A' },
            { to: '/admin/resources', label: 'Add a Resource', icon: <FiBook size={18}/>, color: '#DD6B20' },
            { to: '/admin/testimonials', label: 'Add Testimonial', icon: <FiMessageSquare size={18}/>, color: '#553C9A' },
          ].map(a => (
            <Link key={a.label} to={a.to} className={styles.quickCard} style={{ '--accent': a.color }}>
              <span style={{ color: a.color }}>{a.icon}</span>
              <span>{a.label}</span>
              <FiArrowRight size={14} style={{ marginLeft: 'auto', color: a.color, opacity: 0 }} className={styles.qArrow} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
