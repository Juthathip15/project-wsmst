import { useMemo, useState } from "react";
import Navbar from "./Navbar";

const apiOptions = [
  {
    key: "risk-score",
    label: "Health Risk Score API",
    method: "POST",
    endpoint: "/api/v1/analysis/risk-score",
    defaultInput: `{
  "age": 35,
  "bmi": 27,
  "cholesterol": 210,
  "smoking": true
}`,
  },
  {
    key: "hospital-search",
    label: "Hospital / Service Search API",
    method: "GET",
    endpoint: "/api/v1/services/search?q=clinic",
    defaultInput: `{
  "q": "clinic"
}`,
  },
];

export default function PlaygroundPage({
  onNavigate,
  onLoginClick,
  user,
  onLogout,
}) {
  const [selectedApiKey, setSelectedApiKey] = useState(apiOptions[0].key);
  const [requestBody, setRequestBody] = useState(apiOptions[0].defaultInput);
  const [responseText, setResponseText] = useState(`{
  "message": "Ready to test API"
}`);
  const [statusText, setStatusText] = useState("Idle");
  const [loading, setLoading] = useState(false);

  const selectedApi = useMemo(() => {
    return apiOptions.find((item) => item.key === selectedApiKey) || apiOptions[0];
  }, [selectedApiKey]);

  const handleChangeApi = (e) => {
    const nextKey = e.target.value;
    const nextApi = apiOptions.find((item) => item.key === nextKey);

    setSelectedApiKey(nextKey);
    setRequestBody(nextApi?.defaultInput || "");
    setResponseText(`{
  "message": "Ready to test API"
}`);
    setStatusText("Idle");
  };

  const handleRun = async () => {
    setLoading(true);
    setStatusText("Running...");

    try {
      let parsedBody = {};
      try {
        parsedBody = requestBody ? JSON.parse(requestBody) : {};
      } catch (error) {
        setResponseText(`{
  "error": "invalid_json",
  "message": "Request body is not valid JSON"
}`);
        setStatusText("400 Bad Request");
        setLoading(false);
        return;
      }

      let mockResponse = {};

      if (selectedApi.key === "risk-score") {
        const age = Number(parsedBody.age || 0);
        const bmi = Number(parsedBody.bmi || 0);
        const cholesterol = Number(parsedBody.cholesterol || 0);
        const smoking = Boolean(parsedBody.smoking);

        let score = 0;
        score += age >= 40 ? 25 : 15;
        score += bmi >= 30 ? 25 : bmi >= 25 ? 18 : 10;
        score += cholesterol >= 240 ? 25 : cholesterol >= 200 ? 18 : 10;
        score += smoking ? 20 : 8;

        let riskLevel = "low";
        if (score >= 70) riskLevel = "high";
        else if (score >= 50) riskLevel = "medium";

        mockResponse = {
          score,
          riskLevel,
          recommendation:
            riskLevel === "high"
              ? "ควรพบแพทย์และติดตามสุขภาพอย่างใกล้ชิด"
              : riskLevel === "medium"
              ? "ควรควบคุมน้ำหนักและตรวจสุขภาพต่อเนื่อง"
              : "ดูแลสุขภาพต่อเนื่องและติดตามค่าพื้นฐานเป็นระยะ",
        };
      }

      if (selectedApi.key === "hospital-search") {
        const q = parsedBody.q || "clinic";

        mockResponse = {
          query: q,
          items: [
            {
              id: 1,
              name: "Bangkok Health Clinic",
              type: "clinic",
              location: "Bangkok",
            },
            {
              id: 2,
              name: "Wellness Medical Center",
              type: "hospital",
              location: "Bangkok",
            },
          ],
        };
      }

      setResponseText(JSON.stringify(mockResponse, null, 2));
      setStatusText("200 OK");
    } catch (error) {
      setResponseText(`{
  "error": "internal_error",
  "message": "Something went wrong"
}`);
      setStatusText("500 Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="playground-page">
      <Navbar
        onNavigate={onNavigate}
        onLoginClick={onLoginClick}
        user={user}
        onLogout={onLogout}
        activePage="playground"
      />

      <section className="playground-section">
        <div className="playground-container">
          <div className="playground-hero">
            <div>
              <span className="playground-badge">Interactive Testing</span>
              <h1 className="playground-title">API Playground</h1>
              <p className="playground-subtitle">
                ทดลองเรียก API ได้จากหน้าเว็บ เลือก endpoint กรอก input และดู response ได้ทันที
              </p>
            </div>

            <div className="playground-hero-actions">
              <button
                type="button"
                className="playground-primary-btn"
                onClick={() => onNavigate("docs")}
              >
                ไปหน้า Docs
              </button>
            </div>
          </div>

          <div className="playground-grid">
            <div className="playground-card">
              <div className="playground-card-head">
                <div>
                  <h3 className="playground-card-title">Request</h3>
                  <p className="playground-card-subtitle">
                    เลือก API และแก้ไข input ก่อนทดสอบ
                  </p>
                </div>
              </div>

              <div className="playground-field">
                <label className="playground-label">API Product</label>
                <select
                  className="playground-select"
                  value={selectedApiKey}
                  onChange={handleChangeApi}
                >
                  {apiOptions.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="playground-request-meta">
                <span className={`playground-method playground-method-${selectedApi.method.toLowerCase()}`}>
                  {selectedApi.method}
                </span>
                <code className="playground-endpoint">{selectedApi.endpoint}</code>
              </div>

              <div className="playground-field">
                <label className="playground-label">Request Body</label>
                <textarea
                  className="playground-textarea"
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="playground-run-btn"
                onClick={handleRun}
                disabled={loading}
              >
                {loading ? "Running..." : "Run API"}
              </button>
            </div>

            <div className="playground-card">
              <div className="playground-card-head">
                <div>
                  <h3 className="playground-card-title">Response</h3>
                  <p className="playground-card-subtitle">
                    ผลลัพธ์ที่ได้จากการเรียก API
                  </p>
                </div>

                <span className="playground-status">{statusText}</span>
              </div>

              <pre className="playground-response">{responseText}</pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}