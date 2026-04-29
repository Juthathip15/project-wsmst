import { useState } from "react";

const plans = [
  {
    key: "basic",
    title: "Basic",
    price: "ฟรี",
    description: "ทดลองใช้งาน API เบื้องต้น",
  },
  {
    key: "silver",
    title: "Silver",
    price: "฿69/เดือน",
    description: "เหมาะสำหรับใช้งานจริงระดับกลาง",
  },
  {
    key: "gold",
    title: "Gold",
    price: "฿99/เดือน",
    description: "เหมาะสำหรับการใช้งานระดับสูง",
  },
];

export default function RegisterForm({ onNavigate, onCheckout }) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [errorMessage, setErrorMessage] = useState("");

  const currentPlan =
    plans.find((plan) => plan.key === selectedPlan) || plans[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("รหัสผ่านไม่ตรงกัน");
      return;
    }

    const registerUser = {
      fullName,
      email,
      password,
      plan: selectedPlan,
    };

    localStorage.setItem("pendingRegisterUser", JSON.stringify(registerUser));

    if (onCheckout) {
      onCheckout({
        ...currentPlan,
        registerData: registerUser,
      });
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
              <label className="auth-label">ชื่อผู้ใช้งาน / บริษัท</label>
              <input
                className="auth-input"
                type="text"
                placeholder="กรอกชื่อ"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

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

            <div className="auth-field">
              <label className="auth-label">เลือกแพ็กเกจ</label>

              <div className="register-plan-grid">
                {plans.map((plan) => (
                  <button
                    key={plan.key}
                    type="button"
                    className={`register-plan-card ${
                      selectedPlan === plan.key ? "active" : ""
                    }`}
                    onClick={() => setSelectedPlan(plan.key)}
                  >
                    <strong>{plan.title}</strong>
                    <span>{plan.price}</span>
                    <small>{plan.description}</small>
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="auth-primary-btn">
              ไปหน้าชำระเงิน
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