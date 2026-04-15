// Fungsi helper untuk format tanggal
export const formatDate = (dateString) => {
  if (!dateString) return "-";

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return new Date(dateString).toLocaleDateString("id-ID", options);
};
