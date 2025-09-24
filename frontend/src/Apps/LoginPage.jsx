import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { setToken } from "../Helpers/auth";
import { Alert } from "../Components/Alert";
import { AuthContainer } from "../Components/AuthContainer";
import { AuthField } from "../Components/AuthField";
import "./styles/LoginPage.css";

export const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "", auth: "" });
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setFormErrors({ ...formErrors, [field]: "", auth: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({ email: "", password: "", auth: "" });

    const errors = {};
    if (!formData.email) errors.email = "Ingresá un correo válido";
    if (!formData.password) errors.password = "Ingresá una contraseña";

    setValidated(true);
    if (Object.keys(errors).length) {
      setFormErrors((prev) => ({ ...prev, ...errors }));
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Correo o contraseña inválidos");

      const { data } = await res.json();
      setToken(data.token);
      setShowSuccessToast(true);

      setTimeout(() => navigate("/home"), 2500);
    } catch {
      setFormErrors((prev) => ({ ...prev, auth: "Correo o contraseña inválidos" }));
    }
  };

  const handleToastClose = () => setShowSuccessToast(false);

  const fields = [
    { id: "formEmail", type: "email", placeholder: "Correo electrónico", name: "email" },
    { id: "formPassword", type: "password", placeholder: "Contraseña", name: "password" },
  ];

  return (
    <AuthContainer type="login" onSubmit={handleSubmit} validated={validated}>
      <h2>Iniciar Sesión</h2>

      {fields.map(({ id, type, placeholder, name }) => (
        <AuthField
          key={id}
          id={id}
          type={type}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange(name)}
          error={formErrors[name]}
        />
      ))}

      {/* Error general de autenticación */}
      {formErrors.auth && (
        <div style={{ color: "red", textAlign: "center" }}>
          {formErrors.auth}
        </div>
      )}

      <Button type="submit" className="w-100">
        Ingresar
      </Button>

      <p className="login-register-link">
        ¿No tenés cuenta? <Link to="/signup">Registrate</Link>
      </p>

      <Alert
        show={showSuccessToast}
        message="¡Sesión iniciada exitosamente! Redirigiendo..."
        onClose={handleToastClose}
        variant="success"
      />
    </AuthContainer>
  );
};
