import { useEffect, useState } from "react";
import './HorarioForm.css';

const camposIniciales = {
    id_curso: "",
    id_profesor: "",
    dia_semana: "Lunes", // Primer valor del ENUM como por defecto
    hora_inicio: "",
    hora_fin: "",
};

const HorarioForm = ({ recargarHorarios }) => {
    const [formulario, setFormulario] = useState(camposIniciales);
    const [cargando, setCargando] = useState(false);
    
    // Estados para almacenar las listas de las llaves foráneas
    const [cursos, setCursos] = useState([]);
    const [profesores, setProfesores] = useState([]);

    // Cargar cursos y profesores al montar el componente
    useEffect(() => {
        const cargarDatosRelacionales = async () => {
            try {
                const [resCursos, resProfesores] = await Promise.all([
                    fetch("http://127.0.0.1:8000/api/curso"),
                    fetch("http://127.0.0.1:8000/api/profesor")
                ]);
                
                if (resCursos.ok) setCursos(await resCursos.json());
                if (resProfesores.ok) setProfesores(await resProfesores.json());
            } catch (error) {
                console.error("Error cargando dependencias del formulario:", error);
            }
        };

        cargarDatosRelacionales();
    }, []);

    const manejarCambio = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setCargando(true);
        try {
            // Formateamos las horas para agregarle los segundos (:00) que Laravel exige
            const formularioFormateado = {
                ...formulario,
                hora_inicio: formulario.hora_inicio ? `${formulario.hora_inicio}:00` : "",
                hora_fin: formulario.hora_fin ? `${formulario.hora_fin}:00` : ""
            };

            const respuesta = await fetch("http://127.0.0.1:8000/api/horario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formularioFormateado), // Enviamos el objeto con los segundos
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                alert("Horario guardado exitosamente");
                setFormulario(camposIniciales);
                recargarHorarios();
            } else {
                console.error("Errores:", datos.errors);
                alert(`Error al guardar: ${datos.message || "Verifica las restricciones de horario"}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo conectar con el servidor");
        } finally {
            setCargando(false);
        }
    };

    const inputStyle = {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "#fff",
        borderRadius: 10,
        outline: "none",
        transition: "border-color 0.2s",
    };

    const labelStyle = {
        color: "rgba(255,255,255,0.5)",
        fontSize: 13,
        fontWeight: 500,
        marginBottom: 6,
    };

    // Días válidos definidos en tu ENUM de la base de datos
    const diasSemana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

    return (
        <div
            className="rounded-4 overflow-hidden mb-4"
            style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
            }}
        >
            {/* Header */}
            <div
                className="px-4 py-3 d-flex align-items-center gap-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
                <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{ width: 38, height: 38, background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}
                >
                    <i className="fas fa-calendar-plus" style={{ color: "#818cf8", fontSize: 15 }} />
                </div>
                <div>
                    <h5 className="mb-0 fw-bold text-white" style={{ fontSize: "1rem" }}>
                        Registrar Nuevo Horario de Clase
                    </h5>
                    <small className="text-white-50">Asigna cursos, profesores y rangos de horas</small>
                </div>
            </div>

            {/* Body */}
            <div className="p-4">
                <form onSubmit={manejarEnvio}>
                    <div className="row g-3">
                        
                        {/* SELECT DE CURSO */}
                        <div className="col-md-6">
                            <label style={labelStyle}>Curso</label>
                            <div className="input-group">
                                <span className="input-group-text" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(255,255,255,0.1)", borderRight: "none", color: "#818cf8", borderRadius: "10px 0 0 10px" }}>
                                    <i className="fas fa-book" style={{ fontSize: 13 }} />
                                </span>
                                <select
                                    name="id_curso"
                                    value={formulario.id_curso}
                                    onChange={manejarCambio}
                                    required
                                    className="form-select text-white"
                                    style={{ ...inputStyle, borderLeft: "none", borderRadius: "0 10px 10px 0", backgroundColor: "#1a1a2e" }}
                                >
                                    <option value="" disabled style={{ background: "#1a1a2e", color: "rgba(255,255,255,0.5)" }}>
                                        Selecciona un curso
                                    </option>
                                    {cursos.map(curso => (
                                        <option 
                                            key={curso.id_curso} 
                                            value={curso.id_curso} 
                                            style={{ background: "#1a1a2e", color: "#fff" }} // Fondo oscuro y letras blancas
                                        >
                                            {curso.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* SELECT DE PROFESOR */}
                        <div className="col-md-6">
                            <label style={labelStyle}>Profesor</label>
                            <div className="input-group">
                                <span className="input-group-text" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(255,255,255,0.1)", borderRight: "none", color: "#818cf8", borderRadius: "10px 0 0 10px" }}>
                                    <i className="fas fa-chalkboard-teacher" style={{ fontSize: 13 }} />
                                </span>
                                <select
                                    name="id_profesor"
                                    value={formulario.id_profesor}
                                    onChange={manejarCambio}
                                    required
                                    className="form-select text-white"
                                    style={{ ...inputStyle, borderLeft: "none", borderRadius: "0 10px 10px 0", backgroundColor: "#1a1a2e" }}
                                >
                                    <option value="" disabled style={{ background: "#1a1a2e", color: "rgba(255,255,255,0.5)" }}>
                                        Selecciona un profesor
                                    </option>
                                    {profesores.map(prof => (
                                        <option 
                                            key={prof.id_profesor} 
                                            value={prof.id_profesor} 
                                            style={{ background: "#1a1a2e", color: "#fff" }} // Fondo oscuro y letras blancas
                                        >
                                            {prof.nombre} {prof.apellidos}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* SELECT DE DÍA DE LA SEMANA */}
                        <div className="col-md-4">
                            <label style={labelStyle}>Día de la Semana</label>
                            <div className="input-group">
                                <span className="input-group-text" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(255,255,255,0.1)", borderRight: "none", color: "#818cf8", borderRadius: "10px 0 0 10px" }}>
                                    <i className="fas fa-calendar-day" style={{ fontSize: 13 }} />
                                </span>
                                <select
                                    name="dia_semana"
                                    value={formulario.dia_semana}
                                    onChange={manejarCambio}
                                    required
                                    className="form-select text-white"
                                    style={{ ...inputStyle, borderLeft: "none", borderRadius: "0 10px 10px 0", backgroundColor: "#1a1a2e" }}
                                >
                                    {diasSemana.map(dia => (
                                        <option 
                                            key={dia} 
                                            value={dia} 
                                            style={{ background: "#1a1a2e", color: "#fff" }} // Fondo oscuro y letras blancas
                                        >
                                            {dia}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* HORA INICIO */}
                        <div className="col-md-4">
                            <label style={labelStyle}>Hora de Inicio</label>
                            <div className="input-group">
                                <span className="input-group-text" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(255,255,255,0.1)", borderRight: "none", color: "#818cf8", borderRadius: "10px 0 0 10px" }}>
                                    <i className="fas fa-clock" style={{ fontSize: 13 }} />
                                </span>
                                <input
                                    type="time"
                                    name="hora_inicio"
                                    value={formulario.hora_inicio}
                                    onChange={manejarCambio}
                                    required
                                    className="form-control"
                                    style={{ ...inputStyle, borderLeft: "none", borderRadius: "0 10px 10px 0" }}
                                    onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.5)"}
                                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                                />
                            </div>
                        </div>

                        {/* HORA FIN */}
                        <div className="col-md-4">
                            <label style={labelStyle}>Hora de Fin</label>
                            <div className="input-group">
                                <span className="input-group-text" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(255,255,255,0.1)", borderRight: "none", color: "#818cf8", borderRadius: "10px 0 0 10px" }}>
                                    <i className="fas fa-hourglass-end" style={{ fontSize: 13 }} />
                                </span>
                                <input
                                    type="time"
                                    name="hora_fin"
                                    value={formulario.hora_fin}
                                    onChange={manejarCambio}
                                    required
                                    className="form-control"
                                    style={{ ...inputStyle, borderLeft: "none", borderRadius: "0 10px 10px 0" }}
                                    onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.5)"}
                                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                                />
                            </div>
                        </div>

                    </div>

                    {/* Botón submit */}
                    <div className="text-end mt-4">
                        <button
                            type="submit"
                            disabled={cargando}
                            className="btn px-5"
                            style={{
                                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                                border: "none",
                                color: "#fff",
                                borderRadius: 10,
                                fontWeight: 600,
                                padding: "10px 32px",
                                boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
                            }}
                        >
                            {cargando ? (
                                <><span className="spinner-border spinner-border-sm me-2" />Guardando...</>
                            ) : (
                                <><i className="fas fa-save me-2" />Guardar Horario</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HorarioForm;