import { useEffect, useState } from "react";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [systemStatus, setSystemStatus] = useState(null);
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  // ===== FETCH API =====
  const fetchDashboard = async () => {
    setLoading(true);

    try {
      const [dashRes, sysRes, keyRes] = await Promise.all([
        fetch("http://localhost:4000/dashboard"),
        fetch("http://localhost:4000/system_status"),
        fetch("http://localhost:4000/api_keys"),
      ]);

      const dashData = await dashRes.json();
      const sysData = await sysRes.json();
      const keyData = await keyRes.json();

      setDashboard(dashData[0] || null);
      setSystemStatus(sysData);
      setApiKeys(keyData || []);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // ===== NAV =====
  const NavItem = ({ title }) => (
    <div style={{ margin: "0 15px", color: "white", cursor: "pointer" }}>
      {title}
    </div>
  );

  // ===== SUMMARY CARD =====
  const SummaryCard = ({ title, value, icon }) => (
    <div
      style={{
        width: 300,
        background: "white",
        padding: 15,
        margin: 8,
        borderRadius: 12,
        border: "1px solid #ddd",
      }}
    >
      <div>{icon}</div>
      <div>{title}</div>
      <h3>{value}</h3>
    </div>
  );

  // ===== PROGRESS BAR =====
  const UsageBar = ({ used, total }) => {
    const percent = total === 0 ? 0 : used / total;

    return (
      <div>
        <p>
          Usage: {used}/{total}
        </p>

        <div
          style={{
            height: 8,
            background: "#ddd",
            borderRadius: 10,
          }}
        >
          <div
            style={{
              width: `${percent * 100}%`,
              height: "100%",
              background:
                percent > 0.9
                  ? "red"
                  : percent > 0.7
                  ? "orange"
                  : "green",
            }}
          />
        </div>
      </div>
    );
  };

  // ===== API KEY =====
  const ApiKeyBox = ({ apiKey }) => {
    const hidden =
      apiKey.length > 5 ? apiKey.substring(0, 5) + "****" : apiKey;

    return (
      <div
        style={{
          background: "#eee",
          padding: 10,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>{hidden}</span>
        <button>copy</button>
      </div>
    );
  };

  // ===== SYSTEM STATUS =====
  const SystemStatusBox = ({ status }) => (
    <div>
      <h4>System Status</h4>
      <p>API: {status.apiStatus}</p>
      <p>Database: {status.databaseStatus}</p>
      <p>Response: {status.avgResponseTime} ms</p>
      <p>Error: {status.errorRateToday}%</p>
    </div>
  );

  return (
    <div style={{ background: "#F5F6FA", minHeight: "100vh" }}>
      {/* NAVBAR */}
      <div
        style={{
          background: "#2C266A",
          display: "flex",
          justifyContent: "space-between",
          padding: 15,
          color: "white",
        }}
      >
        <div>LOGO</div>

        <div style={{ display: "flex" }}>
          <NavItem title="หน้าแรก" />
          <NavItem title="แดชบอร์ด" />
        </div>

        <input placeholder="ค้นหา" />
      </div>

      {/* BODY */}
      <div style={{ padding: 20 }}>
        {loading && <p>Loading...</p>}

        {/* TOP CARDS */}
        <div style={{ display: "flex" }}>
          <SummaryCard
            title="Plan"
            value={dashboard?.plan || "-"}
            icon="🏆"
          />
          <SummaryCard
            title="Used"
            value={dashboard?.used || 0}
            icon="📊"
          />
          <SummaryCard
            title="Success"
            value={`${dashboard?.successRate || 0}%`}
            icon="✔"
          />
          <SummaryCard
            title="Reset"
            value={`${dashboard?.resetInDays || 0} days`}
            icon="⏰"
          />
        </div>

        {/* MAIN */}
        <div style={{ display: "flex", marginTop: 20 }}>
          {/* LEFT */}
          <div style={{ flex: 3, background: "white", padding: 20 }}>
            <h3>Usage Overview</h3>

            <UsageBar
              used={dashboard?.used || 0}
              total={dashboard?.quota || 1}
            />

            <p>
              {(dashboard?.used / dashboard?.quota * 100 || 0).toFixed(1)}%
              used
            </p>
          </div>

          {/* RIGHT */}
          <div style={{ flex: 1, marginLeft: 15 }}>
            <div style={{ background: "white", padding: 15 }}>
              <SystemStatusBox
                status={
                  systemStatus || {
                    apiStatus: "-",
                    databaseStatus: "-",
                    avgResponseTime: 0,
                    errorRateToday: 0,
                  }
                }
              />
            </div>

            <div style={{ marginTop: 15, background: "white", padding: 15 }}>
              {apiKeys.length > 0 && (
                <ApiKeyBox apiKey={apiKeys[0].key} />
              )}
            </div>

            <button
              style={{
                marginTop: 15,
                width: "100%",
                padding: 15,
                background: "#2C266A",
                color: "white",
              }}
            >
              ทดสอบ API
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}