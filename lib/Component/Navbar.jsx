import React from "react";

export default function Navbar() {
  return (
    <div
      style={{
        background: "#2C266A",
        padding: 20,
        display: "flex",
        justifyContent: "space-between",
        color: "white",
      }}
    >
      <div>โลโก้</div>

      <div style={{ display: "flex", gap: 20 }}>
        <a href="/home">หน้าแรก</a>
        <a href="/about">เกี่ยวกับเรา</a>
        <a href="/dashboard">แดชบอร์ด</a>
      </div>

      <input placeholder="ค้นหา" />
    </div>
  );
}