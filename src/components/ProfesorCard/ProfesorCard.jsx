const ProfesorCard = ({ profesor, abrirModal, recargarProfesores }) => {

    const { id_profesor, nombre, apellidos, especialidad, email, telefono, dni } = profesor;

    const eliminarProfesor = () => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este profesor?")) {
            fetch(`http://127.0.0.1:8000/api/profesor/${id_profesor}`, {
                method: "DELETE"
            })
                .then((response) => {
                    if (response.ok) {
                        alert("Profesor eliminado exitosamente");
                        recargarProfesores();
                    } else {
                        alert("Error al eliminar el profesor");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("Error al eliminar el profesor");
                });
        }
    };

    // Iniciales para el avatar
    const iniciales = `${nombre?.charAt(0) ?? ""}${apellidos?.charAt(0) ?? ""}`.toUpperCase();

    // Color del avatar según las iniciales (variedad visual)
    const colores = [
        { bg: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.4)", text: "#818cf8" },
        { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.35)", text: "#34d399" },
        { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.35)", text: "#fbbf24" },
        { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.35)", text: "#f87171" },
        { bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.35)", text: "#60a5fa" },
    ];
    const color = colores[(id_profesor ?? 0) % colores.length];

    return (
        <div className="col-md-4">
            <div
                className="h-100 rounded-4 overflow-hidden"
                style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    transition: "transform 0.2s, border-color 0.2s",
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = "rgba(99,102,241,0.35)";
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}
            >
                {/* Franja superior de color */}
                <div style={{ height: 4, background: `linear-gradient(90deg, ${color.text}, transparent)` }} />

                <div className="p-4">
                    {/* Avatar + nombre */}
                    <div className="d-flex align-items-center gap-3 mb-4">
                        <div
                            className="rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                            style={{
                                width: 52, height: 52,
                                background: color.bg,
                                border: `1.5px solid ${color.border}`,
                                color: color.text,
                                fontSize: 18,
                                letterSpacing: 1
                            }}
                        >
                            {iniciales}
                        </div>
                        <div className="overflow-hidden">
                            <h6 className="fw-bold mb-0 text-white text-truncate">
                                {nombre} {apellidos}
                            </h6>
                            <span
                                className="small"
                                style={{ color: color.text }}
                            >
                                {especialidad || "Sin especialidad"}
                            </span>
                        </div>
                    </div>

                    {/* Info detalle */}
                    <div
                        className="rounded-3 p-3 mb-4"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <i className="fas fa-envelope" style={{ color: "#818cf8", width: 16, fontSize: 12 }} />
                            <span className="text-white-50 small text-truncate">{email}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <i className="fas fa-phone" style={{ color: "#34d399", width: 16, fontSize: 12 }} />
                            <span className="text-white-50 small">{telefono || "—"}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <i className="fas fa-id-card" style={{ color: "#fbbf24", width: 16, fontSize: 12 }} />
                            <span className="text-white-50 small">{dni}</span>
                        </div>
                    </div>

                    {/* Acciones */}
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-sm flex-grow-1"
                            style={{
                                background: "rgba(99,102,241,0.1)",
                                border: "1px solid rgba(99,102,241,0.3)",
                                color: "#818cf8",
                                borderRadius: 8
                            }}
                            onClick={abrirModal}
                        >
                            <i className="fas fa-edit me-1" /> Editar
                        </button>
                        <button
                            className="btn btn-sm flex-grow-1"
                            style={{
                                background: "rgba(239,68,68,0.08)",
                                border: "1px solid rgba(239,68,68,0.25)",
                                color: "#f87171",
                                borderRadius: 8
                            }}
                            onClick={eliminarProfesor}
                        >
                            <i className="fas fa-trash-alt me-1" /> Borrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfesorCard;