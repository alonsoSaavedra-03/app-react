import { useEffect, useState } from "react";
import axios from "axios";

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
            <h1>EN PROCESO</h1>
        </>
    );
};

export default Inicio;