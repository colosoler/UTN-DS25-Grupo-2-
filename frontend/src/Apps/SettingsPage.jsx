import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { settingsSchema } from "../Validations/settingsSchema";
import { DeleteConfirmAccount } from "../Components/DeleteConfirmAccount";
import { Alert } from "../Components/Alert";
import { AuthField } from "../Components/AuthField";
import { getUser, getToken, clearToken } from "../Helpers/auth";
import { useFetch } from "../Hooks/useFetch";
import "./styles/SettingsPage.css";

export const SettingsPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const user = getUser();
  const API_URL = import.meta.env.VITE_API_URL;

  const [profilePic, setProfilePic] = useState(null);
  const [originalProfilePic, setOriginalProfilePic] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedCareer, setSelectedCareer] = useState("");
  const [userData, setUserData] = useState(null);

  // Traer carreras con useFetch
  const { data: careers, loading: careersLoading, error: careersError } = useFetch(
    `${API_URL}/carreras`,
    {},
    { requireAuth: true }
  );

  // Traer datos del usuario con useFetch
  const { data: fetchedUserData, loading: userLoading, error: userError } = useFetch(
    user?.id ? `${API_URL}/users/${user.id}` : null,
    {},
    { requireAuth: true }
  );

  // Setear datos del usuario en el form
  const {
    register, handleSubmit, setValue, setError, clearErrors, formState: { errors, isSubmitting },} = useForm({
    resolver: yupResolver(settingsSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (!fetchedUserData) return;

    setUserData(fetchedUserData);
    setValue("name", fetchedUserData.name || "");
    setValue("surname", fetchedUserData.surname || "");
    setValue("username", fetchedUserData.username || "");
    setValue("email", fetchedUserData.email || "");
    setValue("career", fetchedUserData.career?.id || "");
    setSelectedCareer(fetchedUserData.career?.id ? String(fetchedUserData.career.id) : "");
    setProfilePic(fetchedUserData.profilePic || null);
    setOriginalProfilePic(fetchedUserData.profilePic || null);
  }, [fetchedUserData, setValue]);

  // Funciones de foto de perfil
  const handleChangePhotoClick = () => fileInputRef.current?.click();
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };
  const handleDeletePhoto = () => setProfilePic(null);

  // Guardar cambios
  const onSubmit = async (data) => {
    console.log(data);
    if (!userData) return;

    const updatedData = {};

    Object.keys(data).forEach((key) => {
      if (key === "career") {
        const oldCareerId = userData.career?.id ?? null;
        const newCareerId = Number(data.career);
        if (newCareerId && newCareerId !== oldCareerId) {
          updatedData.careerId = newCareerId;
        }
      } else if (key === "password") {
        if (data.password && data.password.trim() !== "") {
          updatedData.password = data.password;
        }
      } else {
        const oldValue = userData[key] ?? "";
        if (data[key] !== oldValue && data[key] !== "") {
          updatedData[key] = data[key];
        }
      }
    });

    if (Object.keys(updatedData).length === 0) {
      setSuccessMessage("No hubo cambios para guardar");
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 1500);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Error al actualizar el perfil");

      setSuccessMessage("Perfil actualizado correctamente");
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
        navigate("/profile");
      }, 1500);
    } catch (error) {
      console.error(error);
      setError("root", {
        type: "manual",
        message: "Error al actualizar el perfil.",
      });
    }
  };

  // Eliminar cuenta
  const handleConfirmDelete = async () => {
  try {
    const res = await fetch(`${API_URL}/users/${user.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error al eliminar la cuenta");
    }

    // Si todo sale bien:
    clearToken(); // Borra token y datos del usuario del storage

    setShowDeleteModal(false);
    setSuccessMessage("Cuenta eliminada correctamente");
    setShowSuccessToast(true);

    // Esperar un momento antes de redirigir
    setTimeout(() => {
      setShowSuccessToast(false);
      navigate("/");
    }, 1500);
  } catch (error) {
    console.error("Error al eliminar cuenta:", error);
    setError("root", {
      type: "manual",
      message: "Ocurrió un error al eliminar la cuenta.",
    });
  }
};

  const handleToastClose = () => setShowSuccessToast(false);

  return (
    <div className="profile-settings-container">
      {/* Foto de perfil */}
      <Form.Group className="mb-4">
        <Form.Label className="profile-photo-label">Foto de Perfil</Form.Label>
        <div className="profile-photo-section">
          {profilePic ? (
            <img src={profilePic} alt="Foto de perfil" className="profile-photo" />
          ) : (
            <div className="profile-photo-placeholder">?</div>
          )}
          <div className="profile-photo-buttons">
            <Button variant="primary" onClick={handleChangePhotoClick} className="me-2">
              Cambiar foto de perfil
            </Button>
            <Button variant="danger" onClick={handleDeletePhoto}>
              Eliminar foto de perfil
            </Button>
          </div>
        </div>
        <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
      </Form.Group>

      {/* Formulario */}
      <Form onSubmit={handleSubmit(onSubmit)} className="profile-settings-form">
        <h2>Configuración de Perfil</h2>

        <AuthField id="formName" type="text" placeholder="Nombre" registerField={register("name")} error={errors.name?.message} />
        <AuthField id="formSurname" type="text" placeholder="Apellido" registerField={register("surname")} error={errors.surname?.message} />
        <AuthField id="formUsername" type="text" placeholder="Usuario" registerField={register("username")} error={errors.username?.message} />
        <AuthField id="formEmail" type="email" placeholder="Correo electrónico" registerField={register("email")} error={errors.email?.message} />
        <AuthField id="formPassword" type="password" placeholder="Nueva contraseña (opcional)" registerField={register("password")} error={errors.password?.message} />

        {/* Carrera */}
        <Form.Group controlId="formCareer" className="mb-3">
          <Form.Select
            {...register("career")}
            value={selectedCareer}
            onChange={(e) => {
              setSelectedCareer(e.target.value);
              setValue("career", e.target.value, { shouldValidate: true });
              clearErrors("career");
            }}
          >
            <option disabled value="">Seleccioná tu carrera</option>
            {careers?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </Form.Select>
          {errors.career && <div className="field-error">{errors.career.message}</div>}
        </Form.Group>

        {errors.root && <div className="field-error">{errors.root.message}</div>}

        <Button type="submit" className="w-100 mb-2" disabled={isSubmitting}>
          {isSubmitting ? "Guardando cambios..." : "Guardar cambios"}
        </Button>

        <Button type="button" className="w-100" variant="danger" onClick={() => setShowDeleteModal(true)}>
          Eliminar cuenta
        </Button>
      </Form>

      <DeleteConfirmAccount
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        message="¿Estás seguro de que querés eliminar tu cuenta?"
        confirmText="acción"
        buttonTitle="Eliminar cuenta"
      />

      <Alert show={showSuccessToast} message={successMessage} onClose={handleToastClose} variant="success" />
    </div>
  );
};
