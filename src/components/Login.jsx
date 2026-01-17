import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../store/slices/authSlice';
import { login } from '../utils/api';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Check for admin/admin credentials
      if (username === 'admin' && password === 'admin') {
        // Simulate successful login for admin
        const mockToken = 'admin_token_' + Date.now();
        dispatch(
          loginSuccess({
            user: { username: 'admin', role: 'admin' },
            token: mockToken,
          })
        );
        navigate('/home');
        return;
      }

      // For other credentials, try API login
      const data = await login(username, password);

      // Handle different response structures
      // If token exists directly in response
      if (data.token) {
        dispatch(
          loginSuccess({
            user: data.user || data,
            token: data.token,
          })
        );
        navigate('/home');
      } else {
        // If response has different structure
        setError('Invalid response from server. Token not found.');
      }
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter username"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="demo-info">
          Default credentials: Username: <strong>admin</strong> / Password: <strong>admin</strong>
        </p>
      </div>
    </div>
  );
};

export default Login;

