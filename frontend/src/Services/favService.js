import { getToken } from "../Helpers/auth";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchFavoriteStatus = async (materialId) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/favoritos/${materialId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al obtener estado de favorito");
  return res.json();
};

export const toggleFavorite = async (materialId) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/favoritos/${materialId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al cambiar favorito");
  return res.json();
};
