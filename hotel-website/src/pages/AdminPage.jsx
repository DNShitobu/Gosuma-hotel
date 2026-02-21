import Admin from '../components/Admin/Admin';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Only allow access if user is admin
  if (!user || user.email !== 'admin@gosuma.com') {
    // Optionally, show a message or redirect
    setTimeout(() => navigate('/login'), 100);
    return (
      <section style={{ paddingTop: '100px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{background: '#fff', borderRadius: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', padding: '32px', maxWidth: '400px', width: '100%', textAlign: 'center'}}>
          <h2 style={{color: 'var(--army-blue)'}}>Admin Login Required</h2>
          <p>You must be logged in as an admin to view this page.</p>
        </div>
      </section>
    );
  }
  return (
    <section style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <Admin />
    </section>
  );
};

export default AdminPage;
