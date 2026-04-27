import Navbar from "./Navbar";

export default function CheckoutPage({
  onNavigate,
  onLoginClick,
  user,
  onLogout,
  selectedPlan,
}) {
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

  const handleConfirm = () => {
    alert("จำลองการชำระเงินสำเร็จ ✅");
    onNavigate("dashboard");
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

          <div className="checkout-grid">
            <div className="checkout-card">
              <h2 className="checkout-card-title">{selectedPlan.title}</h2>
              <p className="checkout-price">{selectedPlan.price}</p>
              <p className="checkout-description">
                {selectedPlan.description}
              </p>

              <div className="checkout-detail-list">
                <div className="checkout-detail-item">
                  <span>Quota</span>
                  <strong>{selectedPlan.quota}</strong>
                </div>

                <div className="checkout-detail-item">
                  <span>Rate Limit</span>
                  <strong>{selectedPlan.rate}</strong>
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
              >
                ยืนยันการชำระเงิน
              </button>

              <button
                type="button"
                className="checkout-secondary-btn"
                onClick={() => onNavigate("packages")}
              >
                กลับไปเลือกแพ็คเกจ
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}