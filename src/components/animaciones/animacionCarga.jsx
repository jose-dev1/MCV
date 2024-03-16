import React from 'react';
import '../../css/animacion.css'; // Importamos el archivo CSS para las animaciones

const DogRunner = () => {
    return (
        <div className="dog-runner-container">
            {/* Elemento de fondo animado */}
            <div className="background-animation">
                <div className="dog-runner-container">
                    {/* Elemento de fondo animado */}
                    <div className="background-animation">
                        {/* Cuadrados */}
                        {Array.from({ length: 40 }, (_, i) => (
                            <div className={`object object${i + 1}`} key={i}></div>
                        ))}
                    </div>
                </div>



                <div className="object10"></div>
            </div>
            {/* Imagen del perro */}
            <img className='animacionPerro' src="https://media.baamboozle.com/uploads/images/1234896/507cd47b-7ee9-493a-abc9-4e94bbef9f18.gif" alt="" />
            {/* Contenedor de mensaje */}
            <div className="message-container">
                <p className="message"> . . . . . . . .</p>
            </div>
        </div>
    );
};

export default DogRunner;
