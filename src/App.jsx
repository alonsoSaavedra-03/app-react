// 1. Importas el componente Navbar desde su archivo
import Navbar from "./components/Navbar/Navbar";
import AlumnoCard from "./components/AlumnoCard/AlumnoCard"

function App() {
  return (
    <>

      <Navbar />

      <div className="container">
      <p></p>
        <h3 className="mb-4">Listado de Alumnos</h3>
        <div className="row">
          <AlumnoCard 
            nombre= "Alonso"
            carrera= "Desarrollo de aplicaciones"
            estado= "Matriculado"
          />
          <AlumnoCard 
            nombre= "Tavara"
            carrera= "Desarrollo de aplicaciones"
            estado= "Deshabilitado"
          />
          <AlumnoCard 
            nombre= "Rios"
            carrera= "Desarrollo de aplicaciones"
            estado= "Deshabilitado"
          />
          <AlumnoCard 
            nombre="Valeria" 
            carrera="Diseño y Desarrollo de Software" 
            estado="Matriculado" 
          />

          <AlumnoCard 
            nombre="Camila" 
            carrera="Inteligencia Artificial y Ciencia de Datos" 
            estado="Deshabilitado" 
          />

          <AlumnoCard 
            nombre="Mateo" 
            carrera="Ciberseguridad" 
            estado="Matriculado" 
          />

          <AlumnoCard 
            nombre="Diego" 
            carrera="Desarrollo de Aplicaciones" 
            estado="Matriculado" 
          />

          <AlumnoCard 
            nombre="Sofía" 
            carrera="Diseño de Interfaces (UI/UX)" 
            estado="Deshabilitado" 
          />
        </div>
      </div>
    </>
  );
}

export default App;
