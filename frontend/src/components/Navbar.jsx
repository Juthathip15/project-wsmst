export default function Navbar({
  onNavigate,
  onLoginClick,
  user,
  onLogout,
  activePage = "home",
  isAdmin = false,
}) {
  const handleNavigate = (page) => {
    const adminPages = ["admin-dashboard", "admin-accounts", "admin-packages", "admin-api-products"];
    if (adminPages.includes(page) && !isAdmin) {
      onNavigate(page);
    } else if (!adminPages.includes(page) && isAdmin) {
      onNavigate(page);
    } else {
      onNavigate(page);
    }
  };

  if (isAdmin) {
    return (
      <header className="home-navbar">
        <div className="home-navbar-left">
          <div className="home-logo">โลโก้</div>

          <nav className="home-nav">
            <button
              type="button"
              className={`home-nav-link ${activePage === "admin-dashboard" ? "active" : ""}`}
              onClick={() => onNavigate("admin-dashboard")}
            >
              แดชบอร์ด
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
              จัดการ API Products
            </button>
          </nav>
        </div>

        <div className="home-navbar-right">
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
            className={`home-nav-link ${activePage === "about" ? "active" : ""}`}
            onClick={() => onNavigate("about")}
          >
            เกี่ยวกับเรา
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

              {user.isAdmin && (
                <button
                  type="button"
                  className={`home-nav-link ${["admin-dashboard", "admin-accounts", "admin-packages", "admin-api-products"].includes(activePage) ? "active" : ""}`}
                  onClick={() => onNavigate("admin-dashboard")}
                >
                  Admin
                </button>
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