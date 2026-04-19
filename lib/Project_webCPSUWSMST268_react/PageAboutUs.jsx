import { useEffect, useState } from "react";

export default function AboutUs() {
  const [dashboard, setDashboard] = useState(null);
  const [systemStatus, setSystemStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ===== FETCH API =====
  const fetchData = async () => {
    setIsLoading(true);

    try {
      const dashboardRes = await fetch("http://localhost:4000/dashboard");
      const systemRes = await fetch("http://localhost:4000/system_status");

      const dashboardData = await dashboardRes.json();
      const systemData = await systemRes.json();

      setDashboard(dashboardData[0]);
      setSystemStatus(systemData);
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ===== NAV ITEM =====
  const NavItem = ({ title, active }) => {
    return (
      <div
        onClick={() => console.log(title)}
        style={{
          margin: "0 15px",
          paddingBottom: 5,
          borderBottom: active ? "2px solid white" : "none",
          color: "white",
          cursor: "pointer",
        }}
      >
        {title}
      </div>
    );
  };

  // ===== BOX CARD =====
  const Box = ({ value, title, color, size }) => {
    return (
      <div
        style={{
          width: 150,
          height: 150,
          background: "white",
          borderRadius: 15,
          border: "1px solid #ddd",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: 5,
        }}
      >
        <div
          style={{
            fontSize: size || 18,
            fontWeight: "bold",
            color: color || "black",
          }}
        >
          {value}
        </div>

        <div style={{ fontSize: 14, color: "gray", marginTop: 10 }}>
          {title}
        </div>
      </div>
    );
  };

  // ===== UI =====
  return (
    <div style={{ background: "#F5F6FA", minHeight: "100vh" }}>
      {/* HEADER */}
      <div
        style={{
          background: "#2C266A",
          padding: 15,
          display: "flex",
          justifyContent: "space-between",
          color: "white",
        }}
      >
        <div style={{ background: "white", color: "black", padding: 10 }}>
          โลโก้
        </div>

        <div style={{ display: "flex" }}>
          <NavItem title="หน้าแรก" />
          <NavItem title="เกี่ยวกับเรา" active />
          <NavItem title="แพ็คเกจ" />
          <NavItem title="แดชบอร์ด" />
        </div>

        <input placeholder="ค้นหา" />
      </div>

      {/* BODY */}
      <div style={{ padding: 50 }}>
        <h2>เกี่ยวกับเรา</h2>

        <p style={{ textAlign: "center", maxWidth: 700, margin: "auto" }}>
          เราคือผู้ให้บริการ Web Service และ API ด้านข้อมูลสุขภาพ
        </p>

        {/* CARDS */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
              <Box value="250+" title="APIs & AI Models" color="#017E81" size={25} />

              <Box
                value={`${dashboard?.uptime ?? 0}%`}
                title="Uptime"
                color="#78A3D4"
                size={25}
              />
            </div>

            <div style={{ display: "flex" }}>
              <Box
                value={`${dashboard?.rate_limit_per_min ?? 0} dev/min`}
                title="Developers"
                color="purple"
                size={20}
              />

              <Box value="24/7" title="Support" color="#73C088" size={25} />
            </div>
          </div>
        </div>

        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
}