import { useState } from "react";
import Navbar from "./Navbar";

export default function DeveloperPage({
  onNavigate,
  onLoginClick,
  user,
  onLogout,
}) {
  const [apiKey, setApiKey] = useState("sk_test_51hda92kd9x_health_platform_demo");
  const [copied, setCopied] = useState(false);

  const availableEndpoints = [
    {
      method: "POST",
      path: "/api/v1/analysis/risk-score",
      description: "วิเคราะห์ความเสี่ยงสุขภาพเบื้องต้น",
    },
    {
      method: "GET",
      path: "/api/v1/services",
      description: "ดึงรายการบริการและข้อมูลสถานพยาบาล",
    },
    {
      method: "GET",
      path: "/api/v1/services/search?q=clinic",
      description: "ค้นหาสถานพยาบาลหรือบริการที่ต้องการ",
    },
    {
      method: "GET",
      path: "/api/v1/usage",
      description: "ดูข้อมูล quota และการใช้งานของ account",
    },
  ];

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      alert("คัดลอก API Key ไม่สำเร็จ");
    }
  };

  const handleGenerateKey = () => {
    const randomPart = Math.random().toString(36).slice(2, 10);
    const timestampPart = Date.now().toString(36);
    setApiKey(`sk_live_${timestampPart}_${randomPart}_health`);
    setCopied(false);
  };

  return (
    <div className="developer-page">
      <Navbar
        onNavigate={onNavigate}
        onLoginClick={onLoginClick}
        user={user}
        onLogout={onLogout}
        activePage="developer"
      />

      <section className="developer-section">
        <div className="developer-container">
          <div className="developer-hero">
            <div>
              <span className="developer-badge">Developer Portal</span>
              <h1 className="developer-title">Developer Dashboard</h1>
              <p className="developer-subtitle">
                จัดการ API Key และเริ่มเชื่อมต่อ Health Data API
                กับระบบของคุณได้จากหน้านี้
              </p>
            </div>

            <div className="developer-hero-actions">
              <button
                type="button"
                className="developer-primary-btn"
                onClick={() => onNavigate("docs")}
              >
                ดู API Docs
              </button>
              <button
                type="button"
                className="developer-secondary-btn"
                onClick={() => onNavigate("api-products")}
              >
                ดู API Products
              </button>
            </div>
          </div>

          <div className="developer-main-grid">
            <div className="developer-main-left">
              <div className="developer-card">
                <div className="developer-card-head">
                  <div>
                    <h3 className="developer-card-title">API Key</h3>
                    <p className="developer-card-subtitle">
                      ใช้ key นี้สำหรับเรียก endpoint ของระบบ
                    </p>
                  </div>

                  <button
                    type="button"
                    className="developer-regenerate-btn"
                    onClick={handleGenerateKey}
                  >
                    Regenerate
                  </button>
                </div>

                <div className="developer-key-box">
                  <code className="developer-key-text">{apiKey}</code>
                </div>

                <div className="developer-key-actions">
                  <button
                    type="button"
                    className="developer-copy-btn"
                    onClick={handleCopyKey}
                  >
                    {copied ? "คัดลอกแล้ว" : "Copy API Key"}
                  </button>
                </div>
              </div>

              <div className="developer-card">
                <div className="developer-card-head">
                  <div>
                    <h3 className="developer-card-title">Available Endpoints</h3>
                    <p className="developer-card-subtitle">
                      endpoint หลักที่พร้อมใช้งานในระบบ
                    </p>
                  </div>
                </div>

                <div className="developer-endpoint-list">
                  {availableEndpoints.map((item, index) => (
                    <div key={index} className="developer-endpoint-item">
                      <div className="developer-endpoint-top">
                        <span
                          className={`developer-method developer-method-${item.method.toLowerCase()}`}
                        >
                          {item.method}
                        </span>
                        <code className="developer-endpoint-path">{item.path}</code>
                      </div>
                      <p className="developer-endpoint-desc">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="developer-main-right">
              <div className="developer-side-card">
                <h3 className="developer-card-title">Quick Start</h3>
                <ol className="developer-step-list">
                  <li className="developer-step-item">Login เข้าระบบ</li>
                  <li className="developer-step-item">คัดลอก API Key</li>
                  <li className="developer-step-item">อ่าน Docs ของ endpoint ที่ต้องการ</li>
                  <li className="developer-step-item">ทดสอบ request จาก Postman หรือ frontend</li>
                  <li className="developer-step-item">เริ่มเชื่อมต่อ API เข้ากับระบบของคุณ</li>
                </ol>
              </div>

              <div className="developer-side-card">
                <h3 className="developer-card-title">Example Header</h3>
                <pre className="developer-code-block">{`Authorization: Bearer ${apiKey}`}</pre>
              </div>

              <div className="developer-side-card">
                <h3 className="developer-card-title">Docs Shortcut</h3>
                <p className="developer-side-text">
                  ดูรายละเอียด request / response ของแต่ละ endpoint
                  และตัวอย่างการเชื่อมต่อได้จากหน้าเอกสาร API
                </p>

                <button
                  type="button"
                  className="developer-primary-btn developer-inline-btn"
                  onClick={() => onNavigate("docs")}
                >
                  ไปหน้า Docs
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}