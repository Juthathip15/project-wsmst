import { useState } from "react";

const plans = [
  {
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
  },
  {
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
  },
  {
    key: "gold",
    title: "Gold",
    price: "฿4,999/เดือน",
    description: "เหมาะสำหรับการใช้งานระดับสูงและ integration เต็มรูปแบบ",
    features: [
      "Unlimited requests",
      "Rate limit: 1,000 req/นาที",
      "Full-text + AI search",
      "Analytics + export",
    ],
  },
];

export default function PricingPage({
  token,
  currentPlan = "basic",
  onPlanChanged,
}) {
  const [loadingPlan, setLoadingPlan] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleChoosePlan(plan) {
    if (!token) {
      setError("กรุณาเข้าสู่ระบบก่อน");
      return;
    }

    if (plan === currentPlan) {
      setMessage("คุณใช้งานแพ็กเกจนี้อยู่แล้ว");
      setError("");
      return;
    }

    setLoadingPlan(plan);
    setMessage("");
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8080/api/v1/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const data = await res.json();

      setMessage(data.message || `เปลี่ยนแพ็กเกจเป็น ${plan} สำเร็จ`);
      setError("");

      if (onPlanChanged) {
        await onPlanChanged(plan);
      }
    } catch (err) {
      setError(err.message || "เปลี่ยนแพ็กเกจไม่สำเร็จ");
      setMessage("");
    } finally {
      setLoadingPlan("");
    }
  }

  return (
    <>
      <h2 style={{ marginBottom: "10px" }}>Pricing Plans</h2>
      <p style={{ marginBottom: "24px" }}>
        เลือกแพ็กเกจตามปริมาณการใช้งาน API ของลูกค้าแต่ละประเภท
      </p>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <div className="plans-grid">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.key;
          const isLoading = loadingPlan === plan.key;

          return (
            <div
              key={plan.key}
              className={`card pricing-card ${isCurrent ? "pricing-card-active" : ""}`}
            >
              <div style={{ marginBottom: "12px", fontSize: "14px", color: "#444" }}>
                {isCurrent ? "Current Plan" : ""}
              </div>

              <h3 style={{ marginBottom: "12px" }}>{plan.title}</h3>
              <p style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>
                {plan.price}
              </p>

              <p style={{ marginBottom: "16px" }}>{plan.description}</p>

              <div style={{ marginBottom: "20px" }}>
                {plan.features.map((feature, index) => (
                  <div key={index} style={{ marginBottom: "8px" }}>
                    {feature}
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleChoosePlan(plan.key)}
                disabled={isCurrent || isLoading}
              >
                {isCurrent
                  ? "ใช้งานอยู่"
                  : isLoading
                  ? "กำลังบันทึก..."
                  : "Choose Plan"}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}