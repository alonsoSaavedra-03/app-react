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
        <div className="col-md-4 mb-3">

        <div className="alumno-card">

            {/* Imagen */}
            <img
                src={
                    imagen
                        ? `http://127.0.0.1:8000/storage/${imagen}`
                        : '/default-user.png'
                }
                alt="Alumno"
                className="img-fluid rounded-top"
                style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover'
                }}
            />

            <div className="alumno-header">

                <h5>{nombre}</h5>

                <p>{carrera}</p>

            </div>

            <div className="alumno-body">

                <span className={`badge rounded-pill ${badgeColor}`}>
                    {estado}
                </span>

                <div className="acciones">

                    <button
                        className="btn btn-sm btn-warning"
                        onClick={cambiarEstado}
                    >
                        Estado
                    </button>

                    <button className="btn btn-sm btn-outline-primary">
                        Editar
                    </button>

                    <button className="btn btn-sm btn-outline-danger">
                        Eliminar
                    </button>

                </div>

            </div>

        </div>

    </div>
    );
};

export default AlumnoCard;