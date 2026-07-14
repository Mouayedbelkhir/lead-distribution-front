import dayjs from "dayjs";

export const formatDate = (value, format = "DD MMM YYYY") =>
  value ? dayjs(value).format(format) : "-";

export const formatDateTime = (value) =>
  value ? dayjs(value).format("DD MMM YYYY, HH:mm") : "-";

export const formatCurrency = (value) => {
  const number = Number(value);
  if (Number.isNaN(number)) return "-";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(number);
};
