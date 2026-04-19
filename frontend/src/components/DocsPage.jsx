import Navbar from "./Navbar";
import apiProducts from "../data/apiProducts.json";

const docsMap = {
  "risk-score": {
    title: "Health Risk Score API",
    method: "POST",
    endpoint: "/api/v1/analysis/risk-score",
    headers: [
      "Authorization: Bearer YOUR_API_KEY",
      "Content-Type: application/json",
    ],
    requestBody: `{
  "age": 35,
  "bmi": 27,
  "cholesterol": 210,
  "smoking": true
}`,
    responseBody: `{
  "score": 72,
  "riskLevel": "medium",
  "recommendation": "ควรควบคุมน้ำหนักและตรวจสุขภาพต่อเนื่อง"
}`,
  },
  "cardio-risk": {
    title: "Cardio Risk API",
    method: "POST",
    endpoint: "/api/v1/analysis/cardio-risk",
    headers: [
      "Authorization: Bearer YOUR_API_KEY",
      "Content-Type: application/json",
    ],
    requestBody: `{
  "age": 48,
  "bloodPressure": 145,
  "cholesterol": 220,
  "smoking": false
}`,
    responseBody: `{
  "riskLevel": "low",
  "score": 34,
  "summary": "มีความเสี่ยงต่ำ แต่ควรติดตามค่าความดันและไขมัน"
}`,
  },
  "lab-interpretation": {
    title: "Lab Interpretation API",
    method: "POST",
    endpoint: "/api/v1/analysis/lab-interpretation",
    headers: [
      "Authorization: Bearer YOUR_API_KEY",
      "Content-Type: application/json",
    ],
    requestBody: `{
  "cholesterol": 240,
  "bmi": 29,
  "fastingSugar": 115
}`,
    responseBody: `{
  "status": "attention",
  "highlights": ["cholesterol สูง", "BMI เกินเกณฑ์"],
  "recommendation": "ควรปรึกษาแพทย์และปรับพฤติกรรมการกิน"
}`,
  },
  "hospital-search": {
    title: "Hospital / Service Search API",
    method: "GET",
    endpoint: "/api/v1/services/search?q=clinic",
    headers: ["Authorization: Bearer YOUR_API_KEY"],
    requestBody: `No request body`,
    responseBody: `{
  "items": [
    {
      "id": 1,
      "name": "Bangkok Health Clinic",
      "type": "clinic"
    }
  ]
}`,
  },
  "insurance-score": {
    title: "Insurance Scoring API",
    method: "POST",
    endpoint: "/api/v1/analysis/insurance-score",
    headers: [
      "Authorization: Bearer YOUR_API_KEY",
      "Content-Type: application/json",
    ],
    requestBody: `{
  "age": 39,
  "bmi": 31,
  "cholesterol": 230,
  "history": ["hypertension"]
}`,
    responseBody: `{
  "score": 81,
  "tier": "B",
  "note": "ควรพิจารณาข้อมูลสุขภาพเพิ่มเติมก่อนอนุมัติ"
}`,
  },
  recommendation: {
    title: "Health Recommendation API",
    method: "POST",
    endpoint: "/api/v1/recommendation",
    headers: [
      "Authorization: Bearer YOUR_API_KEY",
      "Content-Type: application/json",
    ],
    requestBody: `{
  "goal": "weight-control",
  "bmi": 28,
  "activityLevel": "low"
}`,
    responseBody: `{
  "goal": "weight-control",
  "recommendations": [
    "เพิ่มการเดินวันละ 30 นาที",
    "ลดอาหารหวานและมัน",
    "ติดตาม BMI ทุกสัปดาห์"
  ]
}`,
  },
};

export default function DocsPage({
  onNavigate,
  onLoginClick,
  onOpenDocs,
  selectedProductKey,
  user,
  onLogout,
}) {
  const allDocs = Object.entries(docsMap).map(([key, value]) => ({
    key,
    ...value,
  }));

  const selectedDoc = selectedProductKey ? docsMap[selectedProductKey] : null;

  const docsToRender = selectedDoc
    ? [{ key: selectedProductKey, ...selectedDoc }]
    : allDocs;

  const selectedProductTitle = selectedProductKey
    ? apiProducts.find((item) => item.key === selectedProductKey)?.title
    : null;

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
            <span className="docs-badge">Developer Docs</span>
            <h1 className="docs-title">
              {selectedProductTitle ? `${selectedProductTitle} Docs` : "API Documentation"}
            </h1>
            <p className="docs-subtitle">
              {selectedProductTitle
                ? "เอกสารของ API product ที่คุณเลือก พร้อม endpoint, headers, request และ response"
                : "เอกสารสำหรับนักพัฒนา ครอบคลุม endpoint, headers, request และ response ที่จำเป็นสำหรับการเชื่อมต่อระบบ"}
            </p>

            {selectedProductKey && (
              <div style={{ marginTop: "16px" }}>
                <button
                  type="button"
                  className="api-product-btn"
                  onClick={() => onOpenDocs(null)}
                >
                  ดู Docs ทั้งหมด
                </button>
              </div>
            )}
          </div>

          <div className="docs-list">
            {docsToRender.map((item) => (
              <div key={item.key} className="docs-card">
                <div className="docs-card-head">
                  <span className={`docs-method docs-method-${item.method.toLowerCase()}`}>
                    {item.method}
                  </span>
                  <h3 className="docs-card-title">{item.title}</h3>
                </div>

                <div className="docs-block">
                  <p className="docs-label">Endpoint</p>
                  <code className="docs-endpoint">{item.endpoint}</code>
                </div>

                <div className="docs-block">
                  <p className="docs-label">Headers</p>
                  <ul className="docs-header-list">
                    {item.headers.map((header, index) => (
                      <li key={index} className="docs-header-item">
                        {header}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="docs-grid">
                  <div className="docs-code-card">
                    <p className="docs-label">Request</p>
                    <pre className="docs-code">{item.requestBody}</pre>
                  </div>

                  <div className="docs-code-card">
                    <p className="docs-label">Response</p>
                    <pre className="docs-code">{item.responseBody}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}