import React, { useState } from "react";
import "./css/RegisterPage.css";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [showTerms, setShowTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "mobile") {
      // Allow only numbers, max 10 digits
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.terms) return alert("Please agree to the terms and conditions.");
    if (!/^\d{10}$/.test(formData.mobile)) return alert("Mobile number must be 10 digits.");
    if (formData.password !== formData.confirmPassword) return alert("Passwords do not match!");

    alert(`✅ Registered successfully!\n\n${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <div className="app">
      <div className="card">
        <h2>📝 Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email ID"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            required
            value={formData.firstname}
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            required
            value={formData.lastname}
            onChange={handleChange}
          />

          <div className="mobile-group">
            <span className="mobile-prefix">+91</span>
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              required
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <div className="checkbox-label">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              id="terms"
            />
            <label htmlFor="terms">
              I agree to the <span className="terms-link" onClick={() => setShowTerms(true)}>Terms and Conditions</span>
            </label>
          </div>
          <button type="submit" className="register-btn">Register</button>
        </form>

        {showTerms && (
          <div className="terms-modal">
            <div className="terms-content">
              <h3>📜 Terms and Conditions</h3>
              <p>
                By registering, you agree to abide by our application policies and data usage rules.
                Your account may be suspended for violations.
              </p>
              <button onClick={() => setShowTerms(false)} className="close-btn">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;
