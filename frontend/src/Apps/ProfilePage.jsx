import './styles/ProfilePage.css';

export const ProfilePage = () => {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-image-container">
          <img src="/images/profile-user-icon.png" alt="Profile" className="profile-image" />
        </div>

        <div className="profile-info">
          <h1 className="profile-name">Nombre y Apellido</h1>
          <p className="profile-username">@nombreusuario</p>
          <p className="profile-career">Estudiante de NombreCarrera</p>

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
