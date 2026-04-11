export const levelsConfig = [
  // De Negro (0) -> Gris -> Bronce -> Oro -> Oro Brillante (15.000+)
  { maxPoints: 49,    name: 'UTNenazo/a',    hex: '#1a1a1a', textClass: 'text-white', icon: '🌱' },
  { maxPoints: 149,   name: 'UTNómada',    hex: '#2d2d2d', textClass: 'text-white', icon: '🎒' },
  { maxPoints: 299,   name: 'UTNavegante', hex: '#404040', textClass: 'text-white', icon: '🧭' },
  { maxPoints: 599,   name: 'UTNotable',   hex: '#59534d', textClass: 'text-white', icon: '📘' },
  { maxPoints: 999,   name: 'UTNexo',      hex: '#736553', textClass: 'text-white', icon: '🔗' },
  { maxPoints: 1499,  name: 'UTNativo/a',    hex: '#8c7658', textClass: 'text-white', icon: '🏛️' },
  { maxPoints: 2499,  name: 'UTNoble',     hex: '#a6885e', textClass: 'text-dark',  icon: '🛡️' },
  { maxPoints: 3999,  name: 'UTNuclear',   hex: '#bf9a63', textClass: 'text-dark',  icon: '⚛️' },
  { maxPoints: 5999,  name: 'UTNeuronal',  hex: '#d9ad69', textClass: 'text-dark',  icon: '🧠' },
  { maxPoints: 9999,  name: 'UTNebulosa',  hex: '#f2bf6e', textClass: 'text-dark',  icon: '🌌' },
  { maxPoints: 14999, name: 'UTNirvana',      hex: '#ffd700', textClass: 'text-dark',  icon: '💥' },
  { maxPoints: Infinity, name: 'UTNascar', hex: '#ffea00', textClass: 'text-dark',  icon: '✨' },
];

export const getUserLevel = (points) => {
  const currentPoints = points || 0;

  return levelsConfig.find(level => currentPoints <= level.maxPoints);
};