// Formateador Dinero
const formatCurrency = (value) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(value);

// Año Actual
const actualYear = new Date().getFullYear();

// Formateador de fechas
const formatDate = (date) => {
  const formateada = new Date(date).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return formateada;
};

// Redirección por rol
const redirectByRole = (user) => {
  if (!user) return "/login";

  const role = String(user.role || user.rol || "").toLowerCase();

  if (role === "admin" || role === "1") return "/admin";
  if (role === "tutor" || role === "2") return "/home";

  console.warn("ROL NO RECONOCIDO:", role);

  return "/login";
};

export { formatCurrency, actualYear, formatDate, redirectByRole };
