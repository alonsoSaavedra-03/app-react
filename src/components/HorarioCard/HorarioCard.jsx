const HorarioCard = ({ horario, abrirModal, recargarHorarios }) => {
    // Desestructuramos según las columnas de tu migración en MySQL
    const { id_horario, dia_semana, hora_inicio, hora_fin, id_curso, id_profesor } = horario;

    const eliminarHorario = () => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar este bloque de horario (ID: ${id_horario})?`)) {
            fetch(`http://127.0.0.1:8000/api/horario/${id_horario}`, {
                method: "DELETE"
            })
                .then((response) => {
                    if (response.ok) {
                        alert("Horario eliminado exitosamente");
                        recargarHorarios();
                    } else {
                        alert("Error al eliminar el horario");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("Error de conexión al eliminar el horario");
                });
        }
    };

    // Estilo común para celdas con el look oscuro transparente de tu app
    const celdaStyle = {
        padding: "16px 12px",
        verticalAlign: "middle",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        color: "rgba(255, 255, 255, 0.85)"
    };

    // Pequeño formateador para quitar los segundos (08:00:00 -> 08:00) si tu API los devuelve completos
    const formatearHora = (hora) => {
        if (!hora) return "—";
        return hora.substring(0, 5);
    };

    return (
        <tr 
            style={{ 
                background: "transparent",
                transition: "background-color 0.2s" 
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.02)"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
        >
            {/* ID del Horario */}
            <td style={{ ...celdaStyle, fontWeight: "600", color: "#818cf8" }}>
                #{id_horario}
            </td>

            {/* Día de la semana (con badge elegante) */}
            <td style={celdaStyle}>
                <span 
                    className="badge"
                    style={{
                        background: "rgba(99, 102, 241, 0.12)",
                        color: "#818cf8",
                        border: "1px solid rgba(99, 102, 241, 0.25)",
                        padding: "6px 12px",
                        borderRadius: "6px"
                    }}
                >
                    <i className="far fa-calendar-alt me-1.5" /> {dia_semana}
                </span>
            </td>

            {/* Bloque Horario Completo */}
            <td style={{ ...celdaStyle, fontWeight: "500" }}>
                <span className="text-white">{formatearHora(hora_inicio)}</span>
                <span className="text-white-50 mx-2">a</span>
                <span className="text-white">{formatearHora(hora_fin)}</span>
            </td>

            {/* ID / Nombre del Curso */}
            <td style={celdaStyle}>
                <div className="d-flex align-items-center gap-2">
                    <i className="fas fa-book text-muted" style={{ fontSize: 12 }} />
                    {/* Nota: Si tu endpoint devuelve la relación cargada usa horario.curso.nombre, sino dejamos el ID */}
                    <span>{horario.curso?.nombre || `Curso ID: ${id_curso}`}</span>
                </div>
            </td>

            {/* ID / Nombre del Profesor */}
            <td style={celdaStyle}>
                <div className="d-flex align-items-center gap-2">
                    <i className="fas fa-chalkboard-teacher text-muted" style={{ fontSize: 12 }} />
                    {/* Nota: Si tu endpoint devuelve la relación cargada usa horario.profesor.nombre */}
                    <span>
                        {horario.profesor 
                            ? `${horario.profesor.nombre} ${horario.profesor.apellidos}` 
                            : `Profesor ID: ${id_profesor}`
                        }
                    </span>
                </div>
            </td>

            {/* Botones de Acciones en la última celda */}
            <td style={{ ...celdaStyle, textAlign: "right" }}>
                <div className="d-inline-flex gap-2">
                    <button
                        className="btn btn-sm"
                        style={{
                            background: "rgba(99, 102, 241, 0.1)",
                            border: "1px solid rgba(99, 102, 241, 0.3)",
                            color: "#818cf8",
                            borderRadius: 6,
                            padding: "6px 12px"
                        }}
                        onClick={abrirModal}
                    >
                        <i className="fas fa-edit me-1" /> Editar
                    </button>
                    <button
                        className="btn btn-sm"
                        style={{
                            background: "rgba(239, 68, 68, 0.08)",
                            border: "1px solid rgba(239, 68, 68, 0.25)",
                            color: "#f87171",
                            borderRadius: 6,
                            padding: "6px 12px"
                        }}
                        onClick={eliminarHorario}
                    >
                        <i className="fas fa-trash-alt me-1" /> Borrar
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default HorarioCard;