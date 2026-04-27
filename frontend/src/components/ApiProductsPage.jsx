import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getApiProducts } from "../api/api";

export default function ApiProductsPage({
  onNavigate,
  onLoginClick,
  onOpenDocs,
  user,
  onLogout,
}) {
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadApiProducts() {
      setLoading(true);
      setError("");

      try {
        const res = await getApiProducts();
        setApiProducts(res.data || []);
      } catch (err) {
        setError(err.message || "Failed to load API products");
      } finally {
        setLoading(false);
      }
    }

    loadApiProducts();
  }, []);

  function formatJSON(value) {
    try {
      return JSON.stringify(JSON.parse(value), null, 2);
    } catch {
      return value;
    }
  }

  return (
    <div className="api-products-page">
      <Navbar
        onNavigate={onNavigate}
        onLoginClick={onLoginClick}
        user={user}
        onLogout={onLogout}
        activePage="api-products"
      />

      <section className="api-products-section">
        <div className="api-products-container">
          <div className="api-products-hero">
            <div>
              <span className="api-products-badge">API Catalog</span>
              <h1 className="api-products-title">API Products</h1>
              <p className="api-products-subtitle">
                รวม API ด้านข้อมูลสุขภาพและ health insight
                ที่ออกแบบมาเพื่อองค์กร นักพัฒนา และแพลตฟอร์มที่ต้องการต่อยอดข้อมูลไปใช้งานจริง
              </p>
            </div>

            <div className="api-products-hero-actions">
              <button
                type="button"
                className="api-products-primary-btn"
                onClick={() => onOpenDocs("health-risk-score")}
              >
                ดู API Docs
              </button>

              {!user && (
                <button
                  type="button"
                  className="api-products-secondary-btn"
                  onClick={onLoginClick}
                >
                  เริ่มใช้งาน
                </button>
              )}
            </div>
          </div>

          {loading && (
            <div className="api-products-grid">
              <div className="api-product-card">
                <h3 className="api-product-title">Loading...</h3>
                <p className="api-product-description">
                  กำลังโหลดรายการ API products
                </p>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="api-products-grid">
              <div className="api-product-card">
                <h3 className="api-product-title">โหลดข้อมูลไม่สำเร็จ</h3>
                <p className="error">{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="api-products-grid">
              {apiProducts.map((api) => (
                <div key={api.id} className="api-product-card">
                  <div className="api-product-top">
                    <span className="api-product-tag">{api.category}</span>
                    <h3 className="api-product-title">{api.name}</h3>
                    <p className="api-product-description">{api.description}</p>
                  </div>

                  <div className="api-product-block">
                    <p className="api-product-label">Target users</p>
                    <p className="api-product-text">{api.targetUsers}</p>
                  </div>

                  <div className="api-product-block">
                    <p className="api-product-label">Available plans</p>
                    <p className="api-product-text">{api.availablePlans}</p>
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
                    <pre className="api-product-code">
                      {formatJSON(api.sampleResponse)}
                    </pre>
                  </div>

                  <div className="api-product-actions">
  <button
    className="api-product-btn"
    onClick={() => onOpenDocs(api.slug)}
  >
    ดู Docs
  </button>

  <button
    className="api-product-btn"
    onClick={() => onNavigate("playground")}
  >
    Try API
  </button>

  <button
    className="api-product-btn"
    onClick={() => onNavigate("packages")}
  >
    Upgrade Plan
  </button>
</div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && apiProducts.length === 0 && (
            <div className="api-products-grid">
              <div className="api-product-card">
                <h3 className="api-product-title">ยังไม่มี API Product</h3>
                <p className="api-product-description">
                  ยังไม่พบข้อมูลจาก backend
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}