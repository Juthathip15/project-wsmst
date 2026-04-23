import { useState } from "react";
import Navbar from "./Navbar";

const mockAccounts = [
  { id: 1, name: "John Doe", email: "john@example.com", plan: "gold", role: "user", status: "active", joined: "2026-01-15", usage: 45234 },
  { id: 2, name: "Sarah Smith", email: "sarah@example.com", plan: "silver", role: "user", status: "active", joined: "2026-02-20", usage: 23456 },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", plan: "basic", role: "user", status: "inactive", joined: "2026-01-10", usage: 890 },
  { id: 4, name: "Anna Brown", email: "anna@example.com", plan: "gold", role: "admin", status: "active", joined: "2025-12-05", usage: 67890 },
  { id: 5, name: "David Lee", email: "david@example.com", plan: "silver", role: "user", status: "active", joined: "2026-03-01", usage: 12345 },
  { id: 6, name: "Emma Wilson", email: "emma@example.com", plan: "basic", role: "user", status: "active", joined: "2026-03-10", usage: 456 },
  { id: 7, name: "James Chen", email: "james@example.com", plan: "gold", role: "admin", status: "active", joined: "2025-11-20", usage: 89012 },
  { id: 8, name: "Lisa Tan", email: "lisa@example.com", plan: "silver", role: "user", status: "pending", joined: "2026-04-01", usage: 0 },
];

