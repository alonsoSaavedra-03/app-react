import React from "react";
import { Link } from "react-router-dom";
import './Inicio.css';

const LandingPage = () => {
  return (
    <div
        className="bg-dark text-white d-flex align-items-center position-relative overflow-hidden contenedor-inicio"
        >
        
        {/* Efectos de fondo */}
        <div className="position-absolute top-0 start-0 rounded-circle fondo-efecto"></div>

        <div className="position-absolute bottom-0 end-0 rounded-circle sub-fondo-efecto"></div>

        
        <div className="container position-relative">

            <div className="row justify-content-center text-center">

            <div className="col-lg-8">

                {/* Badge */}
                <div className="d-inline-flex align-items-center gap-2 bg-light bg-opacity-10 border border-light border-opacity-10 rounded-pill px-4 py-2 mb-4">
                <span className="text-primary">●</span>

                <span className="small text-white-50">
                    Plataforma Académica Moderna
                </span>
                </div>

                
                {/* Título */}
                <h1 className="fw-bold mb-4 titulo-inicio">
                Bienvenido a
                <span className="text-primary"> Matriculate</span>
                </h1>

                
                {/* Texto */}
                <p className="text-white-50 fs-5 mx-auto mb-5 texto-inicio">
                Una experiencia moderna, elegante y rápida para gestionar
                tu plataforma educativa.
                </p>

                
                {/* Botones */}
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">

                <Link
                    to="/cursos"
                    className="btn btn-primary btn-lg px-5 rounded-pill shadow"
                >
                    Comenzar
                </Link>

                <Link
                    to="/cursos"
                    className="btn btn-outline-light btn-lg px-5 rounded-pill shadow"
                >
                    Explorar
                </Link>

                </div>

            </div>

            </div>

        </div>

        </div>
  );
};

export default LandingPage;