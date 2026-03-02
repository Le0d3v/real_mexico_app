// 💰 Formateador moneda
const formatCurrency = (value) =>
    new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
    }).format(value);

export { formatCurrency };
