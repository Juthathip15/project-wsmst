import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PageLogin.css";

function PageLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [obscurePassword, setObscurePassword] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!email) {
      newErrors.email = "กรุณากรอกอีเมล";
    } else if (!email.includes("@")) {
      newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    }

    if (!password) {
      newErrors.password = "กรุณากรอกรหัสผ่าน";
    } else if (password.length < 6) {
      newErrors.password = "รหัสผ่านต้องอย่างน้อย 6 ตัว";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      alert("เข้าสู่ระบบสำเร็จ");
    }
  };

  return (
    <div className="page">
      <div className="container">

        <h2 className="title">เข้าสู่ระบบ</h2>

        <div className="space-lg" />

        {/* Email */}
        <div className="input-group">
          <label>อีเมล</label>
          <input
            type="text"
            placeholder="กรอกอีเมล"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* Password */}
        <div className="input-group">
          <label>รหัสผ่าน</label>
          <div className="password-wrapper">
            <input
              type={obscurePassword ? "password" : "text"}
              placeholder="กรอกรหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
            <button
              className="eye-btn"
              onClick={() => setObscurePassword(!obscurePassword)}
            >
              {obscurePassword ? "👁‍🗨" : "👁"}
            </button>
          </div>
          {errors.password && (
            <span className="error">{errors.password}</span>
          )}
        </div>

        {/* Remember */}
        <div className="row">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span>จดจำฉัน</span>
        </div>

        {/* Button */}
        <button className="btn" onClick={handleSubmit}>
          เข้าสู่ระบบ
        </button>

        {/* Register */}
        <div className="center-row">
          <span>ยังไม่มีบัญชี? </span>
          <span className="link" onClick={() => navigate("/register")}>
            ลงทะเบียนที่นี่
          </span>
        </div>

        {/* Forgot */}
        <div className="link forgot" onClick={() => navigate("/reset")}>
          ลืมรหัสผ่าน
        </div>

      </div>
    </div>
  );
}

export default PageLogin;