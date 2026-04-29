export default function Navbar({
  onNavigate,
  onLoginClick,
  user,
  onLogout,
  activePage = "home",
  isAdmin = false,
}) {
  return (
    <header className="home-navbar">
      <div className="home-navbar-left">
        <div
          className="home-logo"
          onClick={() => onNavigate(isAdmin ? "admin-dashboard" : "home")}
          style={{ cursor: "pointer" }}
        >
          <img
            src="/logo.png"
            alt="Health Love API Logo"
            className="home-logo-img"
          />
        </div>

        <nav className="home-nav">
          {isAdmin ? (
            <>
              <button
                type="button"
                className={`home-nav-link ${activePage === "admin-dashboard" ? "active" : ""}`}
                onClick={() => onNavigate("admin-dashboard")}
              >
                แดชบอร์ดผู้ดูแล
              </button>

              <button
                type="button"
                className={`home-nav-link ${activePage === "admin-accounts" ? "active" : ""}`}
                onClick={() => onNavigate("admin-accounts")}
              >
                จัดการบัญชี
              </button>

              <button
                type="button"
                className={`home-nav-link ${activePage === "admin-packages" ? "active" : ""}`}
                onClick={() => onNavigate("admin-packages")}
              >
                จัดการแพ็กเกจ
              </button>

              <button
                type="button"
                className={`home-nav-link ${activePage === "admin-api-products" ? "active" : ""}`}
                onClick={() => onNavigate("admin-api-products")}
              >
                จัดการ API
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className={`home-nav-link ${activePage === "home" ? "active" : ""}`}
                onClick={() => onNavigate("home")}
              >
                หน้าแรก
              </button>

              <button
                type="button"
                className={`home-nav-link ${activePage === "api-products" ? "active" : ""}`}
                onClick={() => onNavigate("api-products")}
              >
                สินค้า API
              </button>

              <button
                type="button"
                className={`home-nav-link ${activePage === "playground" ? "active" : ""}`}
                onClick={() => onNavigate("playground")}
              >
                ทดลองใช้งาน
              </button>

              <button
                type="button"
                className={`home-nav-link ${activePage === "packages" ? "active" : ""}`}
                onClick={() => onNavigate("packages")}
              >
                แพ็กเกจ
              </button>

              {user && (
                <>
                  <button
                    type="button"
                    className={`home-nav-link ${activePage === "developer" ? "active" : ""}`}
                    onClick={() => onNavigate("developer")}
                  >
                    นักพัฒนา
                  </button>

                  <button
                    type="button"
                    className={`home-nav-link ${activePage === "dashboard" ? "active" : ""}`}
                    onClick={() => onNavigate("dashboard")}
                  >
                    แดชบอร์ด
                  </button>
                </>
              )}
            </>
          )}
        </nav>
      </div>

      <div className="home-navbar-right">
        <input className="home-search" type="text" placeholder="ค้นหา" />

        {user ? (
          <div className="home-user-box">
            <span className="home-user-name">
              {user.fullName || user.full_name || user.name || user.email || "ผู้ใช้งาน"}
            </span>
            <button
              type="button"
              className="home-logout-btn"
              onClick={onLogout}
            >
              ออกจากระบบ
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="home-login-btn"
            onClick={onLoginClick}
          >
            เข้าสู่ระบบ
          </button>
        )}
      </div>
    </header>
  );
}