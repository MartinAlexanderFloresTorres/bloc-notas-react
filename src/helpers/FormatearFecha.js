function FormatearFecha(fecha) {
    const fechaFormateada = fecha
    const opciones = {
        year: "numeric",
        month: "long",
        day: "2-digit",
    };
    return fechaFormateada.toLocaleDateString("es-ES", opciones);
}
export default FormatearFecha;