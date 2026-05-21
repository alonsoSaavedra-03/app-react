import { useEffect, useState } from "react";

const AlumnoModal = ({
    mostrarModal,
    cerrarModal,
    alumnoSeleccionado,
    recargarAlumnos
}) => {

    // 1. Añadimos todos los campos requeridos por la validación de Laravel
    const [formulario, setFormulario] = useState({
        id_alumno: "",
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        fecha_nacimiento: "",
        dni: "",
        direccion: "",
        estado_matricula: "Matriculado" // valor por defecto seguro
    });

    // CARGAR DATOS COMPLETOS AL ABRIR EL MODAL
    useEffect(() => {
        if (alumnoSeleccionado) {
            setFormulario({
                id_alumno: alumnoSeleccionado.id_alumno || "",
                nombre: alumnoSeleccionado.nombre || "",
                apellidos: alumnoSeleccionado.apellidos || "",
                email: alumnoSeleccionado.email || "",
                telefono: alumnoSeleccionado.telefono || "",
                fecha_nacimiento: alumnoSeleccionado.fecha_nacimiento || "",
                dni: alumnoSeleccionado.dni || "",
                direccion: alumnoSeleccionado.direccion || "",
                estado_matricula: alumnoSeleccionado.estado_matricula || "Matriculado"
            });
        }
    }, [alumnoSeleccionado]);

    // CAMBIAR INPUTS
    const manejarCambio = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    // ENVIAR ACTUALIZACIÓN
    const editarAlumno = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/alumno/${formulario.id_alumno}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json" // Esto ayuda a ver si Laravel responde con errores de validación
                    },
                    body: JSON.stringify(formulario)
                }
            );

            if (response.ok) {
                alert('Alumno actualizado con éxito');
                window.location.reload();
                cerrarModal();
            } else {
                // Si la validación falla, este bloque te mostrará en consola qué campos faltan o están mal
                const errorData = await response.json();
                console.error("Errores de validación de Laravel:", errorData);
                alert(`Error al actualizar: ${errorData.message || 'Verifica los campos obligatorios'}`);
            }

        } catch (error) {
            console.error("Error en la conexión del servidor:", error);
            alert('Ocurrió un error en el servidor');
        }
    };

    if (!mostrarModal) return null;

    return (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content bg-dark text-white border-0 rounded-4">

                    {/* HEADER */}
                    <div className="modal-header border-secondary">
                        <h4 className="modal-title fw-bold">Editar Alumno</h4>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={cerrarModal}
                        ></button>
                    </div>

                    {/* BODY */}
                    <div className="modal-body p-4">
                        <form onSubmit={editarAlumno}>
                            <div className="row g-4">
                                
                                {/* NOMBRE */}
                                <div className="col-md-6">
                                    <label className="form-label text-white-50">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control bg-secondary text-white border-0"
                                        name="nombre"
                                        value={formulario.nombre}
                                        onChange={manejarCambio}
                                        required
                                    />
                                </div>

                                {/* APELLIDOS */}
                                <div className="col-md-6">
                                    <label className="form-label text-white-50">Apellidos</label>
                                    <input
                                        type="text"
                                        className="form-control bg-secondary text-white border-0"
                                        name="apellidos"
                                        value={formulario.apellidos}
                                        onChange={manejarCambio}
                                        required
                                    />
                                </div>

                                {/* DNI - Requerido y exactamente 8 caracteres */}
                                <div className="col-md-6">
                                    <label className="form-label text-white-50">DNI (8 dígitos)</label>
                                    <input
                                        type="text"
                                        className="form-control bg-secondary text-white border-0"
                                        name="dni"
                                        maxLength="8"
                                        minLength="8"
                                        value={formulario.dni}
                                        onChange={manejarCambio}
                                        required
                                    />
                                </div>

                                {/* FECHA DE NACIMIENTO - Requerido */}
                                <div className="col-md-6">
                                    <label className="form-label text-white-50">Fecha de Nacimiento</label>
                                    <input
                                        type="date"
                                        className="form-control bg-secondary text-white border-0"
                                        name="fecha_nacimiento"
                                        value={formulario.fecha_nacimiento}
                                        onChange={manejarCambio}
                                        required
                                    />
                                </div>

                                {/* EMAIL */}
                                <div className="col-md-6">
                                    <label className="form-label text-white-50">Email</label>
                                    <input
                                        type="email"
                                        className="form-control bg-secondary text-white border-0"
                                        name="email"
                                        value={formulario.email}
                                        onChange={manejarCambio}
                                        required
                                    />
                                </div>

                                {/* TELEFONO - Máximo 9 caracteres según tu regla */}
                                <div className="col-md-6">
                                    <label className="form-label text-white-50">Teléfono (9 dígitos)</label>
                                    <input
                                        type="text"
                                        className="form-control bg-secondary text-white border-0"
                                        name="telefono"
                                        maxLength="9"
                                        value={formulario.telefono}
                                        onChange={manejarCambio}
                                    />
                                </div>

                                {/* DIRECCIÓN - Opcional */}
                                <div className="col-md-6">
                                    <label className="form-label text-white-50">Dirección</label>
                                    <input
                                        type="text"
                                        className="form-control bg-secondary text-white border-0"
                                        name="direccion"
                                        value={formulario.direccion}
                                        onChange={manejarCambio}
                                    />
                                </div>

                                {/* ESTADO MATRÍCULA - Selector obligatorio */}
                                <div className="col-md-6">
                                    <label className="form-label text-white-50">Estado Matrícula</label>
                                    <select
                                        className="form-select bg-secondary text-white border-0"
                                        name="estado_matricula"
                                        value={formulario.estado_matricula}
                                        onChange={manejarCambio}
                                        required
                                    >
                                        <option value="Matriculado">Matriculado</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>

                            </div>

                            {/* BOTONES */}
                            <div className="d-flex justify-content-end gap-3 mt-4">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={cerrarModal}
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AlumnoModal;