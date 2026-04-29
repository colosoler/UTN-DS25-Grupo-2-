import { getUserLevel } from '../Helpers/levels';
import './styles/LevelBadge.css';

export const LevelBadge = ({ points, className = '' }) => {
  const userLevel = getUserLevel(points);
  const safePoints = points || 0;

  return (
    <span
      className={`level-badge ${className}`}
      title={`${safePoints} puntos totales`}
      style={{ '--level-color': userLevel.hex }}
    >
      <span className="level-badge-dot" aria-hidden="true" />
      <span className="level-badge-name">{userLevel.name}</span>
    </span>
  );
};
