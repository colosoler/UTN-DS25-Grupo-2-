export const validateProfilePicture = (file: File | null) => {
  if (!file) return { valid: true, message: '' };

  const validTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSize = 2 * 1024 * 1024; // 2MB

  if (!validTypes.includes(file.type)) {
    return { valid: false, message: "Formato de imagen no permitido" };
  }

  if (file.size > maxSize) {
    return { valid: false, message: "La imagen no puede superar 2MB" };
  }

  return { valid: true, message: "" };
};
