import Navbar from "./Navbar";
import apiProducts from "../data/apiProducts.json";

export default function ApiProductsPage({
  onNavigate,
  onLoginClick,
  onOpenDocs,
  user,
  onLogout,
}) {
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
                onClick={() => onOpenDocs(null)}
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

          <div className="api-products-grid">
            {apiProducts.map((api) => (
              <div key={api.key} className="api-product-card">
                <div className="api-product-top">
                  <span className="api-product-tag">{api.tag}</span>
                  <h3 className="api-product-title">{api.title}</h3>
                  <p className="api-product-description">{api.description}</p>
                </div>

                <div className="api-product-block">
                  <p className="api-product-label">Use case</p>
                  <p className="api-product-text">{api.useCase}</p>
                </div>

                <div className="api-product-block">
                  <p className="api-product-label">Endpoint</p>
                  <code className="api-product-endpoint">{api.endpoint}</code>
                </div>

                <div className="api-product-block">
                  <p className="api-product-label">Example response</p>
                  <pre className="api-product-code">{api.response}</pre>
                </div>

                <div className="api-product-actions">
                  <button
                    type="button"
                    className="api-product-btn"
                    onClick={() => onOpenDocs(api.key)}
                  >
                    ดู Docs
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}