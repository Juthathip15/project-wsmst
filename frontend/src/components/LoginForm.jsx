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
      const response = await fetch("http://localhost:8080/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        setErrorMessage(data?.message || text || "Login failed");
        return;
      }

      onLoginSuccess({
        token: data.token,
        user: data.user,
      });

      if (data.user?.role === "admin") {
        onNavigate("admin-dashboard");
      } else {
        onNavigate("dashboard");
      }
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

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label className="auth-label">อีเมล</label>
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
              <label className="auth-label">รหัสผ่าน</label>
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
              {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>
          </form>

          <div className="auth-footer-links">
            <p className="auth-helper-text">ยังไม่เป็นสมาชิก?</p>
            <button
              type="button"
              className="auth-text-btn"
              onClick={() => onNavigate("register")}
            >
              ลงทะเบียน
            </button>

            <p className="auth-helper-text">ลืมรหัสผ่าน?</p>
            <button
              type="button"
              className="auth-text-btn"
              onClick={() => onNavigate("reset-password")}
            >
              รีเซ็ตรหัสผ่าน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}