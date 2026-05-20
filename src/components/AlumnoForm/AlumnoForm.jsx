import { useState } from 'react';

const AlumnoForm = ({ recargarAlumnos }) => {

    const [formulario, setFormulario] = useState({
        nombre: '',
        apellidos: '',
        fecha_nacimiento: '',
        dni: '',
        direccion: '',
        telefono: '',
        email: '',
        estado_matricula: 'Inactivo',
        imagen: null
    });

    const manejarCambio = (e) => {

        const { name, value } = e.target;

        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    const manejarImagen = (e) => {

        setFormulario({
            ...formulario,
            imagen: e.target.files[0]
        });
    };

    const manejarEnvio = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            Object.keys(formulario).forEach((key) => {

                if (key === 'imagen' && formulario[key] === null) {
                    return;
                }
            
                formData.append(key, formulario[key]);
            });

            const respuesta = await fetch(
                'http://127.0.0.1:8000/api/alumno',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json'
                    },
                    body: formData
                }
            );

            const datos = await respuesta.json();

            if (respuesta.ok) {

                alert('Alumno guardado exitosamente');

                setFormulario({
                    nombre: '',
                    apellidos: '',
                    fecha_nacimiento: '',
                    dni: '',
                    direccion: '',
                    telefono: '',
                    email: '',
                    estado_matricula: 'Inactivo',
                    imagen: null
                });

                // Recargar alumnos
                recargarAlumnos();

            } else {

                console.log('Errores:', datos.errors);
                alert('Error al guardar el alumno');

            }

        } catch (error) {

            console.error('Error:', error);
            alert('No se pudo conectar con Laravel');

        }
    };

    return (

        <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-4">

            {/* Header */}
            <div
                className="card-header border-0 py-4"
                style={{
                    background: "linear-gradient(135deg, #4f46e5, #7c3aed)"
                }}
            >
                <h4 className="mb-0 text-white fw-bold d-flex align-items-center">
                    <i className="fas fa-user-graduate me-3"></i>
                    Registrar Nuevo Alumno
                </h4>
            </div>

            {/* Body */}
            <div
                className="card-body p-4"
                style={{
                    backgroundColor: "#f8fafc"
                }}
            >

                <form onSubmit={manejarEnvio}>

                    <div className="row g-4">

                        {/* Nombre */}
                        <div className="col-md-6">

                            <label className="form-label fw-semibold text-dark">
                                Nombres
                            </label>

                            <div className="input-group">

                                <span
                                    className="input-group-text border-0"
                                    style={{
                                        backgroundColor: "#e0e7ff",
                                        color: "#4338ca"
                                    }}
                                >
                                    <i className="fas fa-user"></i>
                                </span>

                                <input
                                    type="text"
                                    className="form-control border-0 shadow-sm"
                                    style={{
                                        backgroundColor: "#ffffff"
                                    }}
                                    name="nombre"
                                    value={formulario.nombre}
                                    onChange={manejarCambio}
                                    required
                                />

                            </div>

                        </div>

                        {/* Apellidos */}
                        <div className="col-md-6">

                            <label className="form-label fw-semibold text-dark">
                                Apellidos
                            </label>

                            <div className="input-group">

                                <span
                                    className="input-group-text border-0"
                                    style={{
                                        backgroundColor: "#ede9fe",
                                        color: "#6d28d9"
                                    }}
                                >
                                    <i className="fas fa-id-card"></i>
                                </span>

                                <input
                                    type="text"
                                    className="form-control border-0 shadow-sm"
                                    style={{
                                        backgroundColor: "#ffffff"
                                    }}
                                    name="apellidos"
                                    value={formulario.apellidos}
                                    onChange={manejarCambio}
                                    required
                                />

                            </div>

                        </div>

                        {/* Fecha nacimiento */}
                        <div className="col-md-4">

                            <label className="form-label fw-semibold text-dark">
                                Fecha de Nacimiento
                            </label>

                            <input
                                type="date"
                                className="form-control border-0 shadow-sm"
                                style={{
                                    backgroundColor: "#ffffff"
                                }}
                                name="fecha_nacimiento"
                                value={formulario.fecha_nacimiento}
                                onChange={manejarCambio}
                                required
                            />

                        </div>

                        {/* DNI */}
                        <div className="col-md-4">

                            <label className="form-label fw-semibold text-dark">
                                DNI
                            </label>

                            <input
                                type="text"
                                className="form-control border-0 shadow-sm"
                                style={{
                                    backgroundColor: "#ffffff"
                                }}
                                name="dni"
                                maxLength="8"
                                value={formulario.dni}
                                onChange={manejarCambio}
                                required
                            />

                        </div>

                        {/* Teléfono */}
                        <div className="col-md-4">

                            <label className="form-label fw-semibold text-dark">
                                Teléfono
                            </label>

                            <input
                                type="text"
                                className="form-control border-0 shadow-sm"
                                style={{
                                    backgroundColor: "#ffffff"
                                }}
                                name="telefono"
                                maxLength="9"
                                value={formulario.telefono}
                                onChange={manejarCambio}
                            />

                        </div>

                        {/* Dirección */}
                        <div className="col-md-12">

                            <label className="form-label fw-semibold text-dark">
                                Dirección
                            </label>

                            <textarea
                                className="form-control border-0 shadow-sm"
                                style={{
                                    backgroundColor: "#ffffff"
                                }}
                                name="direccion"
                                rows="2"
                                value={formulario.direccion}
                                onChange={manejarCambio}
                            ></textarea>

                        </div>

                        {/* Email */}
                        <div className="col-md-6">

                            <label className="form-label fw-semibold text-dark">
                                Email
                            </label>

                            <div className="input-group">

                                <span
                                    className="input-group-text border-0"
                                    style={{
                                        backgroundColor: "#dbeafe",
                                        color: "#2563eb"
                                    }}
                                >
                                    <i className="fas fa-envelope"></i>
                                </span>

                                <input
                                    type="email"
                                    className="form-control border-0 shadow-sm"
                                    style={{
                                        backgroundColor: "#ffffff"
                                    }}
                                    name="email"
                                    value={formulario.email}
                                    onChange={manejarCambio}
                                    required
                                />

                            </div>

                        </div>

                        {/* Estado */}
                        <div className="col-md-6">

                            <label className="form-label fw-semibold text-dark">
                                Estado de Matrícula
                            </label>

                            <select
                                className="form-select border-0 shadow-sm"
                                style={{
                                    backgroundColor: "#ffffff"
                                }}
                                name="estado_matricula"
                                value={formulario.estado_matricula}
                                onChange={manejarCambio}
                            >
                                <option value="Matriculado">
                                    Matriculado
                                </option>

                                <option value="Inactivo">
                                    Inactivo
                                </option>

                            </select>

                        </div>

                        {/* Imagen */}
                        <div className="col-md-12">

                            <label className="form-label fw-semibold text-dark">
                                Imagen del Alumno
                            </label>

                            <div
                                className="rounded-4 p-4 shadow-sm"
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "2px dashed #c4b5fd"
                                }}
                            >

                                <input
                                    type="file"
                                    className="form-control border-0"
                                    name="imagen"
                                    accept="image/*"
                                    onChange={manejarImagen}
                                />

                                <small className="text-muted mt-2 d-block">
                                    Formatos permitidos: JPG, PNG, WEBP
                                </small>

                            </div>

                        </div>

                        {/* Botón */}
                        <div className="col-12 text-end mt-3">

                            <button
                                type="submit"
                                className="btn text-white px-5 py-2 rounded-3 shadow"
                                style={{
                                    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                                    border: "none",
                                    fontWeight: "600"
                                }}
                            >
                                <i className="fas fa-save me-2"></i>
                                Guardar Alumno
                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </div>

    );
};

export default AlumnoForm;