import React, { useState } from "react";
import "./PageResetPassword.css";

function PageResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [obscureNewPassword, setObscureNewPassword] = useState(true);
  const [obscureConfirmPassword, setObscureConfirmPassword] = useState(true);

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!email) {
      newErrors.email = "กรุณากรอกอีเมล";
    } else if (!email.includes("@")) {
      newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    }

    if (!newPassword) {
      newErrors.newPassword = "กรุณากรอกรหัสผ่านใหม่";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "รหัสผ่านต้องอย่างน้อย 6 ตัว";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "กรุณายืนยันรหัสผ่าน";
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      alert("รีเซ็ตรหัสผ่านสำเร็จ");
    }
  };

  return (
    <div className="page">
      <div className="container">

        <h2 className="title">รีเซ็ตรหัสผ่านใหม่</h2>

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

        {/* New Password */}
        <div className="input-group">
          <label>รหัสผ่านใหม่</label>
          <div className="password-wrapper">
            <input
              type={obscureNewPassword ? "password" : "text"}
              placeholder="กรอกรหัสผ่านใหม่"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input"
            />
            <button
              className="eye-btn"
              onClick={() => setObscureNewPassword(!obscureNewPassword)}
            >
              {obscureNewPassword ? "👁‍🗨" : "👁"}
            </button>
          </div>
          {errors.newPassword && (
            <span className="error">{errors.newPassword}</span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="input-group">
          <label>ยืนยันรหัสผ่านใหม่</label>
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
          รีเซ็ตรหัสผ่านใหม่
        </button>

      </div>
    </div>
  );
}

export default PageResetPassword;