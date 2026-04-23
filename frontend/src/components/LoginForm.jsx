import { useState } from "react";

export default function LoginForm({ onNavigate, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      if (email === "Admin@gmail.com" && password === "123456") {
        const adminUser = {
          email: "Admin@gmail.com",
          name: "Admin",
          isAdmin: true,
        };
        onLoginSuccess({
          token: "admin-token-123456",
          user: adminUser,
          usage: {
            plan: "admin",
            quotaUsed: 0,
            quotaLimit: 999999,
            remaining: 999999,
          },
        });
        setLoading(false);
        onNavigate("admin-dashboard");
        return;
      }

      const response = await fetch("http://localhost:8080/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data?.message || "Login failed");
        setLoading(false);
        return;
      }

      onLoginSuccess({
        token: data.token,
        user: data.user,
        usage: data.usage || {
          plan: "basic",
          quotaUsed: 0,
          quotaLimit: 1000,
          remaining: 1000,
        },
      });
    } catch (error) {
      setErrorMessage("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-canvas">
        <div className="auth-form-wrap">
          <h1 className="auth-heading">เข้าสู่ระบบ</h1>

          {errorMessage && <p className="error">{errorMessage}</p>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-label">Email</label>
              <input
                className="auth-input"
                type="email"
                placeholder="กรอกอีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input
                className="auth-input"
                type="password"
                placeholder="กรอกรหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-primary-btn" disabled={loading}>
              {loading ? "กำลังเข้าสู่ระบบ..." : "Login"}
            </button>
          </form>

          <div className="auth-footer-links">
            <p className="auth-helper-text">ยังไม่ต้องการล็อกอินตอนนี้?</p>
            <button
              type="button"
              className="auth-text-btn"
              onClick={() => onNavigate("home")}
            >
              กลับหน้าแรก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}