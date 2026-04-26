import { useState } from "react";

export default function ResetPasswordPage({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    // ตรวจสอบอีเมลและรหัสผ่าน
    if (newPassword !== confirmPassword) {
      setErrorMessage("รหัสผ่านไม่ตรงกัน");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/v1/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data?.message || "รีเซ็ตรหัสผ่านล้มเหลว");
        setLoading(false);
        return;
      }

      alert("รีเซ็ตรหัสผ่านสำเร็จ");
      onNavigate("login");
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
          <h1 className="auth-heading">รีเซ็ตรหัสผ่านใหม่</h1>

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
              <label className="auth-label">รหัสผ่านใหม่</label>
              <input
                className="auth-input"
                type="password"
                placeholder="กรอกรหัสผ่านใหม่"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">ยืนยันรหัสผ่านใหม่</label>
              <input
                className="auth-input"
                type="password"
                placeholder="กรอกรหัสผ่านอีกครั้ง"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-primary-btn" disabled={loading}>
              {loading ? "กำลังรีเซ็ตรหัสผ่าน..." : "รีเซ็ตรหัสผ่าน"}
            </button>
          </form>

          <div className="auth-footer-links">
            <button
              type="button"
              className="auth-text-btn"
              onClick={() => onNavigate("login")}
            >
              กลับไปที่หน้าล็อกอิน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}