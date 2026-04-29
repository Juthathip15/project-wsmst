import { useState } from "react";
import Navbar from "./Navbar";

export default function CheckoutPage({
  onNavigate,
  onLoginClick,
  user,
  onLogout,
  selectedPlan,
  onPaymentSuccess,
  onClose,
  isModal = false,
}) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const pendingRegisterUser = JSON.parse(
    localStorage.getItem("pendingRegisterUser") || "null"
  );

  const accountEmail = user?.email || pendingRegisterUser?.email || "-";

  const handleRegisterPayment = async () => {
    if (!pendingRegisterUser) {
      setErrorMessage("ไม่พบข้อมูลลงทะเบียน กรุณากลับไปกรอกข้อมูลใหม่");
      return;
    }

    const response = await fetch("http://127.0.0.1:8080/api/v1/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pendingRegisterUser),
    });

    const text = await response.text();

    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = text;
    }

    if (!response.ok) {
      throw new Error(
        typeof data === "string" ? data : data?.message || "ลงทะเบียนล้มเหลว"
      );
    }

    localStorage.removeItem("pendingRegisterUser");
    alert("ลงทะเบียนและชำระเงินสำเร็จ ✅");

    if (onClose) onClose();
    onNavigate("login");
  };

  const handleUpgradePayment = async () => {
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
      throw new Error(data?.message || "ชำระเงินไม่สำเร็จ");
    }

    if (onPaymentSuccess) {
      onPaymentSuccess(selectedPlan);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      if (pendingRegisterUser && !user) {
        await handleRegisterPayment();
      } else {
        await handleUpgradePayment();
      }
    } catch (err) {
      setErrorMessage(err.message || "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setLoading(false);
    }
  };

  if (!selectedPlan) {
    return (
      <div className={isModal ? "checkout-page checkout-page-modal" : "checkout-page"}>
        {!isModal && (
          <Navbar
            onNavigate={onNavigate}
            onLoginClick={onLoginClick}
            user={user}
            onLogout={onLogout}
            activePage="packages"
          />
        )}

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
                onClick={() => {
                  if (onClose) onClose();
                  onNavigate("packages");
                }}
              >
                กลับไปเลือกแพ็คเกจ
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={isModal ? "checkout-page checkout-page-modal" : "checkout-page"}>
      {!isModal && (
        <Navbar
          onNavigate={onNavigate}
          onLoginClick={onLoginClick}
          user={user}
          onLogout={onLogout}
          activePage="packages"
        />
      )}

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
                {selectedPlan.quota && (
                  <div className="checkout-detail-item">
                    <span>Quota</span>
                    <strong>{selectedPlan.quota}</strong>
                  </div>
                )}

                {selectedPlan.rate && (
                  <div className="checkout-detail-item">
                    <span>Rate Limit</span>
                    <strong>{selectedPlan.rate}</strong>
                  </div>
                )}

                <div className="checkout-detail-item">
                  <span>Account</span>
                  <strong>{accountEmail}</strong>
                </div>

                <div className="checkout-detail-item">
                  <span>Package</span>
                  <strong>{selectedPlan.title}</strong>
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
                    Demo payment สำหรับขั้นตอนการชำระเงิน
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="checkout-primary-btn"
                onClick={handleConfirm}
                disabled={loading}
              >
                {loading ? "กำลังยืนยัน..." : "ยืนยันการชำระเงิน"}
              </button>

              <button
                type="button"
                className="checkout-secondary-btn"
                onClick={() => {
                  if (onClose) onClose();
                }}
                disabled={loading}
              >
                กลับไปแก้ไขข้อมูล
              </button>

              <p className="checkout-note">
                Demo นี้ไม่ตัดเงินจริง แต่จะอัปเดตข้อมูลในระบบ
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
