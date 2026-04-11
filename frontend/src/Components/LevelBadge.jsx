import { getUserLevel } from '../Helpers/levels';

export const LevelBadge = ({ points, className = '' }) => {
  const userLevel = getUserLevel(points);

  return (
    <span 
      className={`badge border ${userLevel.textClass} ${className}`}
      title={`${points || 0} puntos totales`}
      style={{ 
        backgroundColor: userLevel.hex,
        fontSize: '0.85em', 
        verticalAlign: 'middle',
        boxShadow: userLevel.name === 'UTNascar' ? '0 0 12px rgba(255, 232, 0, 0.8)' : 'none',
        marginBottom: '10px'
      }}
    >
      <span className="me-1">{userLevel.icon}</span> 
      {userLevel.name}
    </span>
  );
};