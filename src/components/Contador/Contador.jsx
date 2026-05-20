import { useState } from 'react';
 
const Contador = () => {
    const [numero, setNumero] = useState(0);
    return (
        <div className="card shadow-sm p-4 text-center mb-4">
            <h4>Alumnos Seleccionados: <span className="text-primary">{numero}</span></h4>
 
            <div className="mt-3">

                <button
                    className="btn btn-danger mx-2"
                    onClick={() => setNumero(numero - 1)}
                >
                    Restar
                </button>
 
                <button
                    className="btn btn-success mx-2"
                    onClick={() => setNumero(numero + 1)}
                >
                    Sumar
                </button>
            </div>
        </div>
    );
};
export default Contador;