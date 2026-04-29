import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getApiProductBySlug } from "../api/api";

const basicCopyAllowedSlugs = [
  "health-service-search",
  "basic-bmi-calculator",
  "basic-blood-pressure-check",
  "basic-health-package-list",
];

export default function DocsPage({
  slug,
  selectedProductKey,
  onNavigate,
  onLoginClick,
  onLogout,
  user,
}) {
  const activeSlug = slug || selectedProductKey || "health-risk-score";
  const currentPlan = user?.plan || "basic";

  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    async function loadDoc() {
      setLoading(true);
      setError("");
      setDoc(null);

      try {
        const res = await getApiProductBySlug(activeSlug);
        setDoc(res.data);
      } catch (err) {
        setError(err.message || "Failed to load API docs");
      } finally {
        setLoading(false);
      }
    }

    loadDoc();
  }, [activeSlug]);

  function formatJSON(value) {
    try {
      return JSON.stringify(JSON.parse(value), null, 2);
    } catch {
      return value;
    }
  }

  const canCopy =
    currentPlan === "gold"
      ? true
      : currentPlan === "silver"
      ? doc?.availablePlans?.toLowerCase().includes("silver")
      : basicCopyAllowedSlugs.includes(doc?.slug || activeSlug);

  const getCopyMessage = () => {
    if (currentPlan === "basic") {
      return "แพลน Basic คัดลอกได้เฉพาะ API พื้นฐานบางรายการเท่านั้น";
    }

    if (currentPlan === "silver") {
      return "API นี้ต้องใช้แพลน Gold จึงจะคัดลอกได้";
    }

    return "แพลนของคุณยังไม่สามารถคัดลอก API นี้ได้";
  };

  const copyText = async (label, value) => {
    if (!user) {
      alert("กรุณาเข้าสู่ระบบก่อนคัดลอก API");
      onLoginClick();
      return;
    }

    if (!canCopy) {
      alert(getCopyMessage());
      return;
    }

    try {
      await navigator.clipboard.writeText(value || "");
      setCopied(label);
      setTimeout(() => setCopied(""), 1600);
    } catch {
      alert("คัดลอกไม่สำเร็จ");
    }
  };

  const methodClass =
    doc?.method?.toUpperCase() === "POST"
      ? "docs-method docs-method-post"
      : "docs-method docs-method-get";

  return (
    <div className="docs-page">
      <Navbar
        onNavigate={onNavigate}
        onLoginClick={onLoginClick}
        user={user}
        onLogout={onLogout}
        activePage="docs"
      />

      <section className="docs-section">
        <div className="docs-container">
          <div className="docs-hero">
            <span className="docs-badge">API Documentation</span>
            <h1 className="docs-title">API Documentation</h1>
            <p className="docs-subtitle">
              รายละเอียดการใช้งาน API สำหรับนักพัฒนา พร้อม endpoint,
              request และ response ตัวอย่าง
            </p>
          </div>

          {loading && (
            <div className="docs-list">
              <div className="docs-card">
                <h2 className="docs-card-title">Loading...</h2>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="docs-list">
              <div className="docs-card">
                <h2 className="docs-card-title">API Documentation</h2>
                <p className="error">{error}</p>
                <p className="docs-label">Requested slug</p>
                <span className="docs-endpoint">{activeSlug}</span>
              </div>
            </div>
          )}

          {!loading && !error && doc && (
            <div className="docs-list">
              <div className="docs-card">
                <div className="docs-card-head">
                  <span className={methodClass}>{doc.method}</span>
                  <h2 className="docs-card-title">{doc.name}</h2>

                  <div className="docs-actions">
                    <button
                      type="button"
                      className="docs-copy-btn"
                      onClick={() => copyText("endpoint", doc.endpoint)}
                      disabled={!canCopy}
                    >
                      {copied === "endpoint"
                        ? "Copied"
                        : canCopy
                        ? "Copy Endpoint"
                        : "Locked"}
                    </button>

                    <button
                      type="button"
                      className="docs-try-btn"
                      onClick={() => onNavigate("playground")}
                    >
                      Try in Playground
                    </button>
                  </div>
                </div>

                {!canCopy && (
                  <div className="docs-lock-box">
                    {getCopyMessage()} หากต้องการคัดลอก Endpoint / Request /
                    Response กรุณาอัปเกรดแพลน
                  </div>
                )}

                <div className="docs-block">
                  <p className="docs-label">Description</p>
                  <p className="docs-subtitle">{doc.description}</p>
                </div>

                <div className="docs-block">
                  <p className="docs-label">Category</p>
                  <p>{doc.category}</p>
                </div>

                <div className="docs-block">
                  <p className="docs-label">Endpoint</p>
                  <code className="docs-endpoint">{doc.endpoint}</code>
                </div>

                <div className="docs-block">
                  <p className="docs-label">Target Users</p>
                  <p>{doc.targetUsers}</p>
                </div>

                <div className="docs-block">
                  <p className="docs-label">Available Plans</p>
                  <p>{doc.availablePlans}</p>
                </div>

                <div className="docs-block">
                  <p className="docs-label">Copy Permission</p>
                  <p>
                    {canCopy
                      ? "แพลนของคุณสามารถคัดลอก API นี้ได้"
                      : getCopyMessage()}
                  </p>
                </div>

                <div className="docs-block">
                  <p className="docs-label">Status</p>
                  <p>{doc.status}</p>
                </div>

                <div className="docs-block">
                  <p className="docs-label">Headers</p>
                  <ul className="docs-header-list">
                    <li className="docs-header-item">
                      Content-Type: application/json
                    </li>
                    <li className="docs-header-item">
                      Authorization: Bearer &lt;token&gt;
                    </li>
                  </ul>
                </div>

                <div className="docs-grid">
                  <div className="docs-code-card">
                    <div className="docs-code-head">
                      <p className="docs-label">Example Request</p>
                      <button
                        type="button"
                        className="docs-copy-btn"
                        onClick={() =>
                          copyText("request", formatJSON(doc.sampleRequest))
                        }
                        disabled={!canCopy}
                      >
                        {copied === "request"
                          ? "Copied"
                          : canCopy
                          ? "Copy"
                          : "Locked"}
                      </button>
                    </div>

                    <pre className="docs-code">
                      {formatJSON(doc.sampleRequest)}
                    </pre>
                  </div>

                  <div className="docs-code-card">
                    <div className="docs-code-head">
                      <p className="docs-label">Example Response</p>
                      <button
                        type="button"
                        className="docs-copy-btn"
                        onClick={() =>
                          copyText("response", formatJSON(doc.sampleResponse))
                        }
                        disabled={!canCopy}
                      >
                        {copied === "response"
                          ? "Copied"
                          : canCopy
                          ? "Copy"
                          : "Locked"}
                      </button>
                    </div>

                    <pre className="docs-code">
                      {formatJSON(doc.sampleResponse)}
                    </pre>
                  </div>
                </div>

                {!canCopy && (
                  <button
                    type="button"
                    className="checkout-primary-btn"
                    style={{ marginTop: 20 }}
                    onClick={() => onNavigate("packages")}
                  >
                    อัปเกรดแพลนเพื่อคัดลอก API นี้
                  </button>
                )}
              </div>
            </div>
          )}

          {!loading && !error && !doc && (
            <div className="docs-list">
              <div className="docs-card">
                <h2 className="docs-card-title">No documentation found</h2>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}