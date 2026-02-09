"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSettings, setCheckingSettings] = useState(true);
  const [registrationEnabled, setRegistrationEnabled] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setRegistrationEnabled(data.allowRegistration);
        setCheckingSettings(false);
      })
      .catch(() => {
        setCheckingSettings(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
      } else {
        router.push("/");
      }
    } catch {
      setError("Registration failed");
      setLoading(false);
    }
  };

  if (checkingSettings) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "#fff",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!registrationEnabled) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
            fontSize: "1.5rem",
          }}
        >
          <AlertCircle size={28} /> Registration Disabled
        </div>
        <p style={{ color: "#888", marginBottom: "20px" }}>
          Public registration is currently disabled.
        </p>
        <a
          href="/login"
          style={{
            padding: "12px 24px",
            backgroundColor: "#5865f2",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
          fontSize: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <UserPlus size={28} /> Register
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "300px",
          width: "100%",
          padding: "0 20px",
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: "12px",
            backgroundColor: "#1a1a1a",
            color: "#fff",
            border: "1px solid #333",
            borderRadius: "8px",
            fontSize: "1rem",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "12px",
            backgroundColor: "#1a1a1a",
            color: "#fff",
            border: "1px solid #333",
            borderRadius: "8px",
            fontSize: "1rem",
          }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{
            padding: "12px",
            backgroundColor: "#1a1a1a",
            color: "#fff",
            border: "1px solid #333",
            borderRadius: "8px",
            fontSize: "1rem",
          }}
        />

        {error && (
          <p style={{ color: "#ff5555", textAlign: "center" }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px",
            backgroundColor: "#5865f2",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "1rem",
          }}
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <a
          href="/login"
          style={{
            textAlign: "center",
            color: "#666",
            textDecoration: "none",
            marginTop: "10px",
          }}
        >
          Already have an account? Login
        </a>
      </form>
    </div>
  );
}
