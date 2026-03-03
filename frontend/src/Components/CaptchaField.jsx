import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export const CaptchaField = ({ onVerify, error, clearError }) => {
  const [token, setToken] = useState(null);

  const handleChange = (value) => {
    setToken(value);
    onVerify(value);
    if (clearError) clearError();
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
      <ReCAPTCHA
        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        onChange={handleChange}
        onExpired={() => {
          setToken(null);
          onVerify(null);
        }}
      />

      {error && (
        <div style={{ color: "red", textAlign: "center", marginTop: "5px" }}>
          {error}
        </div>
      )}
    </div>
  );
};