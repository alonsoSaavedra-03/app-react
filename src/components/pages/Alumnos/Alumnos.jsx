import { useEffect, useState } from "react";
import axios from "axios";
import "./Alumnos.css";

import AlumnoCard from "../../AlumnoCard/AlumnoCard";
import AlumnoForm from "../../AlumnoForm/AlumnoForm";
import AlumnoModal from "../../AlumnoModal/AlumnoModal";

const Alumnos = () => {

    // USESTATE PARA ALMACENAR ALUMNOS Y CONTROLAR EL MODAL
    const [alumnos, setAlumnos] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

    // CONEXION CON LARAVEL - OBTENER ALUMNOS
    const obtenerAlumnos = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/alumno"
            );
            setAlumnos(response.data);
        } catch (error) {
            console.error("Error al obtener alumnos:", error);
        }
    };

    // FUNCIONES DEL MODAL
    const abrirModalEditar = (alumno) => {
        setAlumnoSeleccionado(alumno);
        setMostrarModal(true);
    };

    const cerrarModalEditar = () => {
        setAlumnoSeleccionado(null);
        setMostrarModal(false);
    };

    // CARGAR ALUMNOS AL INICIAR COMPONENTE
    useEffect(() => {
        obtenerAlumnos();
    }, []);

    return (
        <>

            
            <div className="position-absolute top-0 start-0 rounded-circle fondo-efecto"></div>
            <div className="position-absolute bottom-0 end-0 rounded-circle sub-fondo-efecto"></div>
            <div className="contenedor-inicio text-white py-5">
                
                <div className="container">
                    <div className="mb-5">
                        <span
                            className="badge px-3 py-2 mb-3 fw-normal"
                            style={{
                                background: "rgba(99,102,241,0.15)",
                                color: "#818cf8",
                                border: "1px solid rgba(99,102,241,0.3)",
                                borderRadius: 8,
                                fontSize: 12,
                                letterSpacing: 2
                            }}
                        >
                            GESTIÓN ACADÉMICA
                        </span>
                        <h2 className="fw-bold mb-1" style={{ fontSize: "2rem" }}>
                            Alumnos
                        </h2>
                        <p className="text-white-50 mb-0">
                            Agrega a nuevos alumnos y gestiona su información de manera sencilla.
                        </p>
                    </div>

                    {/* Formulario para registrar alumnos nuevos */}
                    <AlumnoForm
                        recargarAlumnos={obtenerAlumnos}
                    />

                    {/* Título de la sección */}
                    <h3 className="mb-4 mt-5 fw-bold text-white d-flex align-items-center gap-2">
                        <span className="text-primary">●</span> Listado de Alumnos
                    </h3>

                    <div className="row">

                        {/* Mapeo dinámico de tarjetas */}
                        {alumnos.map((alumno) => (
                            <AlumnoCard
                                key={alumno.id_alumno}
                                nombre={`${alumno.nombre} ${alumno.apellidos}`}
                                estadoInicial={alumno.estado_matricula}
                                imagen={alumno.imagen}
                                id_alumno={alumno.id_alumno}
                                abrirModal={() => abrirModalEditar(alumno)}
                            />
                        ))}

                    </div>

                    {/* Componente del Modal con todas sus propiedades conectadas */}
                    <AlumnoModal 
                        mostrarModal={mostrarModal}
                        cerrarModal={cerrarModalEditar}
                        alumnoSeleccionado={alumnoSeleccionado}
                        recargarAlumnos={obtenerAlumnos}
                    />

                </div>

            </div>
        </>
    );
};

export default Alumnos;