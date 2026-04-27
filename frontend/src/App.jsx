import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import PackagePage from "./components/PackagePage";
import DashboardPage from "./components/DashboardPage";
import ApiProductsPage from "./components/ApiProductsPage";
import DocsPage from "./components/DocsPage";
import DeveloperPage from "./components/DeveloperPage";
import PlaygroundPage from "./components/PlaygroundPage";
import RegisterForm from "./components/RegisterForm";
import ResetPasswordPage from "./components/ResetPasswordPage";
import AdminDashboardPage from "./components/AdminDashboardPage";
import AdminAccountsPage from "./components/AdminAccountsPage";
import AdminPackagesPage from "./components/AdminPackagesPage";
import AdminApiProductsPage from "./components/AdminApiProductsPage";
import CheckoutPage from "./components/CheckoutPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProductKey, setSelectedProductKey] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

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
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("usage");

    setUser(null);
    setSelectedPlan(null);
    setUsage({
      plan: "basic",
      quotaUsed: 0,
      quotaLimit: 1000,
      remaining: 1000,
    });

    setPage("home");
  };

  const handleOpenDocs = (productKey = null) => {
    setSelectedProductKey(productKey);
    setPage("docs");
  };

  const handleCheckout = (plan) => {
    setSelectedPlan(plan);
    setPage("checkout");
  };

  if (page === "login") {
    return (
      <LoginForm
        onNavigate={setPage}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  if (page === "reset-password") {
    return <ResetPasswordPage onNavigate={setPage} />;
  }

  if (page === "register") {
    return <RegisterForm onNavigate={setPage} />;
  }

  if (page === "admin-dashboard") {
    return (
      <AdminDashboardPage
        onNavigate={setPage}
        onLoginClick={() => setPage("login")}
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  if (page === "admin-accounts") {
    return (
      <AdminAccountsPage
        onNavigate={setPage}
        onLoginClick={() => setPage("login")}
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  if (page === "admin-packages") {
    return (
      <AdminPackagesPage
        onNavigate={setPage}
        onLoginClick={() => setPage("login")}
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  if (page === "admin-api-products") {
    return (
      <AdminApiProductsPage
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
        onNavigate={setPage}
        onLoginClick={() => setPage("login")}
        onOpenDocs={handleOpenDocs}
        selectedProductKey={selectedProductKey}
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
        onCheckout={handleCheckout}
      />
    );
  }

  if (page === "checkout") {
    return (
      <CheckoutPage
        onNavigate={setPage}
        onLoginClick={() => setPage("login")}
        user={user}
        onLogout={handleLogout}
        selectedPlan={selectedPlan}
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

  return (
    <HomePage
      onNavigate={setPage}
      onLoginClick={() => setPage("login")}
      user={user}
      onLogout={handleLogout}
    />
  );
}