import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch current user on mount
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setUser(data.user);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch user:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="card">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="card">
      {user ? (
        <Profile user={user} />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
