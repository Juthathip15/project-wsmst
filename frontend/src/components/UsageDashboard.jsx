export default function UsageDashboard({ usage }) {
  if (!usage) {
    return (
      <div className="card">
        <h2>Usage Dashboard</h2>
        <p>No usage data</p>
      </div>
    );
  }

  const isGold = usage.plan === "gold";
  const quotaUsed = usage.quotaUsed ?? 0;
  const quotaLimit = usage.quotaLimit ?? 0;
  const remaining = isGold ? "Unlimited" : usage.remaining ?? 0;

  const percent =
    !isGold && quotaLimit > 0
      ? Math.min((quotaUsed / quotaLimit) * 100, 100)
      : 0;

  return (
    <div className="card">
      <h2>Usage Dashboard</h2>

      <div className="usage-row">
        <span className="usage-label">Plan</span>
        <span className={`plan-badge ${usage.plan}`}>
          {usage.plan.toUpperCase()}
        </span>
      </div>

      <div className="usage-row">
        <span className="usage-label">Quota Used</span>
        <span>{quotaUsed}</span>
      </div>

      <div className="usage-row">
        <span className="usage-label">Quota Limit</span>
        <span>{isGold ? "Unlimited" : quotaLimit}</span>
      </div>

      <div className="usage-row">
        <span className="usage-label">Remaining</span>
        <span>{remaining}</span>
      </div>

      {!isGold && (
        <>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="usage-percent">{percent.toFixed(1)}% used</p>
        </>
      )}
    </div>
  );
}