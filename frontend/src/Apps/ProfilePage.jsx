import { getUser, getToken } from "../Helpers/auth";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './styles/ProfilePage.css';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [UserData, setUserData] = useState(null);
  const user = getUser();

  useEffect(() => {
    if (!user) return;

    const UserData = fetch(`http://localhost:3000/users/${user.id}`, {
      headers: { "Authorization": `Bearer ${getToken()}` },
    })
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(err => console.error(err));
  }, [user]);

  if (!UserData) return <p>Cargando...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-image-container">
          <img src="/images/profile-user-icon.png" alt="Profile" className="profile-image" />
        </div>

        <div className="profile-info">
          <h1 className="profile-name">{UserData.name} {UserData.surname}</h1>
          <p className="profile-username">@{UserData.username}</p>
          <p className="profile-career">Estudiante de {UserData.career.nombre}</p>
          <p className="profile-date">
            <img src="../images/calendar.png" alt="" />
            Se unió en {new Date(UserData.createdAt).toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })}
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
}