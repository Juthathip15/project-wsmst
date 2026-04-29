import Navbar from "./Navbar";

const packagePlans = [
  {
    key: "basic",
    title: "Basic",
    price: "ฟรี",
    priceValue: 0,
    description: "เหมาะสำหรับทดลองใช้งาน API เบื้องต้น",
    quota: "1,000 requests/เดือน",
    rate: "10 req/นาที",
    accessLevel: "Basic API เท่านั้น",
    copyAccess: "คัดลอกได้เฉพาะ API พื้นฐาน",
    features: [
      "เข้าถึง API พื้นฐาน",
      "คัดลอกโค้ดได้เฉพาะ Basic API",
      "ดูตัวอย่าง Request / Response เบื้องต้น",
      "Basic search",
      "Read-only access",
      "เหมาะสำหรับทดลองระบบ",
    ],
  },
  {
    key: "silver",
    title: "Silver",
    price: "฿69/เดือน",
    priceValue: 69,
    description: "เหมาะสำหรับใช้งานจริงระดับกลาง",
    quota: "50,000 requests/เดือน",
    rate: "100 req/นาที",
    accessLevel: "Basic API + Advanced API",
    copyAccess: "คัดลอกโค้ด API ได้มากขึ้น",
    recommended: true,
    features: [
      "เข้าถึง Basic API และ Advanced API",
      "คัดลอกโค้ด API ได้มากกว่าแพลนฟรี",
      "ใช้งาน Advanced filters",
      "ดู Usage Dashboard",
      "รองรับงาน integration ระดับกลาง",
      "เหมาะสำหรับ partner หรือทีมพัฒนา",
    ],
  },
  {
    key: "gold",
    title: "Gold",
    price: "฿99/เดือน",
    priceValue: 99,
    description: "เหมาะสำหรับการใช้งานระดับสูงและ integration เต็มรูปแบบ",
    quota: "Unlimited requests",
    rate: "1,000 req/นาที",
    accessLevel: "เข้าถึง API ทุกประเภท",
    copyAccess: "คัดลอกโค้ด API ได้ทุก endpoint",
    features: [
      "เข้าถึง API ทุกประเภท",
      "คัดลอกโค้ด API ได้ทุก endpoint",
      "ใช้งาน API ที่ซับซ้อน / Advanced Integration",
      "Full-text + AI search",
      "Analytics + Export",
      "เหมาะสำหรับองค์กรหรือระบบขนาดใหญ่",
    ],
  },
];

export default function PackagePage({
  onNavigate,
  onLoginClick,
  user,
  usage,
  onLogout,
  onCheckout,
}) {
  const currentPlan = user?.plan || usage?.plan || "basic";

  const handleSelectPlan = (plan) => {
    if (!user) {
      onLoginClick();
      return;
    }

    if (onCheckout) {
      onCheckout(plan);
    }
  };

  return (
    <div className="package-page">
      <Navbar
        onNavigate={onNavigate}
        onLoginClick={onLoginClick}
        user={user}
        onLogout={onLogout}
        activePage="packages"
      />

      <section className="package-section">
        <div className="package-container">
          <div className="package-header">
            <span className="package-badge">Service Packages</span>
            <h2 className="package-title">Package API</h2>
            <p className="package-subtitle">
              เลือกแพ็คเกจตามระดับการเข้าถึง API และสิทธิ์การคัดลอกโค้ด
            </p>
          </div>

          <div className="package-grid">
            {packagePlans.map((plan) => {
              const isCurrentPlan = currentPlan === plan.key;

              return (
                <div
                  key={plan.key}
                  className={`package-plan-card ${
                    isCurrentPlan ? "package-active" : ""
                  }`}
                >
                  <div className="package-card-top">
                    {plan.recommended && currentPlan === "basic" && (
                      <span className="package-recommended-badge">
                        Recommended
                      </span>
                    )}

                    {isCurrentPlan && (
                      <span className="package-active-badge">
                        แพ็คเกจปัจจุบัน
                      </span>
                    )}

                    <h3 className="package-plan-title">{plan.title}</h3>
                    <p className="package-plan-price">{plan.price}</p>
                    <p className="package-plan-description">
                      {plan.description}
                    </p>
                  </div>

                  <div className="package-plan-meta">
                    <div>
                      <span>Quota</span>
                      <strong>{plan.quota}</strong>
                    </div>

                    <div>
                      <span>Rate Limit</span>
                      <strong>{plan.rate}</strong>
                    </div>

                    <div>
                      <span>API Access</span>
                      <strong>{plan.accessLevel}</strong>
                    </div>

                    <div>
                      <span>Copy Permission</span>
                      <strong>{plan.copyAccess}</strong>
                    </div>
                  </div>

                  <ul className="package-plan-list">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="package-plan-item">
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className="package-plan-btn"
                    onClick={() => handleSelectPlan(plan)}
                    disabled={isCurrentPlan}
                  >
                    {isCurrentPlan ? "ใช้งานอยู่" : "เลือกแพ็คเกจ"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}