import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function ApiTestingPage() {
  const [healthList, setHealthList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("http://localhost:4000/health");
  const [method, setMethod] = useState("GET");

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await axios.get(url);

      console.log("STATUS:", res.status);
      console.log("DATA:", res.data);

      setHealthList(res.data);
    } catch (err) {
      console.log("ERROR:", err);
    }

    setLoading(false);
  };

  return (
    <div style={{ background: "#F5F6FA", minHeight: "100vh" }}>
      
      {/* Navbar */}
      <Navbar />

      {/* Title */}
      <div style={{ width: 900, margin: "20px auto" }}>
        <h2>API Testing</h2>
        <p>
          หน้าทดสอบ API ใช้สำหรับส่ง request ไป server และดู response
        </p>
      </div>

      {/* Panel */}
      <div
        style={{
          width: 900,
          margin: "0 auto",
          background: "white",
          padding: 20,
          borderRadius: 12,
        }}
      >
        {/* Row top */}
        <div style={{ display: "flex", gap: 10 }}>
          
          {/* Method */}
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>

          {/* URL */}
          <input
            style={{ flex: 1, padding: 10 }}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          {/* Button */}
          <button
            onClick={fetchData}
            style={{
              background: "#274AB3",
              color: "white",
              padding: "10px 20px",
              borderRadius: 10,
            }}
          >
            Send
          </button>
        </div>

        {/* Result */}
        <div
          style={{
            marginTop: 20,
            background: "#F5F6FA",
            padding: 10,
            borderRadius: 10,
            minHeight: 200,
          }}
        >
          {loading ? (
            <p>Loading...</p>
          ) : (
            <pre>{JSON.stringify(healthList, null, 2)}</pre>
          )}
        </div>
      </div>

      {/* Back button */}
      <div style={{ width: 900, margin: "20px auto", textAlign: "right" }}>
        <button
          onClick={() => (window.location.href = "/dashboard")}
          style={{
            background: "#2C266A",
            color: "white",
            padding: "10px 20px",
            borderRadius: 10,
          }}
        >
          ย้อนกลับ
        </button>
      </div>
    </div>
  );
}