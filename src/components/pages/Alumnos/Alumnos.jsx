import { useEffect, useState } from "react";
import axios from "axios";
import "./Alumnos.css";

import AlumnoCard from "../../AlumnoCard/AlumnoCard";
import AlumnoForm from "../../AlumnoForm/AlumnoForm";

const Inicio = () => {

    // Estado de alumnos
    const [alumnos, setAlumnos] = useState([]);

    // Obtener alumnos desde Laravel
    const obtenerAlumnos = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/alumno"
            );

            setAlumnos(response.data);

        } catch (error) {

            console.error(
                "Error al obtener alumnos:",
                error
            );

        }

    };

    // Cargar alumnos al iniciar
    useEffect(() => {

        obtenerAlumnos();

    }, []);

    return (
        <>
            <div className="position-absolute top-0 start-0 rounded-circle fondo-efecto"></div>
            <div className="position-absolute bottom-0 end-0 rounded-circle sub-fondo-efecto"></div>
            <div className="contenedor-inicio text-white py-5">
                
                <div className="container">

                    {/* Formulario */}
                    <AlumnoForm
                        recargarAlumnos={obtenerAlumnos}
                    />

                    {/* Título adaptado a color blanco con margen estilizado */}
                    <h3 className="mb-4 mt-5 fw-bold text-white d-flex align-items-center gap-2">
                        <span className="text-primary">●</span> Listado de Alumnos
                    </h3>

                    <div className="row">

                        {/* Cards dinámicas */}
                        {alumnos.map((alumno) => (
                            <AlumnoCard
                                key={alumno.id_alumno}
                                nombre={`${alumno.nombre} ${alumno.apellidos}`}
                                estadoInicial={alumno.estado_matricula}
                                imagen={alumno.imagen}
                            />
                        ))}

                    </div>

                </div>

            </div>
        </>
    );
};

export default Inicio;