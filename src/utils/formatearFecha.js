export const formatearFecha = (date) => {
    if (!date) return null;

    const pad = (n) => (n < 10 ? "0" + n : n);

    const dia = pad(date.getDate());
    const mes = pad(date.getMonth() + 1);
    const año = date.getFullYear();
    const horas = pad(date.getHours());
    const minutos = pad(date.getMinutes());

    return `${dia}-${mes}-${año} ${horas}:${minutos}`;
};