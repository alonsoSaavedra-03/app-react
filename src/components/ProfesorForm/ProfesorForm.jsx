import { useState } from "react";

const camposIniciales = {
    nombre: "",
    apellidos: "",
    dni: "",
    telefono: "",
    email: "",
    especialidad: "",
};

const ProfesorForm = ({ recargarProfesores }) => {

    const [formulario, setFormulario] = useState(camposIniciales);
    const [cargando, setCargando] = useState(false);

    const manejarCambio = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setCargando(true);
        try {
            const respuesta = await fetch("http://127.0.0.1:8000/api/profesor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formulario),
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                alert("Profesor guardado exitosamente");
                setFormulario(camposIniciales);
                recargarProfesores();
            } else {
                console.error("Errores:", datos.errors);
                alert(`Error al guardar: ${datos.message || "Verifica los campos"}`);
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

    const campos = [
        { name: "nombre",       label: "Nombres",       type: "text",  icon: "fa-user",             col: "col-md-6", maxLength: 255 },
        { name: "apellidos",    label: "Apellidos",      type: "text",  icon: "fa-id-card",          col: "col-md-6", maxLength: 255 },
        { name: "dni",          label: "DNI (8 dígitos)",type: "text",  icon: "fa-fingerprint",      col: "col-md-4", maxLength: 8   },
        { name: "telefono",     label: "Teléfono",       type: "text",  icon: "fa-phone",            col: "col-md-4", maxLength: 9  },
        { name: "email",        label: "Email",          type: "email", icon: "fa-envelope",         col: "col-md-4", maxLength: 255 },
        { name: "especialidad", label: "Especialidad",   type: "text",  icon: "fa-chalkboard-teacher",col: "col-md-12",maxLength: 255 },
    ];

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
                    <i className="fas fa-user-plus" style={{ color: "#818cf8", fontSize: 15 }} />
                </div>
                <div>
                    <h5 className="mb-0 fw-bold text-white" style={{ fontSize: "1rem" }}>
                        Registrar Nuevo Profesor
                    </h5>
                    <small className="text-white-50">Completa todos los campos requeridos</small>
                </div>
            </div>

            {/* Body */}
            <div className="p-4">
                <form onSubmit={manejarEnvio}>
                    <div className="row g-3">
                        {campos.map(({ name, label, type, icon, col, maxLength }) => (
                            <div className={col} key={name}>
                                <label style={labelStyle}>{label}</label>
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
                                        <i className={`fas ${icon}`} style={{ fontSize: 13 }} />
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
                            {cargando
                                ? <><span className="spinner-border spinner-border-sm me-2" />Guardando...</>
                                : <><i className="fas fa-save me-2" />Guardar Profesor</>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfesorForm;