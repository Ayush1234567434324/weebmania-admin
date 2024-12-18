import React from 'react';
import './AuthButtons.css'
const AuthButtons = ({ isAuthenticated, handleSignIn, handleSignOut }) => {
  return (
    <div className="auth-buttons">
      {!isAuthenticated ? (
        <button className="auth-button" onClick={handleSignIn}>Sign In with Google</button>
      ) : (
        <button className="auth-button" onClick={handleSignOut}>Sign Out</button>
      )}
    </div>
  );
};

export default AuthButtons;
