import { getUser, getToken } from "../Helpers/auth";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './styles/ProfilePage.css';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const user = getUser();
	const API_URL = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    if (!user) return;

    fetch(`${API_URL}/users/${user.id}`, {
      headers: { "Authorization": `Bearer ${getToken()}` },
    })
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(err => console.error(err));
  }, []); 
  console.log(userData);
  if (!userData) return <p>Cargando...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-image-container">
          <img src={userData.profilePicture || "../images/profile-user-icon.png" } alt="Profile" className="profile-image" />
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{userData.name} {userData.surname}</h1>
          <p className="profile-username">@{userData.username}</p>
          <p className="profile-career">Estudiante de {userData.career.nombre}</p>
          <p className="profile-date">
            <img src="../images/calendar.png" alt="" />
            Se unió en {new Date(userData.createdAt).toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })}
          </p>

          <div className="stats-container">
            <div className="stat-item positive">
              <span className="stat-number">0</span>
              <span className="stat-label">Votos Positivos</span>
            </div>
            <div className="stat-item negative">
              <span className="stat-number">0</span>
              <span className="stat-label">Votos Negativos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