export default function AdminAccountsPage({
  onNavigate,
  onLoginClick,
  user,
  onLogout,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAccount, setNewAccount] = useState({ name: "", email: "", password: "", role: "admin" });
  const [editingAccount, setEditingAccount] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "", plan: "basic", status: "active" });

  const filteredAccounts = mockAccounts.filter((account) => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === "all" || account.plan === filterPlan;
    const matchesStatus = filterStatus === "all" || account.status === filterStatus;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const handleCreateAccount = () => {
    if (!newAccount.password) {
      alert("กรุณากรอกรหัสผ่าน");
      return;
    }
    const newId = mockAccounts.length + 1;
    mockAccounts.push({
      id: newId,
      name: newAccount.name,
      email: newAccount.email,
      password: newAccount.password,
      plan: "basic",
      role: newAccount.role,
      status: "active",
      joined: new Date().toISOString().split("T")[0],
      usage: 0,
    });
    setShowCreateModal(false);
    setNewAccount({ name: "", email: "", password: "", role: "admin" });
  };

  const handleEditClick = (account) => {
    setEditingAccount(account);
    setEditForm({
      name: account.name,
      email: account.email,
      plan: account.plan,
      status: account.status,
    });
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    const index = mockAccounts.findIndex(a => a.id === editingAccount.id);
    if (index > -1) {
      mockAccounts[index] = {
        ...mockAccounts[index],
        name: editForm.name,
        email: editForm.email,
        plan: editForm.plan,
        status: editForm.status,
      };
    }
    setShowEditModal(false);
    setEditingAccount(null);
  };

  const handleDeleteAccount = (userId) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบบัญชีนี้?")) return;
    const index = mockAccounts.findIndex(a => a.id === userId);
    if (index > -1) {
      mockAccounts.splice(index, 1);
    }
    setSearchTerm(searchTerm);
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
              <h1 className="admin-accounts-page-title">จัดการบัญชี</h1>
              <p className="admin-accounts-page-subtitle">
                จัดการข้อมูลบัญชีผู้ใช้งานและการเข้าถึงระบบ
              </p>
            </div>
            <button
              type="button"
              className="admin-add-btn"
              onClick={() => setShowCreateModal(true)}
            >
              + สร้างบัญชีแอดมิน
            </button>
          </div>

          <div className="admin-accounts-filters">
            <input
              className="admin-search-input"
              type="text"
              placeholder="ค้นหาชื่อหรืออีเมล..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="admin-filter-select"
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
            >
              <option value="all">ทุกแพ็กเกจ</option>
              <option value="basic">Basic</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
            </select>

            <select
              className="admin-filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">ทุกสถานะ</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="admin-accounts-table">
            <div className="admin-table-header">
              <span className="admin-col-name">ชื่อ</span>
              <span className="admin-col-email">อีเมล</span>
              <span className="admin-col-role">Role</span>
              <span className="admin-col-plan">แพ็กเกจ</span>
              <span className="admin-col-status">สถานะ</span>
              <span className="admin-col-usage">การใช้งาน</span>
              <span className="admin-col-joined">วันที่สมัคร</span>
              <span className="admin-col-actions">Actions</span>
            </div>

            <div className="admin-table-body">
              {filteredAccounts.map((account) => (
                <div key={account.id} className="admin-table-row">
                  <span className="admin-col-name">
                    <div className="admin-user-avatar">
                      {account.name.charAt(0)}
                    </div>
                    {account.name}
                  </span>
                  <span className="admin-col-email">{account.email}</span>
                  <span className="admin-col-role">
                    <span className={`admin-role-badge ${account.role}`}>
                      {account.role === "admin" ? "แอดมิน" : "ผู้ใช้งาน"}
                    </span>
                  </span>
                  <span className="admin-col-plan">
                    <span className={`admin-plan-badge ${account.plan}`}>
                      {account.plan}
                    </span>
                  </span>
                  <span className="admin-col-status">
                    <span className={`admin-status-badge ${account.status}`}>
                      {account.status === "active" && "ใช้งาน"}
                      {account.status === "inactive" && "ไม่ได้ใช้งาน"}
                      {account.status === "pending" && "รอดำเนินการ"}
                    </span>
                  </span>
                  <span className="admin-col-usage">
                    {account.usage.toLocaleString()}
                  </span>
                  <span className="admin-col-joined">{account.joined}</span>
                  <span className="admin-col-actions">
                    {account.role === "admin" && (
                      <>
                        <button
                          type="button"
                          className="admin-action-icon-btn"
                          title="Edit"
                          onClick={() => handleEditClick(account)}
                        >
                          ✏️
                        </button>
                        <button
                          type="button"
                          className="admin-action-icon-btn"
                          title="Delete"
                          onClick={() => handleDeleteAccount(account.id)}
                        >
                          🗑️
                        </button>
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-accounts-pagination">
            <span className="admin-pagination-info">
              แสดง {filteredAccounts.length} จาก {mockAccounts.length} รายการ
            </span>
          </div>

          {showCreateModal && (
            <div className="admin-modal-overlay" onClick={() => setShowCreateModal(false)}>
              <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                <h2 className="admin-modal-title">สร้างบัญชีแอดมิน</h2>
                <div className="admin-modal-field">
                  <label className="admin-modal-label">ชื่อ</label>
                  <input
                    className="admin-modal-input"
                    type="text"
                    value={newAccount.name}
                    onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                    placeholder="กรอกชื่อ"
                  />
                </div>
                <div className="admin-modal-field">
                  <label className="admin-modal-label">อีเมล</label>
                  <input
                    className="admin-modal-input"
                    type="email"
                    value={newAccount.email}
                    onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
                    placeholder="กรอกอีเมล"
                  />
                </div>
                <div className="admin-modal-field">
                  <label className="admin-modal-label">รหัสผ่าน</label>
                  <input
                    className="admin-modal-input"
                    type="password"
                    value={newAccount.password}
                    onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
                    placeholder="กรอกรหัสผ่าน"
                  />
                </div>
                <div className="admin-modal-field">
                  <label className="admin-modal-label">Role</label>
                  <select
                    className="admin-modal-select"
                    value={newAccount.role}
                    onChange={(e) => setNewAccount({ ...newAccount, role: e.target.value })}
                  >
                    <option value="admin">แอดมิน</option>
                  </select>
                </div>
                <div className="admin-modal-actions">
                  <button
                    type="button"
                    className="admin-modal-cancel"
                    onClick={() => setShowCreateModal(false)}
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="button"
                    className="admin-modal-submit"
                    onClick={handleCreateAccount}
                    disabled={!newAccount.name || !newAccount.email || !newAccount.password}
                  >
                    สร้างบัญชี
                  </button>
                </div>
              </div>
            </div>
          )}

          {showEditModal && (
            <div className="admin-modal-overlay" onClick={() => setShowEditModal(false)}>
              <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                <h2 className="admin-modal-title">แก้ไขบัญชีแอดมิน</h2>
                <div className="admin-modal-field">
                  <label className="admin-modal-label">ชื่อ</label>
                  <input
                    className="admin-modal-input"
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="กรอกชื่อ"
                  />
                </div>
                <div className="admin-modal-field">
                  <label className="admin-modal-label">อีเมล</label>
                  <input
                    className="admin-modal-input"
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    placeholder="กรอกอีเมล"
                  />
                </div>
                <div className="admin-modal-field">
                  <label className="admin-modal-label">แพ็กเกจ</label>
                  <select
                    className="admin-modal-select"
                    value={editForm.plan}
                    onChange={(e) => setEditForm({ ...editForm, plan: e.target.value })}
                  >
                    <option value="basic">Basic</option>
                    <option value="silver">Silver</option>
                    <option value="gold">Gold</option>
                  </select>
                </div>
                <div className="admin-modal-field">
                  <label className="admin-modal-label">สถานะ</label>
                  <select
                    className="admin-modal-select"
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  >
                    <option value="active">ใช้งาน</option>
                    <option value="inactive">ไม่ได้ใช้งาน</option>
                  </select>
                </div>
                <div className="admin-modal-actions">
                  <button
                    type="button"
                    className="admin-modal-cancel"
                    onClick={() => setShowEditModal(false)}
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="button"
                    className="admin-modal-submit"
                    onClick={handleEditSave}
                    disabled={!editForm.name || !editForm.email}
                  >
                    บันทึก
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}