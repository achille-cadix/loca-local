export const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
  }).format(new Date(dateString));
};

export const formatTime = (dateString: string) => {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(dateString));
};
  