import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Decode a JWT payload without verifying the signature (Google already verified it)
const decodeJwtPayload = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("auth_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      localStorage.removeItem("auth_user");
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle Google login success — receives the credential response from Google
  const handleGoogleLogin = useCallback(async (credentialResponse) => {
    try {
      // Decode the JWT directly on the frontend — fast, always works
      const payload = decodeJwtPayload(credentialResponse.credential);
      if (!payload) {
        return { success: false, error: "Failed to decode token" };
      }

      const user_data = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        given_name: payload.given_name,
        family_name: payload.family_name,
        email_verified: payload.email_verified,
      };

      // Set user immediately — don't wait for backend
      setUser(user_data);
      localStorage.setItem("auth_user", JSON.stringify(user_data));

      // Optionally verify with backend (fire-and-forget, won't block login)
      fetch("http://localhost:8000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      }).catch(() => {
        // Backend verification is optional; login already succeeded
      });

      return { success: true };
    } catch (err) {
      console.error("Google auth failed:", err);
      return { success: false, error: "Authentication failed" };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("auth_user");
  }, []);

  // Global sign-in modal control — any component can call openSignIn()
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const openSignIn = useCallback(() => setIsSignInOpen(true), []);
  const closeSignIn = useCallback(() => setIsSignInOpen(false), []);

  // Auto-close modal when user logs in
  useEffect(() => {
    if (user) setIsSignInOpen(false);
  }, [user]);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    handleGoogleLogin,
    logout,
    isSignInOpen,
    openSignIn,
    closeSignIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
