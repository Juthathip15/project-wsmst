import { useState } from "react";
import Navbar from "./Navbar";

const initialPackages = [
  {
    id: 1,
    key: "basic",
    title: "Basic",
    price: "ฟรี",
    description: "เหมาะสำหรับการทดลองใช้งาน API เบื้องต้น",
    features: [
      "1,000 requests/เดือน",
      "Rate limit: 10 req/นาที",
      "Basic search",
      "Read-only access",
    ],
    status: "active",
    subscribers: 523,
  },
  {
    id: 2,
    key: "silver",
    title: "Silver",
    price: "฿999/เดือน",
    description: "เหมาะสำหรับ partner ที่ต้องการใช้งานจริงระดับกลาง",
    features: [
      "50,000 requests/เดือน",
      "Rate limit: 100 req/นาที",
      "Advanced filters",
      "Usage dashboard",
    ],
    status: "active",
    subscribers: 234,
  },
  {
    id: 3,
    key: "gold",
    title: "Gold",
    price: "฿4,999/เดือน",
    description: "เหมาะสำหรับการใช้งานระดับสูงและ integration เต็มรูปแับบ",
    features: [
      "Unlimited requests",
      "Rate limit: 1,000 req/นาที",
      "Full-text + AI search",
      "Analytics + export",
    ],
    status: "active",
    subscribers: 89,
  },
];

