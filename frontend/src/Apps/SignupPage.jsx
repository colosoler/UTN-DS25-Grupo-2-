import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Alert } from "../Components/Alert";
import { AuthContainer } from "../Components/AuthContainer";
import { AuthField } from "../Components/AuthField";
import { setToken } from "../Helpers/auth";
import { SearchOptions } from "../Components/SearchOptions";
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
  const [careers, setCareers] = useState([]);

  const navigate = useNavigate();

  // Obtengo las carreras
  useEffect(() => {
    fetch("http://localhost:3000/carreras")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((c) => ({
          value: c.id,
          option: c.nombre,
        }));
        setCareers(formatted);
      })
      .catch((err) => console.error("Error al cargar carreras:", err));
  }, []);

  // Maneja cambios en los campos de texto
  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    // Limpiamos el error del campo si existía
    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: "" });
    }
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
        <SearchOptions
          options={careers}
          placeholder="Seleccioná tu carrera"
          name="career"
          onChange={(e) => {
            // Actualizamos el valor de career y limpiamos error si existía
            setFormData({ ...formData, career: e.target.value.value });
            if (formErrors.career) {
              setFormErrors({ ...formErrors, career: "" });
            }
          }}
        />
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
