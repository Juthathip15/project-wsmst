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
import PaymentStatusPage from "./components/PaymentStatusPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProductKey, setSelectedProductKey] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentPlan, setPaymentPlan] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);

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
        plan: loginData?.user?.plan || "basic",
        quotaUsed: 0,
        quotaLimit:
          loginData?.user?.plan === "gold"
            ? 999999999
            : loginData?.user?.plan === "silver"
            ? 50000
            : 1000,
        remaining:
          loginData?.user?.plan === "gold"
            ? 999999999
            : loginData?.user?.plan === "silver"
            ? 50000
            : 1000,
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
    setPaymentPlan(null);
    setShowCheckoutModal(false);
    setShowPaymentSuccessModal(false);

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
    setShowCheckoutModal(true);
    setShowPaymentSuccessModal(false);
  };

  const handleCloseCheckout = () => {
    setShowCheckoutModal(false);
  };

  const handleClosePaymentSuccess = () => {
    setShowPaymentSuccessModal(false);
  };

  const handlePaymentSuccess = (plan) => {
    setPaymentPlan(plan);

    const updatedUser = {
      ...user,
      plan: plan.key,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    const updatedUsage = {
      plan: plan.key,
      quotaUsed: 0,
      quotaLimit:
        plan.key === "basic" ? 1000 : plan.key === "silver" ? 50000 : 999999999,
      remaining:
        plan.key === "basic" ? 1000 : plan.key === "silver" ? 50000 : 999999999,
    };

    setUsage(updatedUsage);
    localStorage.setItem("usage", JSON.stringify(updatedUsage));

    setShowCheckoutModal(false);
    setShowPaymentSuccessModal(true);
  };

  const navigateFromModal = (nextPage) => {
    setShowCheckoutModal(false);
    setShowPaymentSuccessModal(false);
    setPage(nextPage);
  };

  const renderCheckoutModal = () => {
    if (!showCheckoutModal) return null;

    return (
      <div className="checkout-modal-overlay">
        <div className="checkout-modal">
          <button
            type="button"
            className="checkout-modal-close"
            onClick={handleCloseCheckout}
          >
            ×
          </button>

          <CheckoutPage
            isModal
            onNavigate={navigateFromModal}
            onClose={handleCloseCheckout}
            onLoginClick={() => navigateFromModal("login")}
            user={user}
            onLogout={handleLogout}
            selectedPlan={selectedPlan}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </div>
      </div>
    );
  };

  const renderPaymentSuccessModal = () => {
    if (!showPaymentSuccessModal) return null;

    return (
      <div className="checkout-modal-overlay">
        <div className="checkout-modal payment-success-modal">
          <button
            type="button"
            className="checkout-modal-close"
            onClick={handleClosePaymentSuccess}
          >
            ×
          </button>

          <PaymentStatusPage
            isModal
            onNavigate={navigateFromModal}
            onLoginClick={() => navigateFromModal("login")}
            user={user}
            onLogout={handleLogout}
            paymentPlan={paymentPlan}
          />
        </div>
      </div>
    );
  };

  const renderModals = () => (
    <>
      {renderCheckoutModal()}
      {renderPaymentSuccessModal()}
    </>
  );

  if (page === "login") {
    return (
      <>
        <LoginForm onNavigate={setPage} onLoginSuccess={handleLoginSuccess} />
        {renderModals()}
      </>
    );
  }

  if (page === "reset-password") {
    return (
      <>
        <ResetPasswordPage onNavigate={setPage} />
        {renderModals()}
      </>
    );
  }

  if (page === "register") {
    return (
      <>
        <RegisterForm onNavigate={setPage} onCheckout={handleCheckout} />
        {renderModals()}
      </>
    );
  }

  if (page === "admin-dashboard") {
    return (
      <>
        <AdminDashboardPage
          onNavigate={setPage}
          onLoginClick={() => setPage("login")}
          user={user}
          onLogout={handleLogout}
        />
        {renderModals()}
      </>
    );
  }

  if (page === "admin-accounts") {
    return (
      <>
        <AdminAccountsPage
          onNavigate={setPage}
          onLoginClick={() => setPage("login")}
          user={user}
          onLogout={handleLogout}
        />
        {renderModals()}
      </>
    );
  }

  if (page === "admin-packages") {
    return (
      <>
        <AdminPackagesPage
          onNavigate={setPage}
          onLoginClick={() => setPage("login")}
          user={user}
          onLogout={handleLogout}
        />
        {renderModals()}
      </>
    );
  }

  if (page === "admin-api-products") {
    return (
      <>
        <AdminApiProductsPage
          onNavigate={setPage}
          onLoginClick={() => setPage("login")}
          user={user}
          onLogout={handleLogout}
        />
        {renderModals()}
      </>
    );
  }

  if (page === "api-products") {
    return (
      <>
        <ApiProductsPage
          onNavigate={setPage}
          onLoginClick={() => setPage("login")}
          onOpenDocs={handleOpenDocs}
          user={user}
          onLogout={handleLogout}
        />
        {renderModals()}
      </>
    );
  }

  if (page === "docs") {
    return (
      <>
        <DocsPage
          onNavigate={setPage}
          onLoginClick={() => setPage("login")}
          onOpenDocs={handleOpenDocs}
          selectedProductKey={selectedProductKey}
          user={user}
          onLogout={handleLogout}
        />
        {renderModals()}
      </>
    );
  }

  if (page === "packages") {
    return (
      <>
        <PackagePage
          onNavigate={setPage}
          onLoginClick={() => setPage("login")}
          user={user}
          usage={usage}
          onLogout={handleLogout}
          onCheckout={handleCheckout}
        />
        {renderModals()}
      </>
    );
  }

  if (page === "payment-status") {
    return (
      <>
        <PaymentStatusPage
          onNavigate={setPage}
          onLoginClick={() => setPage("login")}
          user={user}
          onLogout={handleLogout}
          paymentPlan={paymentPlan}
        />
        {renderModals()}
      </>
    );
  }

  if (page === "developer") {
    return (
      <>
        <DeveloperPage
          onNavigate={setPage}
          onLoginClick={() => setPage("login")}
          user={user}
          onLogout={handleLogout}
        />
        {renderModals()}
      </>
    );
  }

  if (page === "dashboard") {
    return (
      <>
        <DashboardPage
          onNavigate={setPage}
          onLoginClick={() => setPage("login")}
          user={user}
          usage={usage}
          onLogout={handleLogout}
        />
        {renderModals()}
      </>
    );
  }

  if (page === "playground") {
    return (
      <>
        <PlaygroundPage
          onNavigate={setPage}
          onLoginClick={() => setPage("login")}
          user={user}
          onLogout={handleLogout}
        />
        {renderModals()}
      </>
    );
  }

  return (
    <>
      <HomePage
        onNavigate={setPage}
        onLoginClick={() => setPage("login")}
        user={user}
        onLogout={handleLogout}
      />
      {renderModals()}
    </>
  );
}