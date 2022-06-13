import { useEffect } from "react";
import formatearFecha from "../helpers/FormatearFecha";
import GenerarId from "../helpers/GenerarId";

function Overlay(props) {
    const {
        overlay,
        setOverlay,
        notas,
        setNotas,
        modoEdicion,
        setModoEdicion,
        notaEditar,
        titulo,
        setTitulo,
        descripcion,
        setDescripcion
    } = props;


    //=============== useEfect editar ===============
    useEffect(() => {
        if (modoEdicion) {
            setTitulo(notaEditar.titulo);
            setDescripcion(notaEditar.descripcion);
        }
    }, [notaEditar]);

    //=============== validar formulario ===============
    const handleSubmit = (e) => {
        e.preventDefault();

        //=============== si hay campos vacios ===============
        if (titulo.trim() == "" || descripcion.trim() == "") {
            if (titulo !== titulo.trim()) {
                setTitulo("");
            }
            if (descripcion !== descripcion.trim()) {
                setDescripcion("");
            }
            e.target.classList.add("error");
            setTimeout(() => {
                e.target.classList.remove("error");
            }, 2000);
            return;
        }
        if ([titulo, descripcion].includes("")) {
            e.target.classList.add("error");
            setTimeout(() => {
                e.target.classList.remove("error");
            }, 2000);
            return;
        }

        //=============== si para la validacion ===============
        //=============== crear nota ===============
        const nota = { titulo, descripcion };

        if (modoEdicion) {
            //=============== editar nota ===============
            const notasActualizadas = notas.map((notaState) => {
                if (notaState.id === notaEditar.id) {
                    nota.fecha = notaEditar.fecha;
                    nota.id = notaEditar.id;
                    return nota;
                }
                return notaState;
            });
            setNotas(notasActualizadas);
            setModoEdicion(false);
        } else {
            //=============== agregar nota ===============
            nota.fecha = formatearFecha(new Date());
            nota.id = GenerarId();
            setNotas([...notas, nota]);
            setModoEdicion(false);
        }
        //=============== cerrar el overlay ===============
        const elementoOverlay = e.target.parentElement.parentElement;
        elementoOverlay.classList.add("cerrar");
        setTimeout(() => {
            setOverlay(false);
        }, 300);
    };

    //=============== cerrar el overlay ===============
    const handleOverlay = (e) => {
        if (e.target.classList.contains("overlay")) {
            e.target.classList.add("cerrar")
            setTimeout(() => {
                setOverlay(false);
            }, 300);
        }
    };
    //=============== cerrar el overlay ===============
    const handleCerrar = (e) => {
        const elementoOverlay = e.target.parentElement.parentElement.parentElement
        elementoOverlay.classList.add("cerrar")
        setTimeout(() => {
            setOverlay(false);
        }, 300);
    }
    return (
        <section
            onClick={handleOverlay}
            className={overlay ? "overlay" : "overlay"}
        >
            <div className="formulario">
                <div className="formulario__encabezado">
                    <h2 className="formulario__titulo">
                        {modoEdicion ? "Edita tu nota" : "Agregar nueva nota"}
                    </h2>
                    <i
                        onClick={(e)=>handleCerrar(e)}
                        className="bx bx-x i close"
                    />
                </div>
                <form onSubmit={handleSubmit} className="formulario-form">
                    <div>
                        <label className="form__label" htmlFor="titulo">
                            Titulo
                        </label>
                        <input
                            id="titulo"
                            onInput={(e) => setTitulo(e.target.value)}
                            className="fomr__input"
                            value={titulo}
                            type="text"
                        />
                    </div>

                    <div>
                        <label className="form__label" htmlFor="descripcion">
                            Descripcion
                        </label>
                        <textarea
                            id="descripcion"
                            onInput={(e) => setDescripcion(e.target.value)}
                            value={descripcion}
                            className="fomr__textarea"
                            cols="20"
                            rows="10"
                        />
                    </div>
                    <button
                        className="form__boton"
                        id="btn_agregar"
                        type="submit"
                    >
                        {modoEdicion ? "Guardar Cambios" : "Agregar nota"}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Overlay;
