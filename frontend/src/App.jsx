import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import AboutPage from "./components/AboutPage";
import PackagePage from "./components/PackagePage";
import DashboardPage from "./components/DashboardPage";
import ApiProductsPage from "./components/ApiProductsPage";
import DocsPage from "./components/DocsPage";
import DeveloperPage from "./components/DeveloperPage";
import PlaygroundPage from "./components/PlaygroundPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProductSlug, setSelectedProductSlug] = useState("health-risk-score");

  const [user, setUser] = useState(null);
  const [usage, setUsage] = useState({
    plan: "basic",
    quotaUsed: 0,
    quotaLimit: 1000,
    remaining: 1000,
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const savedUsage = localStorage.getItem("usage");

    if (savedToken && savedUser) {
      setUser(JSON.parse(savedUser));
    }

    if (savedUsage) {
      setUsage(JSON.parse(savedUsage));
    }
  }, []);

  const handleLoginSuccess = (loginData) => {
    const token = loginData?.token || "";
    const loginUser = loginData?.user || null;
    const loginUsage =
      loginData?.usage || {
        plan: "basic",
        quotaUsed: 0,
        quotaLimit: 1000,
        remaining: 1000,
      };

    if (token) {
      localStorage.setItem("token", token);
    }

    if (loginUser) {
      localStorage.setItem("user", JSON.stringify(loginUser));
      setUser(loginUser);
    }

    localStorage.setItem("usage", JSON.stringify(loginUsage));
    setUsage(loginUsage);

    setPage("home");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("usage");

    setUser(null);
    setUsage({
      plan: "basic",
      quotaUsed: 0,
      quotaLimit: 1000,
      remaining: 1000,
    });

    setSelectedProductSlug("health-risk-score");
    setPage("home");
  };

  const handleOpenDocs = (productSlug = "health-risk-score") => {
    setSelectedProductSlug(productSlug);
    setPage("docs");
  };

  if (page === "login") {
    return (
      <LoginForm
        onNavigate={setPage}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  if (page === "about") {
    return (
      <AboutPage
        onNavigate={setPage}
        onLoginClick={() => setPage("login")}
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  if (page === "api-products") {
    return (
      <ApiProductsPage
        onNavigate={setPage}
        onLoginClick={() => setPage("login")}
        onOpenDocs={handleOpenDocs}
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  if (page === "docs") {
    return (
      <DocsPage
        slug={selectedProductSlug}
        onNavigate={setPage}
        onLoginClick={() => setPage("login")}
        onOpenDocs={handleOpenDocs}
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  if (page === "developer") {
    return (
      <DeveloperPage
        onNavigate={setPage}
        onLoginClick={() => setPage("login")}
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  if (page === "dashboard") {
    return (
      <DashboardPage
        onNavigate={setPage}
        onLoginClick={() => setPage("login")}
        user={user}
        usage={usage}
        onLogout={handleLogout}
      />
    );
  }

  if (page === "playground") {
    return (
      <PlaygroundPage
        onNavigate={setPage}
        onLoginClick={() => setPage("login")}
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  if (page === "packages") {
    return (
      <PackagePage
        onNavigate={setPage}
        onLoginClick={() => setPage("login")}
        user={user}
        usage={usage}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <HomePage
      onNavigate={setPage}
      onLoginClick={() => setPage("login")}
      user={user}
      onLogout={handleLogout}
    />
  );
}