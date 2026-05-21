import { useState } from 'react';
import './AlumnoCard.css';

const AlumnoCard = ({ nombre, carrera, estadoInicial, imagen }) => {

    const [estado, setEstado] = useState(estadoInicial);

    const badgeColor =
        estado === 'Matriculado'
            ? 'bg-success'
            : 'bg-secondary';

    const cambiarEstado = () => {
        if (estado === 'Matriculado') {
            setEstado('Inactivo');
        } else {
            setEstado('Matriculado');
        }
    };

    return (
        <div className="col-md-4 mb-4">

            <div className="card h-100 border-0 bg-dark-custom text-white shadow-lg rounded-4 overflow-hidden alumno-card-moderna">

                {/* Contenedor de Imagen con Efecto de Degradado */}
                <div className="position-relative">
                    <img
                        src={
                            imagen
                                ? `http://127.0.0.1:8000/storage/${imagen}`
                                : '/default-user.png'
                        }
                        alt="Alumno"
                        className="img-fluid"
                        style={{
                            width: '100%',
                            height: '240px',
                            objectFit: 'cover'
                        }}
                    />
                    {/* Badge de Estado flotando sobre la imagen de forma elegante */}
                    <span className={`position-absolute top-0 end-0 m-3 badge rounded-pill px-3 py-2 ${
                        estado === 'Matriculado' ? 'bg-success bg-opacity-25 text-success border border-success border-opacity-20' : 'bg-danger bg-opacity-25 text-danger border border-danger border-opacity-20'
                    }`}>
                        ● {estado}
                    </span>
                </div>

                {/* Cuerpo de la Tarjeta */}
                <div className="card-body p-4 d-flex flex-column justify-content-between">
                    
                    {/* Información del Alumno */}
                    <div className="mb-4">
                        <h5 className="fw-bold mb-1 text-white text-truncate">{nombre}</h5>
                        <p className="text-white-50 small mb-0 d-flex align-items-center gap-1">
                            <i className="fas fa-graduation-cap text-primary text-opacity-75"></i>
                            {carrera || "Educación Superior"}
                        </p>
                    </div>

                    {/* Acciones / Botones */}
                    <div className="d-flex align-items-center justify-content-between gap-2 mt-auto pt-3 border-top border-light border-opacity-10">
                        
                        <button
                            className="btn btn-sm btn-outline-warning rounded-pill px-3 py-1.5 flex-grow-1 border-opacity-50"
                            onClick={cambiarEstado}
                        >
                            <i className="fas fa-sync-alt me-1"></i> Estado
                        </button>

                        <button className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1.5 flex-grow-1">
                            <i className="fas fa-edit me-1"></i> Editar
                        </button>

                        <button className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1.5 flex-grow-1">
                            <i className="fas fa-trash-alt me-1"></i> Borrar
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AlumnoCard;