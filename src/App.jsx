import { useState, useEffect } from "react";
import Lista from "./Lista";
import Overlay from "./components/Overlay";
import Confirmar from "./components/Confirmar";
import GenerarId from "./helpers/GenerarId";
import FormatearFecha from "./helpers/FormatearFecha";
import "./App.css";

const body = document.querySelector("body")

function App() {
    //=============== objecto de presentacion ===============
    const presentacion = {
        titulo: "Comienza agregando notas",
        descripcion: "Click en agregar nueva nota y comience agregandolos. En la parte inferior tiene opciones de editar y eliminar sus notas. espero lo disfrute.",
        id: GenerarId(),
        fecha: FormatearFecha(new Date()),
    };
    //=============== useState globales ===============
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [notas, setNotas] = useState([]);
    const [notaEditar, setNotaEditar] = useState({});
    const [overlay, setOverlay] = useState(false);
    const [eliminar, setEliminar] = useState("");
    const [modoEdicion, setModoEdicion] = useState(false);


    useEffect(() => {
      //=============== si el storage esta vacio insetar la presentacion o las notas ===============
        const getNotas = JSON.parse(localStorage.getItem("notas-v1-react")) || [presentacion]
        setNotas(getNotas);
    }, []);

    useEffect(() => {
      //=============== si las notas es mayor a 0 se guardan el el storage===============
          if (notas.length > 0) {
            localStorage.setItem("notas-v1-react", JSON.stringify(notas));
          } 
    }, [notas]);


    //=============== editar nota ===============
    const IdEditar = (id) => {
        const nota = notas.filter((notaState) => notaState.id === id)[0];
        setNotaEditar(nota);
        setModoEdicion(true);
        setOverlay(true);
    };
    //=============== eliminar nota evento ===============
    const IdEliminar = (id) => {
        setEliminar(id);
    };

    //=============== body hidden ===============
    if (overlay || eliminar) {
        body.style.overflow = "hidden";
    } else {
        body.style.overflow = "auto";
    }
    
    return (
        <>
            <main className="contenedor">
                <Lista
                    setOverlay={setOverlay}
                    notas={notas}
                    IdEditar={IdEditar}
                    IdEliminar={IdEliminar}
                    setTitulo={setTitulo}
                    setDescripcion={setDescripcion}
                    setModoEdicion={setModoEdicion}
                />
                {overlay && (
                    <Overlay
                        overlay={overlay}
                        setOverlay={setOverlay}
                        notas={notas}
                        setNotas={setNotas}
                        modoEdicion={modoEdicion}
                        setModoEdicion={setModoEdicion}
                        notaEditar={notaEditar}
                        titulo={titulo}
                        setTitulo={setTitulo}
                        descripcion={descripcion}
                        setDescripcion={setDescripcion}
                    />
                )}
                {eliminar && (
                    <Confirmar
                        eliminar={eliminar}
                        setEliminar={setEliminar}
                        notas={notas}
                        setNotas={setNotas}
                        presentacion={presentacion}
                    />
                )}
            </main>
        </>
    );
}

export default App;
