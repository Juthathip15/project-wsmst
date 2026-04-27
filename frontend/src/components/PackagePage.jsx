import Navbar from "./Navbar";

const packagePlans = [
  {
    key: "basic",
    title: "Basic",
    price: "ฟรี",
    priceValue: 0,
    description: "เหมาะสำหรับการทดลองใช้งาน API เบื้องต้น",
    quota: "1,000 requests/เดือน",
    rate: "10 req/นาที",
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
    priceValue: 999,
    description: "เหมาะสำหรับ partner ที่ต้องการใช้งานจริงระดับกลาง",
    quota: "50,000 requests/เดือน",
    rate: "100 req/นาที",
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
    priceValue: 4999,
    description: "เหมาะสำหรับการใช้งานระดับสูงและ integration เต็มรูปแบบ",
    quota: "Unlimited requests",
    rate: "1,000 req/นาที",
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
  onCheckout,
}) {
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
          <h2 className="package-title">แพ็คเกจ</h2>

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