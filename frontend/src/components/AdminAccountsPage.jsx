import { useEffect, useState } from "react";
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
        setErrorMessage(typeof data === "string" ? data : "โหลดข้อมูลผู้ใช้ไม่สำเร็จ");
        return;
      }

      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      setErrorMessage("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
                ดูข้อมูลลูกค้าในระบบ (role และแพ็คเกจ)
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

          {loading && <p>กำลังโหลดข้อมูล...</p>}
          {errorMessage && <p className="error">{errorMessage}</p>}

          {!loading && !errorMessage && (
            <div className="admin-accounts-table">
              <div
                className="admin-table-header"
                style={{
                  gridTemplateColumns: "1.5fr 2fr 1fr 1fr",
                }}
              >
                <div>ชื่อ</div>
                <div>อีเมล</div>
                <div>Role</div>
                <div>แพ็คเกจ</div>
              </div>

              <div className="admin-table-body">
                {users.map((item) => (
                  <div
                    className="admin-table-row"
                    key={item.id}
                    style={{
                      gridTemplateColumns: "1.5fr 2fr 1fr 1fr",
                    }}
                  >
                    <div className="admin-col-name">
                      <div className="admin-user-avatar">
                        {(item.fullName || item.email || "U").charAt(0)}
                      </div>
                      {item.fullName || "-"}
                    </div>

                    <div className="admin-col-email">
                      {item.email}
                    </div>

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
                  </div>
                ))}

                {users.length === 0 && (
                  <div className="admin-table-row">
                    <div>ยังไม่มีข้อมูลผู้ใช้งาน</div>
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