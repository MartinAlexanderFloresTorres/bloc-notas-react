function Confirmar({ eliminar, setEliminar, notas, setNotas, presentacion }) {
    //=============== cerrar overlay confirmar ===============
    const handleOverlay = (e) => {
        if (e.target.classList.contains("overlay-2")) {
            e.target.classList.add("cerrar");
            setTimeout(() => {
                setEliminar("");
            }, 200);
        }
    };
    //=============== cerrar overlay confirmar ===============
    const handleCerrar = (e) => {
        const elementoOverlay = e.target.parentElement.parentElement.parentElement;
        elementoOverlay.classList.add("cerrar");
        setTimeout(() => {
            setEliminar("");
        }, 200);
    };

    //=============== eliminar nota ===============
    const handleEliminar = (e) => {
        // existe id elimina la nota
        if (eliminar) {
            const notasActualizadas = notas.filter(
                (nota) => nota.id !== eliminar
            );
            setNotas(notasActualizadas);
            const elementoOverlay = e.target.parentElement.parentElement.parentElement;
            elementoOverlay.classList.add("cerrar");
            setTimeout(() => {
                setEliminar("");
            }, 200);
            
            //=============== si el storage esta vacio insetar la presentacion ===============
            if (notas.length == 1) {
                localStorage.setItem("notas-v1-react", JSON.stringify([presentacion]));
            } 
        }
    };

    return (
        <section onClick={(e) => handleOverlay(e)} className="overlay-2">
            <div className="overlay__item">
                <h2 className="overlay__texto">¿Desea eliminar?</h2>
                <div className="overlay__botones">
                    <button
                        onClick={(e) => handleCerrar(e)}
                        className="overlay__cancelar"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={(e) => handleEliminar(e)}
                        className="overlay__eliminar"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Confirmar;
