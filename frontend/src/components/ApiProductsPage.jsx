import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getApiProducts } from "../api/api";

const planRank = {
  basic: 1,
  silver: 2,
  gold: 3,
};

function getRequiredPlan(availablePlans = "") {
  const plans = availablePlans
    .toLowerCase()
    .split(",")
    .map((plan) => plan.trim());

  if (plans.includes("basic")) return "basic";
  if (plans.includes("silver")) return "silver";
  if (plans.includes("gold")) return "gold";

  return "basic";
}

function canUsePlan(userPlan, requiredPlan) {
  return planRank[userPlan] >= planRank[requiredPlan];
}

function getPlanClass(availablePlans = "") {
  const requiredPlan = getRequiredPlan(availablePlans);
  return requiredPlan;
}

function getPlanLabel(availablePlans = "") {
  const requiredPlan = getRequiredPlan(availablePlans);

  if (requiredPlan === "gold") return "GOLD";
  if (requiredPlan === "silver") return "SILVER";
  return "BASIC";
}

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

  const currentPlan = user?.plan || "basic";

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

              <button
                type="button"
                className="api-products-secondary-btn"
                onClick={() => onNavigate("playground")}
              >
                Try Playground
              </button>
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

          {!loading && !error && apiProducts.length > 0 && (
            <div className="api-products-grid">
              {apiProducts.map((api) => {
                const requiredPlan = getRequiredPlan(api.availablePlans);
                const canAccess = canUsePlan(currentPlan, requiredPlan);
                const planClass = getPlanClass(api.availablePlans);
                const planLabel = getPlanLabel(api.availablePlans);

                return (
                  <div
                    key={api.id}
                    className={`api-product-card api-product-card-${planClass}`}
                  >
                    <div className="api-product-top">
                      <div className="api-product-badge-row">

                        <span
                          className={`api-product-plan-badge ${planClass}`}
                        >
                          {planLabel}
                        </span>

                        {!canAccess && (
                          <span className="api-product-locked-badge">
                            ต้องใช้ {requiredPlan.toUpperCase()} ขึ้นไป
                          </span>
                        )}
                      </div>

                      <h3 className="api-product-title">{api.name}</h3>
                      <p className="api-product-description">
                        {api.description}
                      </p>
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
                      <p className="api-product-label">Copy Permission</p>
                      <p className="api-product-text">
                        {canAccess
                          ? "แพลนของคุณสามารถดู API นี้ได้"
                          : `ต้องอัปเกรดเป็น ${requiredPlan.toUpperCase()} ขึ้นไป จึงจะใช้งานได้`}
                      </p>
                    </div>

                    <div className="api-product-block">
                      <p className="api-product-label">Method</p>
                      <p className="api-product-text">{api.method}</p>
                    </div>

                    <div className="api-product-block">
                      <p className="api-product-label">Endpoint</p>
                      <code className="api-product-endpoint">
                        {api.endpoint}
                      </code>
                    </div>

                    <div className="api-product-block">
                      <p className="api-product-label">Example response</p>
                      <pre className="api-product-code">
                        {formatJSON(api.sampleResponse)}
                      </pre>
                    </div>

                    <div className="api-product-actions">
                      <button
                        type="button"
                        className="api-product-btn"
                        onClick={() => onOpenDocs(api.slug)}
                      >
                        ดู Docs
                      </button>

                      <button
                        type="button"
                        className="api-product-btn"
                        onClick={() => onNavigate("playground")}
                      >
                        Try API
                      </button>

                      {!canAccess && (
                        <button
                          type="button"
                          className="api-product-btn"
                          onClick={() => onNavigate("packages")}
                        >
                          Upgrade Plan
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
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