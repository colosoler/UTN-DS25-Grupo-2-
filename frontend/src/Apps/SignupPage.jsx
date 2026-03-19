import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../Validations/signupSchema";
import { AuthContainer } from "../Components/AuthContainer";
import { AuthField } from "../Components/AuthField";
import { Alert } from "../Components/Alert";
import { GoogleAuthButton } from "../Components/GoogleAuthButton";
import { CareerSelector } from "../Components/CareerSelector";
import { useAuth } from "../Contexts/AuthContext";
import "./styles/SignupPage.css";

export const SignupPage = () => {
  const navigate = useNavigate();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [googleError, setGoogleError] = useState("");
  const [step, setStep] = useState(1);
  const [selectedCareerId, setSelectedCareerId] = useState(null);
  const { signup, signupWithGoogle } = useAuth();

  const { register, handleSubmit, setValue, setError, clearErrors, formState: { errors, isSubmitting }} = useForm({
  resolver: yupResolver(signupSchema),
  mode: "onChange",
});

  const handleCareerSelected = (careerId) => {
    setSelectedCareerId(careerId);
    setValue("career", careerId, { shouldValidate: true });
    setStep(2);
  };

  const onSubmit = async (data) => {
    const result = await signup(data);
    if (result.success) {
        setShowSuccessToast(true);
        setTimeout(() => navigate("/"), 2500);
    } else {
        setError("root", { type: "manual", message: result.error });
    }
  };

  const handleGoogleSuccess = async (response) => {
    setGoogleError("");

    const result = await signupWithGoogle({
      credential: response.credential,
      career: selectedCareerId,
    });

    if (result.success) {
      setShowSuccessToast(true);
      setTimeout(() => navigate("/"), 2500);
      return;
    }

    setError("root", { type: "manual", message: result.error });
  };

  const handleGoogleError = () => {
    setGoogleError("No se pudo registrar la cuenta con Google");
  };

  const handleToastClose = () => setShowSuccessToast(false);

  // Paso 1: Elegir carrera
  if (step === 1) {
    return <CareerSelector onSelect={handleCareerSelected} />;
  }

  // Paso 2: Formulario de registro (normal + Google)
  return (
    <AuthContainer type="signup" onSubmit={handleSubmit(onSubmit)}>
      <h2>Crear Cuenta</h2>

      <button type="button" className="signup-back-btn" onClick={() => setStep(1)}>
        ← Cambiar carrera
      </button>

      {/* Campos de texto */}
      <AuthField id="formName" type="text" placeholder="Nombre" registerField={register("name")} error={errors.name?.message} />
      <AuthField id="formSurname" type="text" placeholder="Apellido" registerField={register("surname")} error={errors.surname?.message} />
      <AuthField id="formUsername" type="text" placeholder="Usuario" registerField={register("username")} error={errors.username?.message} />
      <AuthField id="formEmail" type="email" placeholder="Correo electrónico" registerField={register("email")} error={errors.email?.message} />
      <AuthField id="formPassword" type="password" placeholder="Contraseña" registerField={register("password")} error={errors.password?.message} />

      {/* Error general */}
      {errors.root && <div className="field-error">{errors.root.message}</div>}
      {googleError && <div className="field-error">{googleError}</div>}

      <Button type="submit" className="w-100" disabled={isSubmitting}>
        {isSubmitting ? "Registrando..." : "Registrarme"}
      </Button>

      <p className="auth-divider-text">También podés</p>

      <GoogleAuthButton
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        text="signup_with"
      />

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