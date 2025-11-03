import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../Validations/loginSchema";
import { AuthContainer } from "../Components/AuthContainer";
import { AuthField } from "../Components/AuthField";
import { Alert } from "../Components/Alert";
import { Button } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";
import "./styles/LoginPage.css";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange", // validación en tiempo real
  });

  const onSubmit = async (data) => {
    const result = await login(data);
    if (result.success){
      setShowSuccessToast(true);
      setTimeout(() => navigate("/"), 2500);
    }else {
      setError("root", {
        type: "manual",
        message: "Correo o contraseña inválidos",
      });
    }
  }

  const handleToastClose = () => setShowSuccessToast(false);

  return (
    <AuthContainer type="login" onSubmit={handleSubmit(onSubmit)} validated={false}>
      <h2>Iniciar Sesión</h2>

      <AuthField
        id="formEmail"
        type="email"
        placeholder="Correo electrónico"
        registerField={{
          ...register("email", {
            onChange: () => clearErrors("root"),
        }),
      }}
        error={errors.email?.message}
      />

      <AuthField
        id="formPassword"
        type="password"
        placeholder="Contraseña"
        registerField={{
          ...register("password", {
            onChange: () => clearErrors("root"),
        }),
      }}
        error={errors.password?.message}
      />

      {/* Error general de autenticación */}
      {errors.root && (
        <div style={{ color: "red", textAlign: "center" }}>{errors.root.message}</div>
      )}

      <Button type="submit" className="w-100" disabled={isSubmitting}>
        {isSubmitting ? "Ingresando..." : "Ingresar"}
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