export default function AdminPackagesPage({
  onNavigate,
  onLoginClick,
  user,
  onLogout,
}) {
  const [packages, setPackages] = useState(initialPackages);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    features: "",
    status: "active",
  });

  const totalSubscribers = packages.reduce((sum, pkg) => sum + pkg.subscribers, 0);
  const monthlyRevenue = packages.reduce((sum, pkg) => {
    if (pkg.key === "silver") return sum + 999 * pkg.subscribers;
    if (pkg.key === "gold") return sum + 4999 * pkg.subscribers;
    return sum;
  }, 0);

  const openCreateModal = () => {
    setFormData({ title: "", price: "", description: "", features: "", status: "active" });
    setIsCreating(true);
    setEditingPackage(null);
    setShowModal(true);
  };

  const openEditModal = (pkg) => {
    setFormData({
      title: pkg.title,
      price: pkg.price,
      description: pkg.description,
      features: pkg.features.join("\n"),
      status: pkg.status,
    });
    setIsCreating(false);
    setEditingPackage(pkg);
    setShowModal(true);
  };

  const handleSave = () => {
    const featuresList = formData.features.split("\n").filter((f) => f.trim());
    
    if (isCreating) {
      const newPkg = {
        id: packages.length + 1,
        key: formData.title.toLowerCase(),
        title: formData.title,
        price: formData.price,
        description: formData.description,
        features: featuresList,
        status: formData.status,
        subscribers: 0,
      };
      setPackages([...packages, newPkg]);
    } else {
      setPackages(packages.map((p) => 
        p.id === editingPackage.id
          ? { ...p, title: formData.title, price: formData.price, description: formData.description, features: featuresList, status: formData.status }
          : p
      ));
    }
    setShowModal(false);
  };

  const handleDelete = (pkgId) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบแพ็กเกจนี้?")) return;
    setPackages(packages.filter((p) => p.id !== pkgId));
  };

  return (
    <div className="admin-packages-page">
      <Navbar
        onNavigate={onNavigate}
        onLoginClick={onLoginClick}
        user={user}
        onLogout={onLogout}
        activePage="admin-packages"
        isAdmin={true}
      />

      <section className="admin-packages-section">
        <div className="admin-packages-container">
          <div className="admin-packages-header">
            <div>
              <h1 className="admin-packages-page-title">จัดการแพ็กเกจ</h1>
              <p className="admin-packages-page-subtitle">
                จัดการแพ็กเกจและการ subscription ของผู้ใช้งาน
              </p>
            </div>
          </div>

          <div className="admin-packages-stats">
            <div className="admin-packages-stats-card admin-card-pad">
              <p className="admin-packages-stats-label">ยอดรวมผู้สมัคร</p>
              <h3 className="admin-packages-stats-value">{totalSubscribers}</h3>
            </div>
            <div className="admin-packages-stats-card admin-card-pad">
              <p className="admin-packages-stats-label">รายได้ต่อเดือน</p>
              <h3 className="admin-packages-stats-value">฿{monthlyRevenue.toLocaleString()}</h3>
            </div>
            <div className="admin-packages-stats-card admin-card-pad">
              <p className="admin-packages-stats-label">Active Packages</p>
              <h3 className="admin-packages-stats-value">{packages.length}</h3>
            </div>
          </div>

          <div className="admin-packages-filters">
            <input
              className="admin-search-input"
              type="text"
              placeholder="ค้นหาแพ็กเกจ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button
              type="button"
              className="admin-add-btn"
              onClick={openCreateModal}
            >
              + เพิ่มแพ็กเกจใหม่
            </button>
          </div>

          <div className="admin-packages-grid">
            {packages
              .filter((pkg) =>
                pkg.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((pkg) => (
                <div
                  key={pkg.key}
                  className="admin-packages-card admin-card-pad"
                >
                  <div className="admin-packages-card-header">
                    <h3 className="admin-packages-card-title">{pkg.title}</h3>
                    <span className={`admin-packages-status ${pkg.status}`}>
                      {pkg.status === "active" ? "ใช้งาน" : "ไม่ได้ใช้งาน"}
                    </span>
                  </div>

                  <p className="admin-packages-card-price">{pkg.price}</p>
                  <p className="admin-packages-card-description">{pkg.description}</p>

                  <ul className="admin-packages-features">
                    {pkg.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>

<div className="admin-packages-card-footer">
                      <span className="admin-packages-subscribers">
                        {pkg.subscribers} ผู้สมัคร
                      </span>
                      <div className="admin-packages-actions">
                        <button
                          type="button"
                          className="admin-packages-action-btn"
                          onClick={() => openEditModal(pkg)}
                        >
                          แก้ไข
                        </button>
                        <button
                          type="button"
                          className="admin-packages-action-btn delete"
                          onClick={() => handleDelete(pkg.id)}
                        >
                          ลบ
                        </button>
                      </div>
                    </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="admin-modal-title">
              {isCreating ? "เพิ่มแพ็กเกจใหม่" : "แก้ไขแพ็กเกจ"}
            </h2>
            <div className="admin-modal-field">
              <label className="admin-modal-label">ชื่อแพ็กเกจ</label>
              <input
                className="admin-modal-input"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="กรอกชื่อแพ็กเกจ"
              />
            </div>
            <div className="admin-modal-field">
              <label className="admin-modal-label">ราคา</label>
              <input
                className="admin-modal-input"
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="เช่น ฿999/เดือน"
              />
            </div>
            <div className="admin-modal-field">
              <label className="admin-modal-label">คำอธิบาย</label>
              <textarea
                className="admin-modal-textarea"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="กรอกคำอธิบาย"
                rows={3}
              />
            </div>
            <div className="admin-modal-field">
              <label className="admin-modal-label">Features (หนึ่งบรรทัดต่อหนึ่งข้อ)</label>
              <textarea
                className="admin-modal-textarea"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                rows={4}
              />
            </div>
            <div className="admin-modal-field">
              <label className="admin-modal-label">สถานะ</label>
              <select
                className="admin-modal-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="active">ใช้งาน</option>
                <option value="inactive">ไม่ได้ใช้งาน</option>
              </select>
            </div>
            <div className="admin-modal-actions">
              <button
                type="button"
                className="admin-modal-cancel"
                onClick={() => setShowModal(false)}
              >
                ยกเลิก
              </button>
              <button
                type="button"
                className="admin-modal-submit"
                onClick={handleSave}
                disabled={!formData.title || !formData.price}
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}