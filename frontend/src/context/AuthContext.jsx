import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const demoUser = localStorage.getItem("repairwiseDemoUser");
    setUser(demoUser ? JSON.parse(demoUser) : null);
    setLoading(false);
  }, []);

  function demoLogin(profile) {
    const demoUser = {
      uid: "demo-user",
      email: profile.email,
      displayName: profile.name || "Demo User",
      profile
    };
    localStorage.setItem("repairwiseDemoUser", JSON.stringify(demoUser));
    localStorage.setItem("repairwiseProfile", JSON.stringify(profile));
    setUser(demoUser);
  }

  function demoLogout() {
    localStorage.removeItem("repairwiseDemoUser");
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, loading, demoLogin, demoLogout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
