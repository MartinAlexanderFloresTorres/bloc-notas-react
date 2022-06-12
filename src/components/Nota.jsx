function Nota({ nota, IdEditar, IdEliminar }) {
    const { titulo, descripcion, id, fecha } = nota;

    //=============== onclick para id la funcion ===============
    const handleEditar = (idNota) => {
        IdEditar(idNota);
    };
    //=============== onclick eliminar para el id a la funcion ===============
    const handleEliminar = (id) => {
        IdEliminar(id);
    };
    return (
        <div className="nota">
            <div className="nota__informacion">
                <h2 className="nota__titulo">{titulo}</h2>
                <div className="nota__descripcion">{descripcion}</div>
            </div>
            <div className="nota__info">
                <p className="note__fecha">{fecha}</p>
                <div className="nota__opciones">
                    <i className="bx bx-dots-horizontal-rounded icono" />
                    <div className="nota__animacion">
                        <div className="nota__botones">
                            <button
                                onClick={() => handleEditar(id)}
                                className="nota__boton editar"
                            >
                                <i className="bx bx-pencil i" />
                                Editar
                            </button>
                            <button
                                onClick={() => handleEliminar(id)}
                                className="nota__boton eliminar"
                            >
                                <i className="bx bx-trash-alt i" />
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Nota;
