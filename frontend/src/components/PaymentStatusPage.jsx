import Navbar from "./Navbar";

export default function PaymentStatusPage({
  onNavigate,
  onLoginClick,
  user,
  onLogout,
  paymentPlan,
  isModal = false,
}) {
  return (
    <div
      className={
        isModal
          ? "payment-status-page payment-status-page-modal"
          : "payment-status-page"
      }
    >
      {!isModal && (
        <Navbar
          onNavigate={onNavigate}
          onLoginClick={onLoginClick}
          user={user}
          onLogout={onLogout}
          activePage="packages"
        />
      )}

      <section className="payment-status-section">
        <div className="payment-status-card">
          <div className="payment-status-icon">✓</div>

          <span className="payment-status-badge">Payment Success</span>

          <h1 className="payment-status-title">ชำระเงินสำเร็จ</h1>

          <p className="payment-status-text">
            ระบบได้อัปเดตแพ็คเกจของคุณเป็น{" "}
            <strong>{paymentPlan?.title || user?.plan || "-"}</strong> แล้ว
          </p>

          <div className="payment-status-summary">
            <div>
              <span>Account</span>
              <strong>{user?.email || "-"}</strong>
            </div>

            <div>
              <span>Current Plan</span>
              <strong>{user?.plan || paymentPlan?.key || "-"}</strong>
            </div>

            <div>
              <span>Status</span>
              <strong className="payment-status-active">Active</strong>
            </div>
          </div>

          <div className="payment-status-actions">
            <button
              type="button"
              className="checkout-primary-btn"
              onClick={() => onNavigate("dashboard")}
            >
              ไปหน้า Dashboard
            </button>

            <button
              type="button"
              className="checkout-secondary-btn"
              onClick={() => onNavigate("packages")}
            >
              ดูแพ็คเกจ
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}