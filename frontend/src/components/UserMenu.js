import React, { useState, useRef, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../contexts/AuthContext";

function UserMenu() {
  const { user, isAuthenticated, handleGoogleLogin, logout, isSignInOpen, openSignIn, closeSignIn } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);

  // Close dropdown on outside click; close modal on overlay click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        isSignInOpen
      ) {
        closeSignIn();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSignInOpen, closeSignIn]);

  // Get initials for fallback avatar
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isAuthenticated && user) {
    return (
      <div className="user-menu" ref={dropdownRef}>
        <button
          className="user-avatar-btn"
          onClick={() => setShowDropdown(!showDropdown)}
          title={user.name || user.email}
        >
          {user.picture ? (
            <img
              src={user.picture}
              alt={user.name}
              className="user-avatar-img"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="user-avatar-fallback">
              {getInitials(user.name)}
            </div>
          )}
        </button>

        {showDropdown && (
          <div className="user-dropdown">
            <div className="user-dropdown-header">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="user-dropdown-avatar"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="user-dropdown-avatar user-avatar-fallback-large">
                  {getInitials(user.name)}
                </div>
              )}
              <div className="user-dropdown-info">
                <div className="user-dropdown-name">{user.name}</div>
                <div className="user-dropdown-email">{user.email}</div>
              </div>
            </div>
            <div className="user-dropdown-divider" />
            <button
              className="user-dropdown-item"
              onClick={() => {
                logout();
                setShowDropdown(false);
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign out
            </button>
          </div>
        )}
      </div>
    );
  }

  // Not authenticated — show Sign In button
  return (
    <div className="user-menu">
      <button
        className="sign-in-btn"
        onClick={openSignIn}
      >
        Sign in
      </button>

      {isSignInOpen && (
        <div className="sign-in-modal-overlay">
          <div className="sign-in-modal" ref={modalRef}>
            <button
              className="sign-in-modal-close"
              onClick={closeSignIn}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="sign-in-modal-header">
              <svg width="32" height="32" viewBox="0 0 32 32">
                <defs>
                  <linearGradient
                    id="signInStarGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#4285f4" />
                    <stop offset="50%" stopColor="#c58af9" />
                    <stop offset="100%" stopColor="#e91e63" />
                  </linearGradient>
                </defs>
                <path
                  d="M16 0L19.5 12.5L32 16L19.5 19.5L16 32L12.5 19.5L0 16L12.5 12.5Z"
                  fill="url(#signInStarGrad)"
                />
              </svg>
              <h2>Sign in to ResearchAI</h2>
              <p>Access your analyses, saved documents, and more.</p>
            </div>
            <div className="sign-in-modal-body">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  await handleGoogleLogin(credentialResponse);
                  // modal auto-closes via useEffect in AuthContext
                }}
                onError={() => {
                  console.error("Google Login Failed");
                }}
                shape="pill"
                size="large"
                text="continue_with"
                width="300"
                theme="filled_black"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
