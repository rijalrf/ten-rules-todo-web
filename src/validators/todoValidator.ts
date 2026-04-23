/**
 * Validasi untuk input Todo
 * @param title - Judul tugas
 * @returns string | null - Mengembalikan pesan error jika tidak valid, atau null jika valid
 */
export const validateTodoTitle = (title: string): string | null => {
  const trimmedTitle = title.trim();
  
  if (!trimmedTitle) {
    return "Judul tugas wajib diisi.";
  }
  
  if (trimmedTitle.length < 5) {
    return "Judul tugas terlalu pendek, minimal 5 karakter.";
  }
  
  if (trimmedTitle.length > 200) {
    return "Judul tugas terlalu panjang, maksimal 200 karakter.";
  }
  
  return null;
};
