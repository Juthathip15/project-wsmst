import { useEffect, useState, useCallback, useMemo } from "react";
import Navbar from "./Navbar";
import { getApiProducts, createApiProduct, updateApiProduct, deleteApiProduct } from "../api/api";

// Initial form data outside component to prevent recreation
const initialFormData = {
  key: "",
  slug: "",
  name: "",
  description: "",
  category: "",
  endpoint: "",
  targetUsers: [],
  availablePlans: [],
  method: "POST",
  headers: "",
  sampleResponse: "",
};

export default function AdminApiProductsPage({
  onNavigate,
  onLoginClick,
  user,
  onLogout,
}) {
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const loadApiProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getApiProducts();
      // Transform backend data to match front-end structure
      const transformedData = (res.data || []).map(api => ({
        ...api,
        key: api.key || api.slug,
        method: api.endpoint?.split(' ')[0] || 'POST',
        targetUsers: Array.isArray(api.targetUsers) ? api.targetUsers : (api.targetUsers ? api.targetUsers.split(',').map(s => s.trim()) : []),
        availablePlans: Array.isArray(api.availablePlans) ? api.availablePlans : (api.availablePlans ? api.availablePlans.split(',').map(s => s.trim()) : []),
      }));
      setApiProducts(transformedData);
    } catch (err) {
      setError(err.message || "Failed to load API products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadApiProducts();
  }, [loadApiProducts]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((e) => {
    setFilterCategory(e.target.value);
  }, []);

  const openCreateModal = useCallback(() => {
    setFormData(initialFormData);
    setIsCreating(true);
    setEditingProduct(null);
    setShowModal(true);
  }, []);

  const openEditModal = useCallback((api) => {
    setFormData({
      key: api.key,
      slug: api.slug,
      name: api.name,
      description: api.description,
      category: api.category,
      endpoint: api.endpoint,
      targetUsers: Array.isArray(api.targetUsers) ? api.targetUsers : (api.targetUsers ? api.targetUsers.split(',').map(s => s.trim()) : []),
      availablePlans: Array.isArray(api.availablePlans) ? api.availablePlans : (api.availablePlans ? api.availablePlans.split(',').map(s => s.trim()) : []),
      method: api.method || "POST",
      headers: api.headers || "",
      sampleResponse: api.sampleResponse,
    });
    setIsCreating(false);
    setEditingProduct(api);
    setShowModal(true);
  }, []);

  const handleSave = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      if (isCreating) {
        await createApiProduct(token, formData);
      } else {
        await updateApiProduct(token, editingProduct.key, formData);
      }
      setShowModal(false);
      await loadApiProducts();
    } catch (err) {
      setError(err.message || "Failed to save API product");
    }
  }, [formData, isCreating, editingProduct, loadApiProducts]);

  const handleDelete = useCallback(async (productKey) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบ API Product นี้?")) return;

    // Optimistically update UI first
    setApiProducts(prev => prev.filter(api => api.key !== productKey));

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Revert the optimistic update if no token
        await loadApiProducts();
        return;
      }

      await deleteApiProduct(token, productKey);
      // Success - UI already updated, no need to reload
    } catch (err) {
      // Revert the optimistic update on error
      await loadApiProducts();
      setError(err.message || "Failed to delete API product");
    }
  }, [loadApiProducts]);

  function formatJSON(value) {
    if (!value) return "{}";
    try {
      if (typeof value === 'object') return JSON.stringify(value, null, 2);
      return JSON.stringify(JSON.parse(value), null, 2);
    } catch {
      return value;
    }
  }

  return (
    <div className="admin-api-products-page">
      <Navbar
        onNavigate={onNavigate}
        onLoginClick={onLoginClick}
        user={user}
        onLogout={onLogout}
        activePage="admin-api-products"
        isAdmin={true}
      />

      <section className="api-products-section">
        <div className="api-products-container">
          <div className="admin-dashboard-header" style={{ marginBottom: "2rem" }}>
            <div>
              <h1 className="admin-dashboard-page-title">จัดการ API Products</h1>
              <p className="admin-dashboard-page-subtitle">
                จัดการรายการ API ข้อมูลสุขภาพและระบบหลังบ้านของคุณ
              </p>
            </div>
          </div>

          <div className="admin-api-products-stats" style={{ marginBottom: "2rem" }}>
            <div className="admin-api-products-stats-card admin-card-pad">
              <p className="admin-api-products-stats-label">จำนวน API Products ทั้งหมด</p>
              <h3 className="admin-api-products-stats-value">{apiProducts.length}</h3>
            </div>
          </div>

          <div className="admin-api-products-filters" style={{ marginBottom: "2rem" }}>
            <input
              className="admin-search-input"
              type="text"
              placeholder="ค้นหา API Product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="admin-filter-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">ทุกหมวดหมู่</option>
              <option value="Risk Analysis">Risk Analysis</option>
              <option value="Insurance Scoring">Insurance Scoring</option>
              <option value="Service Search">Service Search</option>
              <option value="Recommendation">Recommendation</option>
            </select>

            <button type="button" className="admin-add-btn" onClick={openCreateModal}>
              + เพิ่ม API ใหม่
            </button>
          </div>

          {!loading && (
            <div className="api-products-grid">
              {apiProducts
                .filter((api) => {
                  const matchesSearch =
                    searchTerm === "" ||
                    (api.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
                    (api.description?.toLowerCase() || "").includes(searchTerm.toLowerCase());
                  const matchesCategory = filterCategory === "All" || api.category === filterCategory;
                  return matchesSearch && matchesCategory;
                })
                .map((api) => (
                  <div key={api.key} className="api-product-card">
                    <div className="api-product-top">
                      <span className="api-product-tag">{api.category}</span>
                      <h3 className="api-product-title">{api.name}</h3>
                      <p className="api-product-description">{api.description}</p>
                    </div>

                    <div className="api-product-block">
                      <p className="api-product-label">Target users</p>
                      <p className="api-product-text">{Array.isArray(api.targetUsers) ? api.targetUsers.join(', ') : api.targetUsers}</p>
                    </div>

                    <div className="api-product-block">
                      <p className="api-product-label">Available plans</p>
                      <p className="api-product-text">{Array.isArray(api.availablePlans) ? api.availablePlans.join(', ') : api.availablePlans}</p>
                    </div>

                    <div className="api-product-block">
                      <p className="api-product-label">Method</p>
                      <p className="api-product-text">{api.method}</p>
                    </div>

                    <div className="api-product-block">
                      <p className="api-product-label">Endpoint</p>
                      <code className="api-product-endpoint">{api.endpoint}</code>
                    </div>

                    <div className="api-product-block">
                      <p className="api-product-label">Example response</p>
                      <pre className="api-product-code" style={{ maxHeight: "150px", overflowY: "auto" }}>
                        {formatJSON(api.sampleResponse)}
                      </pre>
                    </div>

                    <div className="admin-packages-card-footer" style={{ marginTop: "20px", paddingTop: "15px", borderTop: "1px solid #eee" }}>
                      <span className="admin-packages-status active" style={{ fontSize: "0.85rem" }}>
                        Active
                      </span>
                      <div className="admin-packages-actions">
                        <button
                          type="button"
                          className="admin-packages-action-btn"
                          onClick={() => openEditModal(api)}
                        >
                          แก้ไข
                        </button>
                        <button
                          type="button"
                          className="admin-packages-action-btn delete"
                          onClick={() => handleDelete(api.key)}
                        >
                          ลบ
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="admin-modal-title">
              {isCreating ? "เพิ่ม API Product ใหม่" : "แก้ไข API Product"}
            </h2>
            <div className="admin-modal-content">
              <div className="admin-modal-field">
                <label className="admin-modal-label">Name</label>
                <input
                  className="admin-modal-input"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="admin-modal-field">
                <label className="admin-modal-label">Category</label>
                <select
                  className="admin-modal-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Risk Analysis">Risk Analysis</option>
                  <option value="Insurance Scoring">Insurance Scoring</option>
                  <option value="Service Search">Service Search</option>
                  <option value="Recommendation">Recommendation</option>
                </select>
              </div>
              <div className="admin-modal-field">
                <label className="admin-modal-label">Endpoint</label>
                <input
                  className="admin-modal-input"
                  type="text"
                  value={formData.endpoint}
                  onChange={(e) => setFormData({ ...formData, endpoint: e.target.value })}
                />
              </div>
              <div className="admin-modal-field">
                <label className="admin-modal-label">Target Users</label>
                <div className="admin-modal-checkbox-group">
                  {["Insurance", "Hospital", "Health App"].map((option) => (
                    <label key={option} className="admin-modal-checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.targetUsers.includes(option)}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...formData.targetUsers, option]
                            : formData.targetUsers.filter(item => item !== option);
                          setFormData({ ...formData, targetUsers: updated });
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div className="admin-modal-field">
                <label className="admin-modal-label">Available Plans</label>
                <div className="admin-modal-checkbox-group">
                  {["silver", "gold"].map((option) => (
                    <label key={option} className="admin-modal-checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.availablePlans.includes(option)}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...formData.availablePlans, option]
                            : formData.availablePlans.filter(item => item !== option);
                          setFormData({ ...formData, availablePlans: updated });
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div className="admin-modal-field">
                <label className="admin-modal-label">Method</label>
                <select
                  className="admin-modal-select"
                  value={formData.method}
                  onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>
              <div className="admin-modal-field">
                <label className="admin-modal-label">Example Response (JSON)</label>
                <textarea
                  className="admin-modal-textarea"
                  value={formData.sampleResponse}
                  onChange={(e) => setFormData({ ...formData, sampleResponse: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="admin-modal-field">
                <label className="admin-modal-label">Description</label>
                <textarea
                  className="admin-modal-textarea"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>
            </div>
            <div className="admin-modal-actions">
              <button type="button" className="admin-modal-cancel" onClick={() => setShowModal(false)}>
                ยกเลิก
              </button>
              <button type="button" className="admin-modal-submit" onClick={handleSave}>
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}