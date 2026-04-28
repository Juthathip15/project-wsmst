import { useState } from "react";
import Navbar from "./Navbar";

export default function CheckoutPage({
  onNavigate,
  onLoginClick,
  user,
  onLogout,
  selectedPlan,
  onPaymentSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!selectedPlan) {
    return (
      <div className="checkout-page">
        <Navbar
          onNavigate={onNavigate}
          onLoginClick={onLoginClick}
          user={user}
          onLogout={onLogout}
          activePage="packages"
        />

        <section className="checkout-section">
          <div className="checkout-container">
            <div className="checkout-card">
              <h1 className="checkout-title">ไม่มีแพ็คเกจที่เลือก</h1>
              <p className="checkout-subtitle">
                กรุณากลับไปเลือกแพ็คเกจก่อนทำรายการ
              </p>
              <button
                type="button"
                className="checkout-primary-btn"
                onClick={() => onNavigate("packages")}
              >
                กลับไปเลือกแพ็คเกจ
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const handleConfirm = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8080/api/v1/subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        plan: selectedPlan.key,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data?.message || "ชำระเงินไม่สำเร็จ");
      return;
    }

    // 👉 เรียก App
    if (onPaymentSuccess) {
      onPaymentSuccess(selectedPlan);
    }

    // 👉 ไปหน้า success
    onNavigate("payment-status");

  } catch {
    alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ ❌");
  }
};
  return (
    <div className="checkout-page">
      <Navbar
        onNavigate={onNavigate}
        onLoginClick={onLoginClick}
        user={user}
        onLogout={onLogout}
        activePage="packages"
      />

      <section className="checkout-section">
        <div className="checkout-container">
          <div className="checkout-header">
            <span className="checkout-badge">Checkout</span>
            <h1 className="checkout-title">ชำระเงิน</h1>
            <p className="checkout-subtitle">
              ตรวจสอบรายละเอียดแพ็คเกจก่อนยืนยันการชำระเงิน
            </p>
          </div>

          {errorMessage && <p className="error">{errorMessage}</p>}

          <div className="checkout-grid">
            <div className="checkout-card">
              <h2 className="checkout-card-title">{selectedPlan.title}</h2>
              <p className="checkout-price">{selectedPlan.price}</p>
              <p className="checkout-description">{selectedPlan.description}</p>

              <div className="checkout-detail-list">
                <div className="checkout-detail-item">
                  <span>Quota</span>
                  <strong>{selectedPlan.quota}</strong>
                </div>

                <div className="checkout-detail-item">
                  <span>Rate Limit</span>
                  <strong>{selectedPlan.rate}</strong>
                </div>

                <div className="checkout-detail-item">
                  <span>Account</span>
                  <strong>{user?.email || "-"}</strong>
                </div>
              </div>
            </div>

            <div className="checkout-card">
              <h3 className="checkout-card-title">วิธีชำระเงิน</h3>

              <div className="checkout-payment-box">
                <div className="checkout-payment-icon">💸</div>
                <div>
                  <p className="checkout-payment-title">โอน / PromptPay</p>
                  <p className="checkout-payment-text">
                    Demo payment สำหรับจำลองขั้นตอนการชำระเงิน
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="checkout-primary-btn"
                onClick={handleConfirm}
                disabled={loading}
              >
                {loading ? "กำลังยืนยัน..." : "ยืนยันการชำระเงินจำลอง"}
              </button>

              <button
                type="button"
                className="checkout-secondary-btn"
                onClick={() => onNavigate("packages")}
                disabled={loading}
              >
                กลับไปเลือกแพ็คเกจ
              </button>

              <p className="checkout-note">
                Demo นี้ไม่ตัดเงินจริง แต่จะอัปเดตแพ็คเกจในระบบจริง
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}