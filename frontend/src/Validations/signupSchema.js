import * as yup from "yup";


export const signupSchema = yup.object().shape({
  name: yup
      .string()
      .required("El nombre es requerido")
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras y espacios"),
  surname: yup
      .string()
      .required("El apellido es requerido")
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El apellido solo puede contener letras y espacios"),
  username: yup
      .string()
      .required("El usuario es requerido")
      .matches(/^[a-zA-Z0-9_]+$/, "El usuario solo puede contener letras, números y guiones bajos"),
  email: yup
      .string()
      .required('El email es requerido')
      .email('Debe ser un email válido')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Debe ser un email válido'),
    password: yup
      .string()
      .required('La contraseña es requerida')
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
      .matches(/\d/, 'La contraseña debe contener al menos un número')
      .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula'),
  career: yup
      .string()
      .required("Seleccioná tu carrera")
});
