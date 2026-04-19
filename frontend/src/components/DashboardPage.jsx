import { useMemo } from "react";
import Navbar from "./Navbar";

export default function DashboardPage({
  onNavigate,
  onLoginClick,
  user,
  usage,
  onLogout,
}) {
  const usagePercent = useMemo(() => {
    if (!usage?.quotaLimit) return 0;
    return Math.min((usage.quotaUsed / usage.quotaLimit) * 100, 100);
  }, [usage]);

  const recentActivities = [
    {
      title: "เรียกใช้งาน Risk Score API",
      time: "วันนี้ • 10:42 น.",
      detail: "POST /api/v1/analysis/risk-score",
    },
    {
      title: "ค้นหาสถานพยาบาล",
      time: "วันนี้ • 09:15 น.",
      detail: "GET /api/v1/services/search?q=clinic",
    },
    {
      title: "ตรวจสอบ usage account",
      time: "เมื่อวาน • 16:20 น.",
      detail: "GET /api/v1/usage",
    },
  ];

  return (
    <div className="dashboard-page">
      <Navbar
        onNavigate={onNavigate}
        onLoginClick={onLoginClick}
        user={user}
        onLogout={onLogout}
        activePage="dashboard"
      />

      <section className="dashboard-section">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <div>
              <span className="dashboard-badge">Business Overview</span>
              <h1 className="dashboard-page-title">Account Dashboard</h1>
              <p className="dashboard-page-subtitle">
                ภาพรวมแพ็กเกจ การใช้งาน subscription และกิจกรรมล่าสุดของ account นี้
              </p>
            </div>
          </div>

          <div className="dashboard-summary-grid">
            <div className="dashboard-summary-card dashboard-card-pad">
              <p className="dashboard-label">Current Plan</p>
              <h3 className="dashboard-value">{usage?.plan || "basic"}</h3>
            </div>

            <div className="dashboard-summary-card dashboard-card-pad">
              <p className="dashboard-label">Quota Used</p>
              <h3 className="dashboard-value">{usage?.quotaUsed || 0}</h3>
            </div>

            <div className="dashboard-summary-card dashboard-card-pad">
              <p className="dashboard-label">Remaining</p>
              <h3 className="dashboard-value">{usage?.remaining || 0}</h3>
            </div>

            <div className="dashboard-summary-card dashboard-card-pad">
              <p className="dashboard-label">Account Owner</p>
              <h3 className="dashboard-value dashboard-value-email">
                {user?.full_name || user?.name || user?.email || "-"}
              </h3>
            </div>
          </div>

          <div className="dashboard-main-grid">
            <div className="dashboard-main-left">
              <div className="dashboard-main-card dashboard-card-pad">
                <h3 className="dashboard-card-title">Usage Overview</h3>
                <p className="dashboard-card-text">
                  Quota limit: {usage?.quotaLimit || 1000}
                </p>

                <div className="progress-bar">
                  <div
                    className={`progress-fill ${
                      usagePercent >= 80 ? "high" : usagePercent >= 50 ? "mid" : "low"
                    }`}
                    style={{ width: `${usagePercent}%` }}
                  />
                </div>

                <p className="usage-percent">{usagePercent.toFixed(1)}% used</p>

                <div className="dashboard-usage-meta">
                  <div className="dashboard-usage-meta-item">
                    <span className="dashboard-mini-label">Used</span>
                    <strong>{usage?.quotaUsed || 0}</strong>
                  </div>
                  <div className="dashboard-usage-meta-item">
                    <span className="dashboard-mini-label">Limit</span>
                    <strong>{usage?.quotaLimit || 1000}</strong>
                  </div>
                  <div className="dashboard-usage-meta-item">
                    <span className="dashboard-mini-label">Remaining</span>
                    <strong>{usage?.remaining || 0}</strong>
                  </div>
                </div>
              </div>

              <div className="dashboard-main-card dashboard-card-pad">
                <h3 className="dashboard-card-title">Billing / Subscription Status</h3>

                <div className="dashboard-billing-grid">
                  <div className="dashboard-billing-item">
                    <span className="dashboard-mini-label">Status</span>
                    <strong className="dashboard-status-active">Active</strong>
                  </div>

                  <div className="dashboard-billing-item">
                    <span className="dashboard-mini-label">Billing Cycle</span>
                    <strong>Monthly</strong>
                  </div>

                  <div className="dashboard-billing-item">
                    <span className="dashboard-mini-label">Next Billing Date</span>
                    <strong>30 Apr 2026</strong>
                  </div>

                  <div className="dashboard-billing-item">
                    <span className="dashboard-mini-label">Current Package</span>
                    <strong>{usage?.plan || "basic"}</strong>
                  </div>
                </div>
              </div>

              <div className="dashboard-main-card dashboard-card-pad">
                <h3 className="dashboard-card-title">Recent Activity</h3>

                <div className="dashboard-activity-list">
                  {recentActivities.map((item, index) => (
                    <div key={index} className="dashboard-activity-item">
                      <div className="dashboard-activity-dot" />
                      <div className="dashboard-activity-content">
                        <p className="dashboard-activity-title">{item.title}</p>
                        <p className="dashboard-activity-detail">{item.detail}</p>
                        <p className="dashboard-activity-time">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="dashboard-main-right">
              <div className="dashboard-side-card dashboard-card-pad">
                <h3 className="dashboard-card-title">Quick Actions</h3>

                <div className="dashboard-action-list">
                  <button
                    type="button"
                    className="dashboard-action-btn primary"
                    onClick={() => onNavigate("packages")}
                  >
                    Upgrade Package
                  </button>

                  <button
                    type="button"
                    className="dashboard-action-btn"
                    onClick={() => onNavigate("docs")}
                  >
                    View Docs
                  </button>

                  <button
                    type="button"
                    className="dashboard-action-btn"
                    onClick={() => onNavigate("api-products")}
                  >
                    Explore API Products
                  </button>

                  <button
                    type="button"
                    className="dashboard-action-btn"
                    onClick={() => onNavigate("developer")}
                  >
                    Open Developer Portal
                  </button>
                </div>
              </div>

              <div className="dashboard-side-card dashboard-card-pad">
                <h3 className="dashboard-card-title">Subscription Note</h3>
                <p className="dashboard-card-text">
                  หาก usage ของคุณเพิ่มขึ้นต่อเนื่อง
                  แนะนำให้อัปเกรดแพ็กเกจเพื่อรองรับ quota และ feature เพิ่มเติม
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}