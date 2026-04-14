import { useState } from "react";

export default function RegisterForm({ onRegister }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    plan: "basic",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await onRegister(form);
    } catch (err) {
      setError(err.message || "Register failed");
    }
  }

  return (
    <div className="card">
      <h2>Register</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <h3>Select Plan</h3>

        <div className="plans">
          <PlanCard
            title="Basic"
            price="ฟรี"
            value="basic"
            selected={form.plan}
            onSelect={handleChange}
            features={[
              "1,000 requests/เดือน",
              "Rate limit: 10 req/min",
              "Basic search",
            ]}
          />

          <PlanCard
            title="Silver"
            price="฿999/เดือน"
            value="silver"
            selected={form.plan}
            onSelect={handleChange}
            features={[
              "50,000 requests/เดือน",
              "Advanced search",
              "Dashboard",
            ]}
          />

          <PlanCard
            title="Gold"
            price="฿4,999/เดือน"
            value="gold"
            selected={form.plan}
            onSelect={handleChange}
            features={[
              "Unlimited requests",
              "AI suggestions",
              "Analytics + export",
            ]}
          />
        </div>

        <button type="submit">Register</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

function PlanCard({ title, price, value, selected, onSelect, features }) {
  return (
    <label className={`plan-card ${selected === value ? "active" : ""}`}>
      <input
        type="radio"
        name="plan"
        value={value}
        checked={selected === value}
        onChange={onSelect}
      />

      <h4>{title}</h4>
      <p className="price">{price}</p>

      <ul>
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </label>
  );
}