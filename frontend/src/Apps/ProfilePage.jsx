import { getUser, getToken } from "../Helpers/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import { Loading } from "../Components/Loading";
import { MyMaterialsPage } from "./MyMaterialsPage";
import { useFetch } from "../Hooks/useFetch";
import './styles/ProfilePage.css';

export const ProfilePage = () => {
  const user = getUser();
  const API_URL = import.meta.env.VITE_API_URL;

  const { data: userData, loading } = useFetch(
    user?.id ? `${API_URL}/users/${user.id}` : null,
    {},
    { requireAuth: true }
  );

  if (loading || !userData) return <Loading />;

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-card">
          <Link to="/settings" className="profile-settings-link">
            <Settings size={18} />
            Configuración de perfil
          </Link>
          <div className="profile-image-container">
            <img
              src={userData.profilePicture || "../images/profile-user-icon.png"}
              alt="Profile"
              className="profile-image"
            />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{userData.name} {userData.surname}</h1>
            <p className="profile-username">@{userData.username}</p>
            <p className="profile-career">Estudiante de {userData.career.nombre}</p>
            <p className="profile-date">
              <img src="../images/calendar.png" alt="" />
              Se unió en {new Date(userData.createdAt).toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
      <MyMaterialsPage />
    </div>
  );
};
