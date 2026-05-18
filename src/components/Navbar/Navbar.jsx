import React from 'react';
import imagenlogo from '../../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img 
            src={imagenlogo} 
            alt="Logo" 
            width="40"  
            height="40"
            className="d-inline-block align-text-top me-2" 
          />
          <span className="fw-bold">Matriculate</span>
        </a>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Cursos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Especializaciones</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contactos</a>
            </li>
          </ul>
          
          <div className="d-flex mt-2 mt-lg-0">
            <button className="btn btn-primary px-4 rounded-pill" type="button">Login</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;