import Navbar from "./Navbar";

export default function HomePage({ onNavigate, onLoginClick, user, onLogout }) {
  return (
    <div className="home-page">
      <Navbar
        onNavigate={onNavigate}
        onLoginClick={onLoginClick}
        user={user}
        onLogout={onLogout}
        activePage="home"
      />

      <section className="home-hero">
        <div className="home-hero-overlay">
          <div className="home-hero-content">
            <h1 className="home-hero-title">Health Data Platform</h1>
            <p className="home-hero-text">
              แพลตฟอร์มข้อมูลสุขภาพสำหรับองค์กรและนักพัฒนา
              รองรับการเชื่อมต่อ API อย่างปลอดภัย
              พร้อมขยายการใช้งานได้ในระดับธุรกิจ
            </p>

            <div className="home-hero-actions">
              <button
                type="button"
                className="home-hero-primary-btn"
                onClick={() => onNavigate("packages")}
              >
                ดูแพ็คเกจ
              </button>

              {!user && (
                <button
                  type="button"
                  className="home-hero-secondary-btn"
                  onClick={onLoginClick}
                >
                  เริ่มใช้งาน
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="home-feature-section">
        <div className="home-feature-grid">
          <div className="home-feature-card">
            <h3 className="home-feature-title">Reliable Data</h3>
            <p className="home-feature-text">
              ข้อมูลมีโครงสร้าง พร้อมใช้งาน และเหมาะสำหรับการพัฒนา API
            </p>
          </div>

          <div className="home-feature-card">
            <h3 className="home-feature-title">Secure API</h3>
            <p className="home-feature-text">
              รองรับ authentication และสิทธิ์การเข้าถึงอย่างปลอดภัย
            </p>
          </div>

          <div className="home-feature-card">
            <h3 className="home-feature-title">Scalable Usage</h3>
            <p className="home-feature-text">
              ใช้งานได้ตั้งแต่การทดลองระบบจนถึงระดับองค์กร
            </p>
          </div>

          <div className="home-feature-card">
            <h3 className="home-feature-title">Business Ready</h3>
            <p className="home-feature-text">
              พร้อมต่อยอดเป็น dashboard, analytics และระบบ HealthTech
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}