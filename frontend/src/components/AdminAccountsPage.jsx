import { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";

export default function AdminAccountsPage({
  onNavigate,
  onLoginClick,
  user,
  onLogout,
}) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  const fetchUsers = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8080/api/v1/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await response.text();

      let data;
      try {
        data = text ? JSON.parse(text) : [];
      } catch {
        data = text;
      }

      if (!response.ok) {
        setErrorMessage(
          typeof data === "string" ? data : "โหลดข้อมูลผู้ใช้ไม่สำเร็จ"
        );
        return;
      }

      setUsers(Array.isArray(data) ? data : []);
    } catch {
      setErrorMessage("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const stats = useMemo(() => {
    return {
      total: users.length,
      clients: users.filter((item) => item.role === "client").length,
      admins: users.filter((item) => item.role === "admin").length,
      gold: users.filter((item) => item.plan === "gold").length,
    };
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((item) => {
      const keyword = searchText.toLowerCase();
      const fullName = (item.fullName || "").toLowerCase();
      const email = (item.email || "").toLowerCase();

      const matchSearch =
        fullName.includes(keyword) || email.includes(keyword);

      const matchRole = roleFilter === "all" || item.role === roleFilter;
      const matchPlan = planFilter === "all" || item.plan === planFilter;

      return matchSearch && matchRole && matchPlan;
    });
  }, [users, searchText, roleFilter, planFilter]);

  const getMockJoinedDate = (id) => {
    const dates = [
      "12 Apr 2026",
      "18 Apr 2026",
      "21 Apr 2026",
      "25 Apr 2026",
      "28 Apr 2026",
    ];

    return dates[id % dates.length];
  };

  return (
    <div className="admin-accounts-page">
      <Navbar
        onNavigate={onNavigate}
        onLoginClick={onLoginClick}
        user={user}
        onLogout={onLogout}
        activePage="admin-accounts"
        isAdmin={true}
      />

      <section className="admin-accounts-section">
        <div className="admin-accounts-container">
          <div className="admin-accounts-header">
            <div>
              <span className="admin-accounts-badge">Admin Panel</span>
              <h1 className="admin-accounts-page-title">จัดการบัญชี</h1>
              <p className="admin-accounts-page-subtitle">
                ดูภาพรวมบัญชีผู้ใช้งาน ลูกค้า แอดมิน และแพ็คเกจที่ใช้งานอยู่
              </p>
            </div>

            <button
              type="button"
              className="admin-add-btn"
              onClick={fetchUsers}
            >
              Refresh
            </button>
          </div>

          <div className="admin-account-stats-grid">
            <div className="admin-account-stat-card">
              <p>Total Users</p>
              <strong>{stats.total}</strong>
            </div>

            <div className="admin-account-stat-card">
              <p>Clients</p>
              <strong>{stats.clients}</strong>
            </div>

            <div className="admin-account-stat-card">
              <p>Admins</p>
              <strong>{stats.admins}</strong>
            </div>

            <div className="admin-account-stat-card">
              <p>Gold Plan</p>
              <strong>{stats.gold}</strong>
            </div>
          </div>

          <div className="admin-accounts-filters">
            <input
              className="admin-search-input"
              type="text"
              placeholder="ค้นหาชื่อหรืออีเมล"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <select
              className="admin-filter-select"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">Role ทั้งหมด</option>
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>

            <select
              className="admin-filter-select"
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
            >
              <option value="all">Plan ทั้งหมด</option>
              <option value="basic">Basic</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
            </select>
          </div>

          {loading && <p>กำลังโหลดข้อมูล...</p>}
          {errorMessage && <p className="error">{errorMessage}</p>}

          {!loading && !errorMessage && (
            <div className="admin-accounts-table">
              <div
                className="admin-table-header"
                style={{
                  gridTemplateColumns: "1.4fr 2fr 0.8fr 0.8fr 0.8fr 1fr 0.7fr",
                }}
              >
                <div>ชื่อ</div>
                <div>อีเมล</div>
                <div>Role</div>
                <div>Plan</div>
                <div>Status</div>
                <div>Joined</div>
                <div>Action</div>
              </div>

              <div className="admin-table-body">
                {filteredUsers.map((item) => (
                  <div
                    className="admin-table-row"
                    key={item.id}
                    style={{
                      gridTemplateColumns:
                        "1.4fr 2fr 0.8fr 0.8fr 0.8fr 1fr 0.7fr",
                    }}
                  >
                    <div className="admin-col-name">
                      <div className="admin-user-avatar">
                        {(item.fullName || item.email || "U").charAt(0)}
                      </div>
                      {item.fullName || "-"}
                    </div>

                    <div className="admin-col-email">{item.email}</div>

                    <div>
                      <span
                        className={`admin-role-badge ${
                          item.role === "admin" ? "admin" : "user"
                        }`}
                      >
                        {item.role}
                      </span>
                    </div>

                    <div>
                      <span className={`admin-plan-badge ${item.plan}`}>
                        {item.plan || "basic"}
                      </span>
                    </div>

                    <div>
                      <span className="admin-status-badge active">active</span>
                    </div>

                    <div className="admin-col-email">
                      {getMockJoinedDate(item.id)}
                    </div>

                    <div className="admin-col-actions">
                      <button
                        type="button"
                        className="admin-action-icon-btn"
                        title="View account"
                        onClick={() =>
                          alert(
                            `Account detail\n\nName: ${
                              item.fullName || "-"
                            }\nEmail: ${item.email}\nRole: ${
                              item.role
                            }\nPlan: ${item.plan || "basic"}`
                          )
                        }
                      >
                        👁
                      </button>
                    </div>
                  </div>
                ))}

                {filteredUsers.length === 0 && (
                  <div
                    className="admin-table-row"
                    style={{ gridTemplateColumns: "1fr" }}
                  >
                    <div>ไม่พบข้อมูลผู้ใช้งานตามเงื่อนไขที่ค้นหา</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}