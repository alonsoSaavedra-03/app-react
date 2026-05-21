import { useEffect, useState } from "react";
import axios from "axios";

import HorarioCard from "../../HorarioCard/HorarioCard";
import HorarioForm from "../../HorarioForm/HorarioForm";
import HorarioModal from "../../HorarioModal/HorarioModal";

const Horarios = () => {

    const [horarios, setHorarios] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

    const obtenerHorarios = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/horario");
            setHorarios(response.data);
        } catch (error) {
            console.error("Error al obtener horarios:", error);
        }
    };

    const abrirModalEditar = (horario) => {
        setHorarioSeleccionado(horario);
        setMostrarModal(true);
    };

    const cerrarModalEditar = () => {
        setHorarioSeleccionado(null);
        setMostrarModal(false);
    };

    useEffect(() => {
        obtenerHorarios();
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
                            Horarios
                        </h2>
                        <p className="text-white-50 mb-0">
                            Planifica, edita y gestiona las horas de clase y asignaciones
                        </p>
                    </div>

                    {/* Formulario de registro */}
                    <HorarioForm recargarHorarios={obtenerHorarios} />

                    {/* Título listado */}
                    <div className="d-flex align-items-center gap-3 mb-4 mt-5">
                        <span style={{ width: 4, height: 28, background: "#6366f1", borderRadius: 4, display: "inline-block" }} />
                        <h3 className="mb-0 fw-bold" style={{ fontSize: "1.3rem" }}>
                            Listado de Horarios
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
                            {horarios.length} registrados
                        </span>
                    </div>

                    {/* Grid de cards */}
                    <div 
                        className="table-responsive rounded-4" 
                        style={{ 
                            background: "rgba(255, 255, 255, 0.02)", 
                            border: "1px solid rgba(255, 255, 255, 0.06)",
                            backdropFilter: "blur(12px)"
                        }}
                    >
                        <table className="table table-dark table-hover mb-0" style={{ background: "transparent" }}>
                            <thead>
                                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)" }}>
                                    <th scope="col" className="text-white-50 p-3" style={{ fontSize: 13, fontWeight: 600 }}>ID</th>
                                    <th scope="col" className="text-white-50 p-3" style={{ fontSize: 13, fontWeight: 600 }}>DÍA</th>
                                    <th scope="col" className="text-white-50 p-3" style={{ fontSize: 13, fontWeight: 600 }}>BLOQUE HORARIO</th>
                                    <th scope="col" className="text-white-50 p-3" style={{ fontSize: 13, fontWeight: 600 }}>CURSO</th>
                                    <th scope="col" className="text-white-50 p-3" style={{ fontSize: 13, fontWeight: 600 }}>PROFESOR</th>
                                    <th scope="col" className="text-white-50 p-3 text-end" style={{ fontSize: 13, fontWeight: 600 }}>ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {horarios.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-5 text-white-50">
                                            <i className="fas fa-calendar-alt fa-2x mb-2 d-block opacity-25" />
                                            No hay horarios registrados aún.
                                        </td>
                                    </tr>
                                ) : (
                                    horarios.map((horario) => (
                                        <HorarioCard
                                            key={horario.id_horario}
                                            horario={horario}
                                            abrirModal={() => abrirModalEditar(horario)}
                                            recargarHorarios={obtenerHorarios}
                                        />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Modal de edición */}
                    <HorarioModal
                        mostrarModal={mostrarModal}
                        cerrarModal={cerrarModalEditar}
                        horarioSeleccionado={horarioSeleccionado}
                        recargarHorarios={obtenerHorarios}
                    />

                </div>
            </div>
        </>
    );
};

export default Horarios;