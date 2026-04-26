export default function Navbar({
  onNavigate,
  onLoginClick,
  user,
  onLogout,
  activePage = "home",
}) {
  return (
    <header className="home-navbar">
      <div className="home-navbar-left">
        <div className="home-logo">โลโก้</div>

        <nav className="home-nav">
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
            API Products
          </button>

          <button
            type="button"
            className={`home-nav-link ${activePage === "docs" ? "active" : ""}`}
            onClick={() => onNavigate("docs")}
          >
            Docs
          </button>

          <button
            type="button"
            className={`home-nav-link ${activePage === "playground" ? "active" : ""}`}
            onClick={() => onNavigate("playground")}
          >
            Playground
          </button>

          <button
            type="button"
            className={`home-nav-link ${activePage === "packages" ? "active" : ""}`}
            onClick={() => onNavigate("packages")}
          >
            แพ็คเกจ
          </button>

          {user && (
            <>
              <button
                type="button"
                className={`home-nav-link ${activePage === "developer" ? "active" : ""}`}
                onClick={() => onNavigate("developer")}
              >
                Developer
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
        </nav>
      </div>

      <div className="home-navbar-right">
        <input className="home-search" type="text" placeholder="ค้นหา" />

        {user ? (
          <div className="home-user-box">
            <span className="home-user-name">
              {user.full_name || user.name || user.email || "ผู้ใช้งาน"}
            </span>
            <button
              type="button"
              className="home-logout-btn"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="home-login-btn"
            onClick={onLoginClick}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}