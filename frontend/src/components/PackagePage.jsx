import Navbar from "./Navbar";

const packagePlans = [
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

export default function PackagePage({
  onNavigate,
  onLoginClick,
  user,
  usage,
  onLogout,
}) {
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
          <h2 className="package-title">แพ็คเกจ</h2>

          <input
            className="package-filter"
            type="text"
            placeholder="ค้นหาแพ็คเกจ..."
          />

          <div className="package-grid">
            {packagePlans.map((plan) => {
              const isCurrentPlan = usage?.plan === plan.key;

              return (
                <div
                  key={plan.key}
                  className={`package-plan-card ${
                    isCurrentPlan ? "package-active" : ""
                  }`}
                >
                
                  <h3 className="package-plan-title">{plan.title}</h3>
                  <p className="package-plan-price">{plan.price}</p>
                  <p className="package-plan-description">{plan.description}</p>

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
                    onClick={isCurrentPlan ? undefined : onLoginClick}
                    disabled={isCurrentPlan}
                  >
                    {isCurrentPlan ? "ใช้งานอยู่" : "เริ่มใช้งาน"}
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