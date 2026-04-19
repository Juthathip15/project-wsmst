import Navbar from "./Navbar";

export default function AboutPage({ onNavigate, onLoginClick, user, onLogout }) {
  const highlights = [
    {
      title: "Reliable Data",
      text: "ข้อมูลมีโครงสร้าง พร้อมใช้งาน ตรวจสอบได้ และเหมาะกับการพัฒนา API และระบบวิเคราะห์",
    },
    {
      title: "Secure API",
      text: "รองรับการยืนยันตัวตน สิทธิ์การเข้าถึง และการใช้งานข้อมูลอย่างปลอดภัย",
    },
    {
      title: "Scalable Usage",
      text: "รองรับตั้งแต่การทดลองใช้งาน ไปจนถึงการเชื่อมต่อระดับองค์กร",
    },
    {
      title: "Business Ready",
      text: "พร้อมต่อยอดสู่ dashboard, analytics และโซลูชันด้าน HealthTech",
    },
  ];

  return (
    <div className="about-page">
      <Navbar
        onNavigate={onNavigate}
        onLoginClick={onLoginClick}
        user={user}
        onLogout={onLogout}
        activePage="about"
      />

      <section className="about-section">
        <div className="about-container">
          <div className="about-hero">
            <div className="about-hero-left">
              <span className="about-badge">About Our Platform</span>
              <h1 className="about-title">
                แพลตฟอร์มข้อมูลสุขภาพ
                <br />
                สำหรับองค์กรและนักพัฒนา
              </h1>
              <p className="about-highlight">
                เราคือผู้ให้บริการ Web Service และ API ด้านข้อมูลสุขภาพและข้อมูลสถานพยาบาล
                สำหรับองค์กรที่ต้องการนำข้อมูลไปพัฒนาบริการ ระบบวิเคราะห์
                และธุรกิจสุขภาพอย่างมีประสิทธิภาพ
              </p>
              <p className="about-text">
                เรามุ่งเน้นการให้บริการข้อมูลในรูปแบบที่พร้อมใช้งาน ทั้งข้อมูลเชิงสถิติ
                ข้อมูลสรุป และข้อมูลที่เหมาะกับการพัฒนาระบบวิเคราะห์ขั้นสูง
                ในอุตสาหกรรมสุขภาพ
              </p>
              <p className="about-text">
                รองรับการใช้งานของหลายภาคส่วน เช่น โรงพยาบาล คลินิก
                บริษัทประกันสุขภาพ และธุรกิจ HealthTech
                ที่ต้องการเชื่อมต่อข้อมูลอย่างปลอดภัยและมีมาตรฐาน
              </p>
            </div>

            <div className="about-hero-right">
              <div className="about-main-card">
                <p className="about-main-card-label">ข้อมูลที่พร้อมต่อยอด</p>
                <h3 className="about-main-card-title">Health Data API</h3>
                <p className="about-main-card-text">
                  ออกแบบเพื่อรองรับการเชื่อมต่อข้อมูลสุขภาพในระดับธุรกิจ
                  ด้วยโครงสร้างข้อมูลที่ชัดเจน ใช้งานง่าย และขยายระบบได้
                </p>
              </div>

              <div className="about-mini-grid">
                <div className="about-mini-card">
                  <div className="about-mini-number">99.9%</div>
                  <div className="about-mini-label">พร้อมใช้งาน</div>
                </div>
                <div className="about-mini-card">
                  <div className="about-mini-number">Secure</div>
                  <div className="about-mini-label">Authentication</div>
                </div>
                <div className="about-mini-card">
                  <div className="about-mini-number">API</div>
                  <div className="about-mini-label">Ready for Integration</div>
                </div>
                <div className="about-mini-card">
                  <div className="about-mini-number">Scale</div>
                  <div className="about-mini-label">From Trial to Enterprise</div>
                </div>
              </div>
            </div>
          </div>

          <div className="about-feature-head">
            <h2 className="about-feature-title">จุดเด่นของบริการ</h2>
            <p className="about-feature-subtitle">
              ออกแบบเพื่อให้ข้อมูลใช้งานได้จริง ปลอดภัย และพร้อมสำหรับการเติบโตของระบบ
            </p>
          </div>

          <div className="about-grid">
            {highlights.map((item, index) => (
              <div key={index} className="about-card">
                <div className="about-card-icon">{index + 1}</div>
                <h3 className="about-card-title">{item.title}</h3>
                <p className="about-card-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}