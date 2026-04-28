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
    price: "฿999/เดือน",
    description: "เหมาะสำหรับใช้งานจริงระดับกลาง",
  },
  {
    key: "gold",
    title: "Gold",
    price: "฿4,999/เดือน",
    description: "เหมาะสำหรับการใช้งานระดับสูง",
  },
];

export default function RegisterForm({ onNavigate }) {
  const [step, setStep] = useState("form");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const currentPlan = plans.find((plan) => plan.key === selectedPlan) || plans[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("รหัสผ่านไม่ตรงกัน");
      return;
    }

    setStep("checkout");
  };

  const handleMockPayment = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8080/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, plan: selectedPlan }),
      });

      const text = await response.text();

      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = text;
      }

      if (!response.ok) {
        setErrorMessage(
          typeof data === "string" ? data : data?.message || "ลงทะเบียนล้มเหลว"
        );
        setStep("form");
        return;
      }

      alert("ชำระเงินจำลองสำเร็จ ✅");
      onNavigate("home");
    } catch {
      setErrorMessage("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
      setStep("form");
    } finally {
      setLoading(false);
    }
  };

  if (step === "checkout") {
    return (
      <div className="auth-layout">
        <div className="auth-canvas">
          <div className="auth-form-wrap">
            <h1 className="auth-heading">ชำระเงินจำลอง</h1>

            {errorMessage && <p className="error">{errorMessage}</p>}

            <div className="checkout-card">
              <h2 className="checkout-card-title">{currentPlan.title}</h2>
              <p className="checkout-price">{currentPlan.price}</p>
              <p className="checkout-description">{currentPlan.description}</p>

              <div className="checkout-detail-list">
                <div className="checkout-detail-item">
                  <span>Account</span>
                  <strong>{email}</strong>
                </div>

                <div className="checkout-detail-item">
                  <span>Package</span>
                  <strong>{currentPlan.title}</strong>
                </div>
              </div>

              <div className="checkout-payment-box" style={{ marginTop: 16 }}>
                <div className="checkout-payment-icon">💸</div>
                <div>
                  <p className="checkout-payment-title">PromptPay / Transfer</p>
                  <p className="checkout-payment-text">
                    Demo payment ไม่ตัดเงินจริง
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="auth-primary-btn"
                onClick={handleMockPayment}
                disabled={loading}
              >
                {loading ? "กำลังยืนยัน..." : "ยืนยันชำระเงินจำลอง"}
              </button>

              <button
                type="button"
                className="auth-text-btn"
                style={{ marginTop: 14 }}
                onClick={() => setStep("form")}
              >
                กลับไปแก้ไขข้อมูล
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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