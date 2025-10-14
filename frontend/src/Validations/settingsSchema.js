import * as yup from "yup";

export const settingsSchema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  surname: yup.string().required("El apellido es requerido"),
  username: yup.string().required("El usuario es requerido"),
  email: yup
    .string()
    .required("El email es requerido")
    .email("Debe ser un email válido"),
  password: yup
    .string()
    .notRequired()
    .test(
      "password-validation",
      "La contraseña debe tener al menos 6 caracteres y una letra mayúscula",
      (value) => {
        if (!value) return true; // si está vacío, pasa
        return value.length >= 6 && /[A-Z]/.test(value); // si hay valor, valida
      }
    ),
  career: yup.string().required("Seleccioná tu carrera"),
});
