import { useState } from "react";

export default function RegisterForm({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    if (password !== confirmPassword) {
      setErrorMessage("รหัสผ่านไม่ตรงกัน");
      setLoading(false);
      return;
    }

    // Register API call logic
    try {
      const response = await fetch("http://localhost:8080/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data?.message || "ลงทะเบียนล้มเหลว");
        setLoading(false);
        return;
      }

      setLoading(false);
      onNavigate("login"); // ไปยังหน้าล็อกอินหลังจากลงทะเบียนเสร็จ
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
          <h1 className="auth-heading">ลงทะเบียน</h1>

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

            <div className="auth-field">
              <label className="auth-label">ยืนยันรหัสผ่าน</label>
              <input
                className="auth-input"
                type="password"
                placeholder="ยืนยันรหัสผ่าน"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-primary-btn" disabled={loading}>
              {loading ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
            </button>
          </form>

          <div className="auth-footer-links">
            <p className="auth-helper-text">มีบัญชีอยู่แล้ว?</p>
            <button
              type="button"
              className="auth-text-btn"
              onClick={() => onNavigate("login")}
            >
              กลับไปหน้าล็อกอิน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}