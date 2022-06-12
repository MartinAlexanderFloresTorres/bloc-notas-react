function GenerarId() {
    const fecha = Date.now().toString(36).substr(2)
    const ramdom = Math.random().toString(36).substr(2)
    return fecha + ramdom
}
export default GenerarId