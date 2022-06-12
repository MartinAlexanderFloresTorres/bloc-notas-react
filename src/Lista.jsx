import Nota from "./components/Nota";

function Lista({ setOverlay, notas, IdEditar, IdEliminar }) {
    //=============== onclick muestra el overlay ===============
    const handleAgregar = () => {
        setOverlay(true);
    };

    //=============== retornar array de react ===============
    const mostrar = notas.map((nota) => {
        return (
            <Nota
                key={nota.id}
                nota={nota}
                IdEditar={IdEditar}
                IdEliminar={IdEliminar}
            />
        );
    });

    return (
        <section className="lista">
            <div className="new" onClick={handleAgregar}>
                <div className="new__plus">
                    <i className="bx bx-plus i" />
                </div>
                <p className="new__texto">Agregar nueva nota</p>
            </div>
            {notas && mostrar}
        </section>
    );
}
export default Lista;
