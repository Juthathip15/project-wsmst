import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getApiProductBySlug } from "../api/api";

export default function DocsPage({
  slug,
  selectedProductKey,
  onNavigate,
  onLoginClick,
  onLogout,
  user,
}) {
  const activeSlug = slug || selectedProductKey || "health-risk-score";

  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
                </div>

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
                    <p className="docs-label">Example Request</p>
                    <pre className="docs-code">
                      {formatJSON(doc.sampleRequest)}
                    </pre>
                  </div>

                  <div className="docs-code-card">
                    <p className="docs-label">Example Response</p>
                    <pre className="docs-code">
                      {formatJSON(doc.sampleResponse)}
                    </pre>
                  </div>
                </div>
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