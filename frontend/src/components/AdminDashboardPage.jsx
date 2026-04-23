import { useMemo } from "react";
import Navbar from "./Navbar";

export default function AdminDashboardPage({
  onNavigate,
  onLoginClick,
  user,
  onLogout,
}) {
  const stats = [
    { label: "ยอดผู้ใช้งานทั้งหมด", value: "1,234"},
    { label: "Active Subscriptions", value: "856"},
    { label: "รายได้ต่อเดือน", value: "฿124,500"},
    { label: "API Requests", value: "45.2K"},
  ];

  const recentActivities = [
    { title: "สมัครสมาชิกใหม่", user: "john@example.com", time: "2 นาทีที่แล้ว", type: "register" },
    { title: "อัปเกรดแพ็กเกจ", user: "sara@example.com", time: "15 นาทีที่แล้ว", type: "upgrade" },
    { title: "แก้ไขข้อมูล", user: "admin@company.com", time: "1 ชั่วโมงที่แล้ว", type: "edit" },
    { title: "เปลี่ยนแพ็กเกจ", user: "mike@example.com", time: "2 ชั่วโมงที่แล้ว", type: "change" },
    { title: "สมัครสมาชิกใหม่", user: "anna@example.com", time: "3 ชั่วโมงที่แล้ว", type: "register" },
  ];

  const usageData = [
    { service: "Risk Score API", requests: 18234, percentage: 72 },
    { service: "Hospital Search", requests: 12456, percentage: 58 },
    { service: "Clinic Lookup", requests: 8923, percentage: 41 },
    { service: "Health Analysis", requests: 4587, percentage: 28 },
  ];

  return (
    <div className="admin-dashboard-page">
      <Navbar
        onNavigate={onNavigate}
        onLoginClick={onLoginClick}
        user={user}
        onLogout={onLogout}
        activePage="admin-dashboard"
        isAdmin={true}
      />

      <section className="admin-dashboard-section">
        <div className="admin-dashboard-container">
          <div className="admin-dashboard-header">
            <div>
              <h1 className="admin-dashboard-page-title">Dashboard</h1>
              <p className="admin-dashboard-page-subtitle">
                ภาพรวมระบบและสถิติการใช้งานทั้งหมด
              </p>
            </div>
          </div>

          <div className="admin-stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="admin-stats-card admin-card-pad">
                <p className="admin-stats-label">{stat.label}</p>
                <div className="admin-stats-value-row">
                  <h3 className="admin-stats-value">{stat.value}</h3>
                  <span className="admin-stats-change">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="admin-dashboard-main-grid">
            <div className="admin-dashboard-main-left">
              <div className="admin-dashboard-main-card admin-card-pad">
                <h3 className="admin-dashboard-card-title">การใช้งาน API Services</h3>

                <div className="admin-usage-list">
                  {usageData.map((item, index) => (
                    <div key={index} className="admin-usage-item">
                      <div className="admin-usage-header">
                        <span className="admin-usage-service">{item.service}</span>
                        <span className="admin-usage-requests">{item.requests.toLocaleString()} requests</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="admin-dashboard-main-card admin-card-pad">
                <h3 className="admin-dashboard-card-title">กิจกรรมล่าสุด</h3>

                <div className="admin-activity-list">
                  {recentActivities.map((item, index) => (
                    <div key={index} className="admin-activity-item">
                      <div className="admin-activity-icon" data-type={item.type}>
                        {item.type === "register" && "👤"}
                        {item.type === "upgrade" && "⬆️"}
                        {item.type === "edit" && "✏️"}
                        {item.type === "change" && "🔄"}
                      </div>
                      <div className="admin-activity-content">
                        <p className="admin-activity-title">{item.title}</p>
                        <p className="admin-activity-user">{item.user}</p>
                      </div>
                      <span className="admin-activity-time">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="admin-dashboard-main-right">
              <div className="admin-dashboard-side-card admin-card-pad">
                <h3 className="admin-dashboard-card-title">Quick Actions</h3>

                <div className="admin-action-list">
                  <button
                    type="button"
                    className="admin-action-btn primary"
                    onClick={() => onNavigate("admin-accounts")}
                  >
                    จัดการบัญชี
                  </button>

                  <button
                    type="button"
                    className="admin-action-btn"
                    onClick={() => onNavigate("admin-packages")}
                  >
                    จัดการแพ็กเกจ
                  </button>
                </div>
              </div>

              <div className="admin-dashboard-side-card admin-card-pad">
                <h3 className="admin-dashboard-card-title">System Status</h3>
                <div className="admin-status-list">
                  <div className="admin-status-item">
                    <span className="admin-status-dot active" />
                    <span>API Server</span>
                    <span className="admin-status-label">Online</span>
                  </div>
                  <div className="admin-status-item">
                    <span className="admin-status-dot active" />
                    <span>Database</span>
                    <span className="admin-status-label">Online</span>
                  </div>
                  <div className="admin-status-item">
                    <span className="admin-status-dot active" />
                    <span>Auth Service</span>
                    <span className="admin-status-label">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}