import { useEffect, useState } from "react";

const camposVacios = {
    id_horario: "",
    id_curso: "",
    id_profesor: "",
    dia_semana: "Lunes",
    hora_inicio: "",
    hora_fin: "",
};

const HorarioModal = ({ mostrarModal, cerrarModal, horarioSeleccionado, recargarHorarios }) => {
    const [formulario, setFormulario] = useState(camposVacios);
    const [cargando, setCargando] = useState(false);

    // Estados para poblar las llaves foráneas en los selects
    const [cursos, setCursos] = useState([]);
    const [profesores, setProfesores] = useState([]);

    // 1. CARGAR CURSOS Y PROFESORES AL ENTRAR SI EL MODAL ESTÁ ACTIVO
    useEffect(() => {
        if (!mostrarModal) return;

        const cargarDependencias = async () => {
            try {
                const [resCursos, resProfesores] = await Promise.all([
                    fetch("http://127.0.0.1:8000/api/curso"),
                    fetch("http://127.0.0.1:8000/api/profesor")
                ]);
                
                if (resCursos.ok) setCursos(await resCursos.json());
                if (resProfesores.ok) setProfesores(await resProfesores.json());
            } catch (error) {
                console.error("Error cargando listas relacionales en el modal:", error);
            }
        };

        cargarDependencias();
    }, [mostrarModal]);

    // 2. RELLENAR EL FORMULARIO CUANDO SE SELECCIONA UN HORARIO PARA EDITAR
    useEffect(() => {
        if (horarioSeleccionado) {
            setFormulario({
                id_horario: horarioSeleccionado.id_horario || "",
                id_curso: horarioSeleccionado.id_curso || "",
                id_profesor: horarioSeleccionado.id_profesor || "",
                dia_semana: horarioSeleccionado.dia_semana || "Lunes",
                // Cortamos los segundos (:00) si vienen incluidos desde el servidor para que el input type="time" los acepte
                hora_inicio: horarioSeleccionado.hora_inicio ? horarioSeleccionado.hora_inicio.substring(0, 5) : "",
                hora_fin: horarioSeleccionado.hora_fin ? horarioSeleccionado.hora_fin.substring(0, 5) : "",
            });
        }
    }, [horarioSeleccionado]);

    const manejarCambio = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
    };

    // 3. ENVIAR LA PETICIÓN PUT A LARAVEL
    const editarHorario = async (e) => {
        e.preventDefault();
        setCargando(true);
        try {
            // También parchamos las horas aquí agregando los segundos
            const formularioFormateado = {
                ...formulario,
                hora_inicio: formulario.hora_inicio ? `${formulario.hora_inicio}:00` : "",
                hora_fin: formulario.hora_fin ? `${formulario.hora_fin}:00` : ""
            };

            const response = await fetch(
                `http://127.0.0.1:8000/api/horario/${formulario.id_horario}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(formularioFormateado), // Enviamos el corregido
                }
            );

            if (response.ok) {
                alert("Horario actualizado con éxito");
                recargarHorarios();
                cerrarModal();
            } else {
                const errorData = await response.json();
                console.error("Errores de validación:", errorData);
                alert(`Error al actualizar: ${errorData.message || "Verifica los datos del bloque horario"}`);
            }
        } catch (error) {
            console.error("Error en la conexión:", error);
            alert("Ocurrió un error en el servidor");
        } finally {
            setCargando(false);
        }
    };

    if (!mostrarModal) return null;

    const inputStyle = {
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "#fff",
        borderRadius: 10,
    };

    const labelStyle = { 
        color: "rgba(255,255,255,0.5)", 
        fontSize: 13, 
        fontWeight: 500 
    };

    const diasSemana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

    return (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) cerrarModal(); }}
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div
                    className="modal-content border-0 overflow-hidden"
                    style={{
                        background: "linear-gradient(160deg, #151929 0%, #0f1422 100%)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 20,
                        boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.15)"
                    }}
                >
                    {/* Línea de acento superior */}
                    <div style={{ height: 3, background: "linear-gradient(90deg, #6366f1, #4f46e5, transparent)" }} />

                    {/* HEADER */}
                    <div
                        className="modal-header px-4 py-3"
                        style={{ border: "none", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                    >
                        <div className="d-flex align-items-center gap-3">
                            <div
                                className="rounded-3 d-flex align-items-center justify-content-center"
                                style={{
                                    width: 40, height: 40,
                                    background: "rgba(99,102,241,0.15)",
                                    border: "1px solid rgba(99,102,241,0.3)"
                                }}
                            >
                                <i className="fas fa-calendar-alt" style={{ color: "#818cf8", fontSize: 16 }} />
                            </div>
                            <div>
                                <h5 className="modal-title fw-bold text-white mb-0" style={{ fontSize: "1rem" }}>
                                    Editar Bloque de Horario
                                </h5>
                                <small className="text-white-50">
                                    Modificando el registro #{formulario.id_horario}
                                </small>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={cerrarModal}
                        />
                    </div>

                    {/* BODY */}
                    <div className="modal-body p-4">
                        <form onSubmit={editarHorario}>
                            <div className="row g-3">
                                
                                {/* SELECT CURSO */}
                                <div className="col-md-6">
                                    <label className="form-label" style={labelStyle}>Curso</label>
                                    <div className="input-group">
                                        <span className="input-group-text" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(255,255,255,0.1)", borderRight: "none", color: "#818cf8", borderRadius: "10px 0 0 10px" }}>
                                            <i className="fas fa-book" style={{ fontSize: 12 }} />
                                        </span>
                                        <select
                                            name="id_curso"
                                            value={formulario.id_curso}
                                            onChange={manejarCambio}
                                            required
                                            className="form-select text-white"
                                            style={{ ...inputStyle, borderLeft: "none", borderRadius: "0 10px 10px 0", backgroundColor: "#151929" }}
                                        >
                                            <option value="" disabled>Selecciona un curso</option>
                                            {cursos.map(c => (
                                                <option key={c.id_curso} value={c.id_curso} className="text-dark">{c.nombre}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* SELECT PROFESOR */}
                                <div className="col-md-6">
                                    <label className="form-label" style={labelStyle}>Profesor</label>
                                    <div className="input-group">
                                        <span className="input-group-text" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(255,255,255,0.1)", borderRight: "none", color: "#818cf8", borderRadius: "10px 0 0 10px" }}>
                                            <i className="fas fa-chalkboard-teacher" style={{ fontSize: 12 }} />
                                        </span>
                                        <select
                                            name="id_profesor"
                                            value={formulario.id_profesor}
                                            onChange={manejarCambio}
                                            required
                                            className="form-select text-white"
                                            style={{ ...inputStyle, borderLeft: "none", borderRadius: "0 10px 10px 0", backgroundColor: "#151929" }}
                                        >
                                            <option value="" disabled>Selecciona un profesor</option>
                                            {profesores.map(p => (
                                                <option key={p.id_profesor} value={p.id_profesor} className="text-dark">{p.nombre} {p.apellidos}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* SELECT DÍA DE LA SEMANA */}
                                <div className="col-md-4">
                                    <label className="form-label" style={labelStyle}>Día de la Semana</label>
                                    <div className="input-group">
                                        <span className="input-group-text" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(255,255,255,0.1)", borderRight: "none", color: "#818cf8", borderRadius: "10px 0 0 10px" }}>
                                            <i className="fas fa-calendar-day" style={{ fontSize: 12 }} />
                                        </span>
                                        <select
                                            name="dia_semana"
                                            value={formulario.dia_semana}
                                            onChange={manejarCambio}
                                            required
                                            className="form-select text-white"
                                            style={{ ...inputStyle, borderLeft: "none", borderRadius: "0 10px 10px 0", backgroundColor: "#151929" }}
                                        >
                                            {diasSemana.map(dia => (
                                                <option key={dia} value={dia} className="text-dark">{dia}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* HORA INICIO */}
                                <div className="col-md-4">
                                    <label className="form-label" style={labelStyle}>Hora de Inicio</label>
                                    <div className="input-group">
                                        <span className="input-group-text" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(255,255,255,0.1)", borderRight: "none", color: "#818cf8", borderRadius: "10px 0 0 10px" }}>
                                            <i className="fas fa-clock" style={{ fontSize: 12 }} />
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
                                    <label className="form-label" style={labelStyle}>Hora de Fin</label>
                                    <div className="input-group">
                                        <span className="input-group-text" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(255,255,255,0.1)", borderRight: "none", color: "#818cf8", borderRadius: "10px 0 0 10px" }}>
                                            <i className="fas fa-hourglass-end" style={{ fontSize: 12 }} />
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

                            {/* BOTONES */}
                            <div className="d-flex justify-content-end gap-3 mt-4">
                                <button
                                    type="button"
                                    className="btn px-4"
                                    onClick={cerrarModal}
                                    style={{
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        color: "rgba(255,255,255,0.6)",
                                        borderRadius: 10
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={cargando}
                                    className="btn px-4"
                                    style={{
                                        background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                                        border: "none",
                                        color: "#fff",
                                        borderRadius: 10,
                                        fontWeight: 600,
                                        boxShadow: "0 4px 15px rgba(99,102,241,0.35)",
                                    }}
                                >
                                    {cargando ? (
                                        <><span className="spinner-border spinner-border-sm me-2" />Guardando...</>
                                    ) : (
                                        <><i className="fas fa-save me-2" />Guardar Cambios</>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HorarioModal;