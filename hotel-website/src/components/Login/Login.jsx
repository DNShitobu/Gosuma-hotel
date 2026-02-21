import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = ({ onClose }) => {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = isRegister 
      ? await register(formData.name, formData.email, formData.password)
      : await login(formData.email, formData.password);

    if (result.success) {
      onClose();
    } else {
      setError(result.error || 'An error occurred');
    }
    setLoading(false);
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="login-header">
          <h2>{isRegister ? 'Create Account' : 'Welcome Back'</h2>
          <p>{isRegister ? 'Join our rewards program' : 'Sign in to your account'}</p>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Please wait...' : (isRegister ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
            <button onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? 'Sign In' : 'Register'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
