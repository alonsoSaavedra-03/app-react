import React from 'react';
import imagenlogo from '../../assets/logo.png';
import { Link, useLocation, NavLink} from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-opacity-95 shadow-sm sticky-top">
      <div className="container">
        
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img
            src={imagenlogo}
            alt="Logo"
            width="38"
            height="38"
            className="rounded-2"
          />
          <span className="fw-semibold fs-5 text-white">Matriculate</span>
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links + Actions */}
        <div className="collapse navbar-collapse" id="navbarNav">
          
          {/* Nav links — centrados */}
          <ul className="navbar-nav mx-auto gap-1 mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded-2 ${isActive ? "active bg-white bg-opacity-10 text-white fw-medium" : "text-white-50"}`
                }
                to="/"
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded-2 ${isActive ? "active bg-white bg-opacity-10 text-white fw-medium" : "text-white-50"}`
                }
                to="/cursos"
              >
                Cursos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded-2 ${isActive ? "active bg-white bg-opacity-10 text-white fw-medium" : "text-white-50"}`
                }
                to="/especializaciones"
              >
                Especializaciones
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded-2 ${isActive ? "active bg-white bg-opacity-10 text-white fw-medium" : "text-white-50"}`
                }
                to="/contactos"
              >
                Contactos
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle px-3 py-2 rounded-2 text-white-50"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Gestionar
              </a>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li><Link className="dropdown-item" to="/alumnos">Alumnos</Link></li>
                <li><Link className="dropdown-item" to="/profesores">Profesores</Link></li>
                <li><Link className="dropdown-item" to="/horarios">Horarios</Link></li>
                <li><Link className="dropdown-item" to="/cursos">Cursos</Link></li>
                <li><Link className="dropdown-item" to="/matriculas">Matrículas</Link></li>
              </ul>
          </li>
          </ul>

          {/* Botones */}
          <div className="d-flex gap-2 mt-2 mt-lg-0">
            <button className="btn btn-outline-light btn-sm px-4 rounded-pill" type="button">
              Ingresar
            </button>
            <button className="btn btn-primary btn-sm px-4 rounded-pill" type="button">
              Registrarse
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;