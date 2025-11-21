export const medidorList = ['1','2','3','4','5','6','7','8','9','10'];

export const TipoMedida = Object.freeze({
    KILOWATTS: "KiloWatts",
    WATTS: "Watts",
    TEMPERATURA: "Temperatura",
});

export const tipoMedidaList = [
    { nombre: TipoMedida.KILOWATTS, abreviatura: "kW" },
    { nombre: TipoMedida.WATTS, abreviatura: "W" },
    { nombre: TipoMedida.TEMPERATURA, abreviatura: "°C" },
];