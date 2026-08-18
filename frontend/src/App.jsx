import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import AdminLayout from './components/admin/AdminLayout';
import ScrollToTop from './components/ScrollToTop';

// Public pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ResourcesPage from './pages/ResourcesPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin pages
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import ContactsPage from './pages/admin/ContactsPage';
import ServicesAdminPage from './pages/admin/ServicesAdminPage';
import ResourcesAdminPage from './pages/admin/ResourcesAdminPage';
import TestimonialsAdminPage from './pages/admin/TestimonialsAdminPage';
import SettingsAdminPage from './pages/admin/SettingsAdminPage';

function RequireAuth({ children }) {
  const { isAuth, loading } = useAuth();
  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--navy)' }}>Loading...</div>;
  return isAuth ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      {/* Public site */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* Admin */}
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin" element={<RequireAuth><AdminLayout /></RequireAuth>}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="services" element={<ServicesAdminPage />} />
        <Route path="resources" element={<ResourcesAdminPage />} />
        <Route path="testimonials" element={<TestimonialsAdminPage />} />
        <Route path="settings" element={<SettingsAdminPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
