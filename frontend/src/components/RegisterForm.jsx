import { useState } from "react";

export default function RegisterForm({ onRegister, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    plan: "basic",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    try {
      setLoading(true);

      await onRegister({
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
        plan: formData.plan,
      });
    } catch (err) {
      console.error(err);
      alert("สมัครสมาชิกไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-layout">
      <div className="auth-shell">
        <div className="auth-board">
          <div className="auth-panel">
            <div className="auth-panel-header">
              <span className="auth-panel-label">Registry</span>
            </div>

            <div className="auth-canvas">
              <div className="auth-form-wrap auth-form-wrap-register">
                <h2 className="auth-heading">ลงทะเบียน</h2>

                <form className="auth-form" onSubmit={handleSubmit}>
                  <div className="auth-field">
                    <label className="auth-label">ชื่อ</label>
                    <input
                      className="auth-input"
                      type="text"
                      name="firstName"
                      placeholder="กรอกชื่อ"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="auth-field">
                    <label className="auth-label">นามสกุล</label>
                    <input
                      className="auth-input"
                      type="text"
                      name="lastName"
                      placeholder="กรอกนามสกุล"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="auth-field">
                    <label className="auth-label">อีเมล</label>
                    <input
                      className="auth-input"
                      type="email"
                      name="email"
                      placeholder="กรอกอีเมล"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="auth-field">
                    <label className="auth-label">รหัสผ่าน</label>
                    <input
                      className="auth-input"
                      type="password"
                      name="password"
                      placeholder="กรอกรหัสผ่านใหม่"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="auth-field">
                    <label className="auth-label">ยืนยันรหัสผ่านอีกครั้ง</label>
                    <input
                      className="auth-input"
                      type="password"
                      name="confirmPassword"
                      placeholder="กรอกรหัสผ่านอีกครั้ง"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="auth-field">
                    <label className="auth-label">แพ็กเกจ</label>
                    <select
                      className="auth-input auth-select"
                      name="plan"
                      value={formData.plan}
                      onChange={handleChange}
                    >
                      <option value="basic">Basic</option>
                      <option value="silver">Silver</option>
                      <option value="gold">Gold</option>
                    </select>
                  </div>

                  <button
                    className="auth-primary-btn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
                  </button>
                </form>

                <div className="auth-footer-links">
                  <p className="auth-helper-text">
                    มีบัญชีแล้ว ?{" "}
                    <button
                      type="button"
                      className="auth-text-btn"
                      onClick={onSwitchToLogin}
                    >
                      เข้าสู่ระบบ
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}