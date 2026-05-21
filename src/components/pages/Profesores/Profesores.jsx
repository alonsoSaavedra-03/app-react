import { useEffect, useState } from "react";
import axios from "axios";

import ProfesorCard from "../../ProfesorCard/ProfesorCard";
import ProfesorForm from "../../ProfesorForm/ProfesorForm";
import ProfesorModal from "../../ProfesorModal/ProfesorModal";

const Profesores = () => {

    const [profesores, setProfesores] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [profesorSeleccionado, setProfesorSeleccionado] = useState(null);

    const obtenerProfesores = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/profesor");
            setProfesores(response.data);
        } catch (error) {
            console.error("Error al obtener profesores:", error);
        }
    };

    const abrirModalEditar = (profesor) => {
        setProfesorSeleccionado(profesor);
        setMostrarModal(true);
    };

    const cerrarModalEditar = () => {
        setProfesorSeleccionado(null);
        setMostrarModal(false);
    };

    useEffect(() => {
        obtenerProfesores();
    }, []);

    return (
        <>
            {/* Fondo decorativo */}
            <div
                className="position-fixed top-0 start-0 w-100 h-100"
                style={{
                    background: "linear-gradient(135deg, #0f0f1a 0%, #12182b 60%, #0a1628 100%)",
                    zIndex: -2
                }}
            />
            <div
                className="position-fixed rounded-circle"
                style={{
                    width: 500, height: 500,
                    top: -150, left: -150,
                    background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
                    zIndex: -1
                }}
            />
            <div
                className="position-fixed rounded-circle"
                style={{
                    width: 400, height: 400,
                    bottom: -100, right: -100,
                    background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)",
                    zIndex: -1
                }}
            />

            <div className="text-white py-5 min-vh-100">
                <div className="container">

                    {/* Header de sección */}
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
                            Profesores
                        </h2>
                        <p className="text-white-50 mb-0">
                            Registra, edita y gestiona el cuerpo docente
                        </p>
                    </div>

                    {/* Formulario de registro */}
                    <ProfesorForm recargarProfesores={obtenerProfesores} />

                    {/* Título listado */}
                    <div className="d-flex align-items-center gap-3 mb-4 mt-5">
                        <span style={{ width: 4, height: 28, background: "#6366f1", borderRadius: 4, display: "inline-block" }} />
                        <h3 className="mb-0 fw-bold" style={{ fontSize: "1.3rem" }}>
                            Listado de Profesores
                        </h3>
                        <span
                            className="ms-auto badge"
                            style={{
                                background: "rgba(99,102,241,0.15)",
                                color: "#818cf8",
                                border: "1px solid rgba(99,102,241,0.3)",
                                borderRadius: 20,
                                fontSize: 13
                            }}
                        >
                            {profesores.length} registrados
                        </span>
                    </div>

                    {/* Grid de cards */}
                    <div className="row g-4">
                        {profesores.length === 0 ? (
                            <div className="col-12 text-center py-5 text-white-50">
                                <i className="fas fa-chalkboard-teacher fa-3x mb-3 d-block opacity-25" />
                                No hay profesores registrados aún.
                            </div>
                        ) : (
                            profesores.map((profesor) => (
                                <ProfesorCard
                                    key={profesor.id_profesor}
                                    profesor={profesor}
                                    abrirModal={() => abrirModalEditar(profesor)}
                                    recargarProfesores={obtenerProfesores}
                                />
                            ))
                        )}
                    </div>

                    {/* Modal de edición */}
                    <ProfesorModal
                        mostrarModal={mostrarModal}
                        cerrarModal={cerrarModalEditar}
                        profesorSeleccionado={profesorSeleccionado}
                        recargarProfesores={obtenerProfesores}
                    />

                </div>
            </div>
        </>
    );
};

export default Profesores;