import { Link } from 'react-router-dom';
export default function NotFoundPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 20px', paddingTop: 100 }}>
      <div>
        <div style={{ fontSize: '5rem', marginBottom: 16 }}>🌊</div>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: 12 }}>Page Not Found</h1>
        <p style={{ color: 'var(--grey-text)', marginBottom: 32, fontSize: '1.1rem' }}>The page you're looking for has drifted downstream.</p>
        <Link to="/" className="btn btn-primary btn-lg">Back to Home</Link>
      </div>
    </div>
  );
}
