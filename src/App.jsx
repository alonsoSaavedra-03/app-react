import { useEffect, useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Inicio from "./components/pages/Inicio/Inicio";
import Alumnos from "./components/pages/Alumnos/Alumnos";
import Profesores from "./components/pages/Profesores/Profesores";
import Horarios from "./components/pages/Horarios/Horarios";
import Cursos from "./components/pages/Cursos/Cursos";
import Matriculas from "./components/pages/Matriculas/Matriculas";


function App() {

    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/alumnos" element={<Alumnos />} />
                <Route path="/profesores" element={<Profesores />} />
                <Route path="/horarios" element={<Horarios />} />
                <Route path="/cursos" element={<Cursos />} />
                <Route path="/matriculas" element={<Matriculas />} />
            </Routes>
        </>
    );
}

export default App;