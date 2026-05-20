import { useEffect, useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import AlumnoCard from "./components/AlumnoCard/AlumnoCard";
import Contador from "./components/Contador/Contador";
import AlumnoForm from "./components/AlumnoForm/AlumnoForm";

function App() {

    // Estado donde se guardarán los alumnos
    const [alumnos, setAlumnos] = useState([]);

    // Función para obtener alumnos desde Laravel
    const obtenerAlumnos = async () => {

        try {

            const respuesta = await fetch(
                "http://127.0.0.1:8000/api/alumno"
            );

            const datos = await respuesta.json();

            setAlumnos(datos);

        } catch (error) {

            console.error(
                "Error al obtener alumnos:",
                error
            );

        }
    };

    // Se ejecuta al iniciar la app
    useEffect(() => {
        obtenerAlumnos();
    }, []);

    return (
        <>

            <Navbar />

            <div className="container">

                <p></p>


                {/* Formulario */}
                <AlumnoForm
                    recargarAlumnos={obtenerAlumnos}
                />

                <h3 className="mb-4">
                    Listado de Alumnos
                </h3>
                
                <div className="row">

                    {/* Cards dinámicas */}
                    {alumnos.map((alumno) => (

                      <AlumnoCard
                      key={alumno.id_alumno}
                      nombre={`${alumno.nombre} ${alumno.apellidos}`}
                      carrera="Desarrollo de Aplicaciones"
                      estadoInicial={alumno.estado_matricula}
                      imagen={alumno.imagen}
                      />

                    ))}

                </div>
            </div>

        </>
    );
}

export default App;