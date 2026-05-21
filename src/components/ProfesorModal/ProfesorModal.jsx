import { useEffect, useState } from "react";

const camposVacios = {
    id_profesor: "",
    nombre: "",
    apellidos: "",
    dni: "",
    telefono: "",
    email: "",
    especialidad: "",
};

const ProfesorModal = ({ mostrarModal, cerrarModal, profesorSeleccionado, recargarProfesores }) => {

    const [formulario, setFormulario] = useState(camposVacios);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        if (profesorSeleccionado) {
            setFormulario({
                id_profesor:  profesorSeleccionado.id_profesor  || "",
                nombre:       profesorSeleccionado.nombre       || "",
                apellidos:    profesorSeleccionado.apellidos    || "",
                dni:          profesorSeleccionado.dni          || "",
                telefono:     profesorSeleccionado.telefono     || "",
                email:        profesorSeleccionado.email        || "",
                especialidad: profesorSeleccionado.especialidad || "",
            });
        }
    }, [profesorSeleccionado]);

    const manejarCambio = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
    };

    const editarProfesor = async (e) => {
        e.preventDefault();
        setCargando(true);
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/profesor/${formulario.id_profesor}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(formulario),
                }
            );

            if (response.ok) {
                alert("Profesor actualizado con éxito");
                recargarProfesores();
                cerrarModal();
            } else {
                const errorData = await response.json();
                console.error("Errores de validación:", errorData);
                alert(`Error al actualizar: ${errorData.message || "Verifica los campos"}`);
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

    const campos = [
        { name: "nombre",       label: "Nombres",         type: "text",  icon: "fa-user",              col: "col-md-6", maxLength: 255 },
        { name: "apellidos",    label: "Apellidos",        type: "text",  icon: "fa-id-card",           col: "col-md-6", maxLength: 255 },
        { name: "dni",          label: "DNI (8 dígitos)",  type: "text",  icon: "fa-fingerprint",       col: "col-md-4", maxLength: 8   },
        { name: "telefono",     label: "Teléfono",          type: "text",  icon: "fa-phone",             col: "col-md-4", maxLength: 9  },
        { name: "email",        label: "Email",             type: "email", icon: "fa-envelope",          col: "col-md-4", maxLength: 255 },
        { name: "especialidad", label: "Especialidad",      type: "text",  icon: "fa-chalkboard-teacher",col: "col-md-12",maxLength: 255 },
    ];

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
                                <i className="fas fa-user-edit" style={{ color: "#818cf8", fontSize: 16 }} />
                            </div>
                            <div>
                                <h5 className="modal-title fw-bold text-white mb-0" style={{ fontSize: "1rem" }}>
                                    Editar Profesor
                                </h5>
                                <small className="text-white-50">
                                    {formulario.nombre} {formulario.apellidos}
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
                        <form onSubmit={editarProfesor}>
                            <div className="row g-3">
                                {campos.map(({ name, label, type, icon, col, maxLength }) => (
                                    <div className={col} key={name}>
                                        <label
                                            className="form-label"
                                            style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 500 }}
                                        >
                                            {label}
                                        </label>
                                        <div className="input-group">
                                            <span
                                                className="input-group-text"
                                                style={{
                                                    background: "rgba(99,102,241,0.1)",
                                                    border: "1px solid rgba(255,255,255,0.1)",
                                                    borderRight: "none",
                                                    color: "#818cf8",
                                                    borderRadius: "10px 0 0 10px",
                                                }}
                                            >
                                                <i className={`fas ${icon}`} style={{ fontSize: 12 }} />
                                            </span>
                                            <input
                                                type={type}
                                                name={name}
                                                value={formulario[name]}
                                                onChange={manejarCambio}
                                                maxLength={maxLength}
                                                required
                                                className="form-control"
                                                style={{
                                                    ...inputStyle,
                                                    borderLeft: "none",
                                                    borderRadius: "0 10px 10px 0",
                                                }}
                                                onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.5)"}
                                                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                                            />
                                        </div>
                                    </div>
                                ))}
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
                                    {cargando
                                        ? <><span className="spinner-border spinner-border-sm me-2" />Guardando...</>
                                        : <><i className="fas fa-save me-2" />Guardar Cambios</>
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfesorModal;