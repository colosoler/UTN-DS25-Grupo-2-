import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setToken } from "../Helpers/auth";
import { signupSchema } from "../Validations/signupSchema";
import { AuthContainer } from "../Components/AuthContainer";
import { AuthField } from "../Components/AuthField";
import { SearchOptions } from "../Components/SearchOptions";
import { Alert } from "../Components/Alert";
import { useAuth } from "../Contexts/AuthContext";
import "./styles/SignupPage.css";

export const SignupPage = () => {
  const navigate = useNavigate();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [careers, setCareers] = useState([]);
  const { signup } = useAuth();

  const { register, handleSubmit, setValue, setError, clearErrors,formState: { errors, isSubmitting }} = useForm({
  resolver: yupResolver(signupSchema),
  mode: "onChange",
});


  // Obtengo las carreras
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    fetch(`${API_URL}/carreras`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(c => ({ value: c.id, option: c.nombre }));
        setCareers(formatted);
      })
      .catch(err => console.error("Error al cargar carreras:", err));
  }, []);

  const onSubmit = async (data) => {
    const result = await signup(data);
    if (result.success) {
        setShowSuccessToast(true);
        setTimeout(() => navigate("/"), 2500);
    } else {
        setError("root", { type: "manual", message: result.error });
    }
};

  const handleToastClose = () => setShowSuccessToast(false);

  return (
    <AuthContainer type="signup" onSubmit={handleSubmit(onSubmit)}>
      <h2>Crear Cuenta</h2>

      {/* Campos de texto */}
      <AuthField id="formName" type="text" placeholder="Nombre" registerField={register("name")} error={errors.name?.message} />
      <AuthField id="formSurname" type="text" placeholder="Apellido" registerField={register("surname")} error={errors.surname?.message} />
      <AuthField id="formUsername" type="text" placeholder="Usuario" registerField={register("username")} error={errors.username?.message} />
      <AuthField id="formEmail" type="email" placeholder="Correo electrónico" registerField={register("email")} error={errors.email?.message} />
      <AuthField id="formPassword" type="password" placeholder="Contraseña" registerField={register("password")} error={errors.password?.message} />

      {/* Select carrera */}
      <Form.Group controlId="formCareer" className="mb-3">
        <SearchOptions
          options={careers}
          placeholder="Seleccioná tu carrera"
          name="career"
          onChange={(e) => {
            let value;

            // si viene del select, viene con option y value
            if (e.target?.value?.option) {
              value = e.target.value.value; // guardamos solo el id
            } else {
              value = e.target.value; // valor que escribe el usuario
          }
          setValue("career", value, { shouldValidate: true });
          clearErrors("career"); // elimina el error al seleccionar
        }}
        />
        {errors.career && <div className="field-error">{"Debe seleccionar una carrera"}</div>}
      </Form.Group>

      {/* Error general */}
      {errors.root && <div className="field-error">{errors.root.message}</div>}

      <Button type="submit" className="w-100" disabled={isSubmitting}>
        {isSubmitting ? "Registrando..." : "Registrarme"}
      </Button>

      <p className="signup-register-link">
        ¿Ya tenés cuenta? <Link to="/login">Inicia Sesión</Link>
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
