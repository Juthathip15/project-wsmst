import React, { useState } from "react";
import "./PageRegister.css";

function PageRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [obscurePassword, setObscurePassword] = useState(true);
  const [obscureConfirmPassword, setObscureConfirmPassword] = useState(true);

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!firstName) newErrors.firstName = "กรุณากรอกชื่อ";
    if (!lastName) newErrors.lastName = "กรุณากรอกนามสกุล";

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

    if (!confirmPassword) {
      newErrors.confirmPassword = "กรุณายืนยันรหัสผ่าน";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      alert("ลงทะเบียนสำเร็จ");
    }
  };

  return (
    <div className="page">
      <div className="container">

        <h2 className="title">ลงทะเบียน</h2>

        <div className="space-lg" />

        {/* First Name */}
        <div className="input-group">
          <label>ชื่อ</label>
          <input
            type="text"
            placeholder="กรอกชื่อ"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input"
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>

        {/* Last Name */}
        <div className="input-group">
          <label>นามสกุล</label>
          <input
            type="text"
            placeholder="กรอกนามสกุล"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input"
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>

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
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {/* Confirm Password */}
        <div className="input-group">
          <label>ยืนยันรหัสผ่าน</label>
          <div className="password-wrapper">
            <input
              type={obscureConfirmPassword ? "password" : "text"}
              placeholder="กรอกรหัสผ่านอีกครั้ง"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input"
            />
            <button
              className="eye-btn"
              onClick={() =>
                setObscureConfirmPassword(!obscureConfirmPassword)
              }
            >
              {obscureConfirmPassword ? "👁‍🗨" : "👁"}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>

        <div className="space-md" />

        {/* Button */}
        <button className="btn" onClick={handleSubmit}>
          ลงทะเบียน
        </button>

      </div>
    </div>
  );
}

export default PageRegister;