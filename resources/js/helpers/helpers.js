// Formateador Dinero
const formatCurrency = (value) =>
    new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
    }).format(value);

const actualYear = new Date().getFullYear();

const formatDate = (date) => {
    const formateada = new Date(date).toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return formateada;
};

export { formatCurrency, actualYear, formatDate };
