import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Alert } from "../Components/Alert";
import { AuthContainer } from "../Components/AuthContainer";
import { AuthField } from "../Components/AuthField";
import { setToken } from "../Helpers/auth";
import "./styles/SignupPage.css";

export const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    career: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setFormErrors({ ...formErrors, [field]: "" });
  };

  const fields = [
    { id: "formName", name: "name", placeholder: "Nombre", type: "text" },
    { id: "formSurname", name: "surname", placeholder: "Apellido", type: "text" },
    { id: "formUsername", name: "username", placeholder: "Usuario", type: "text" },
    { id: "formEmail", name: "email", placeholder: "Correo electrónico", type: "email" },
    { id: "formPassword", name: "password", placeholder: "Contraseña", type: "password" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    fields.forEach(({ name, placeholder }) => {
      if (!formData[name]) errors[name] = `Ingresá tu ${placeholder.toLowerCase()}`;
    });

    if (!formData.career) errors.career = "Seleccioná tu carrera";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          careerId: parseInt(formData.career, 10),
        }),
      });

      if (!res.ok) throw new Error("Error en el registro");

      const newUser = await res.json();
      if (newUser.token) {
        setToken(newUser.token);
      }

      setShowSuccessToast(true);
      setTimeout(() => navigate("/home"), 1000);
    } catch (err) {
      console.error("Error al registrar:", err);
      setFormErrors({ general: "No se pudo registrar el usuario" });
    }
  };

  const handleToastClose = () => setShowSuccessToast(false);

  return (
    <AuthContainer type="signup" onSubmit={handleSubmit}>
      <h2>Crear Cuenta</h2>

      {fields.map(({ id, name, placeholder, type }) => (
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

      <Form.Group controlId="formCareer" className="mb-3">
        <Form.Select
          value={formData.career}
          onChange={handleChange("career")}
          isInvalid={!!formErrors.career}
        >
          <option value="" disabled>
            Seleccioná tu carrera
          </option>
          <option value="22">Ingeniería Civil</option>
          <option value="25">Ingeniería Eléctrica</option>
          <option value="24">Ingeniería Industrial</option>
          <option value="20">Ingeniería Mecánica</option>
          <option value="23">Ingeniería Química</option>
          <option value="21">Ingeniería en Sistemas</option>
        </Form.Select>
        {formErrors.career && (
          <div style={{ color: "red", marginTop: "5px", textAlign: "center" }}>
            {formErrors.career}
          </div>
        )}
      </Form.Group>

      {formErrors.general && (
        <div style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
          {formErrors.general}
        </div>
      )}

      <Button type="submit" className="w-100">
        Registrarme
      </Button>

      <p className="signup-register-link">
        ¿Ya tenés cuenta? <Link to="/">Inicia Sesión</Link>
      </p>

      <Alert
        show={showSuccessToast}
        message="¡Cuenta creada exitosamente! Redirigiendo..."
        onClose={handleToastClose}
        variant="success"
      />
    </AuthContainer>
  );
};
