import React from 'react';

const LoginPage = () => {
  return (
    <div className="login-page" style={{padding: '48px 0', minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{background: '#fff', borderRadius: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', padding: '32px', maxWidth: '400px', width: '100%'}}>
        <h2 style={{marginBottom: '24px', color: 'var(--army-blue)'}}>Login</h2>
        <form>
          <div style={{marginBottom: '16px'}}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required style={{width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc'}} />
          </div>
          <div style={{marginBottom: '24px'}}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required style={{width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc'}} />
          </div>
          <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
