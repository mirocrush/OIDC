import React from 'react';

function Profile({ user }) {
  return (
    <div className="profile">
      {user.photo && (
        <img
          src={user.photo}
          alt={user.displayName}
          className="profile-photo"
        />
      )}

      <h2 className="profile-name">{user.displayName}</h2>

      {user.email && (
        <p className="profile-email">{user.email}</p>
      )}

      {user.username && (
        <p className="profile-email">@{user.username}</p>
      )}

      <span className="profile-provider">
        Signed in with {user.provider === 'google' ? 'Google' : 'GitHub'}
      </span>

      <a href="/auth/logout" className="btn btn-logout">
        Sign Out
      </a>
    </div>
  );
}

export default Profile;
