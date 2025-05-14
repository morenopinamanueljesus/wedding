import React from "react";
import Lottie from 'react-lottie';

const Celebracion = ({ defaultOptions }) => {
    return (
        <section id="celebracion" className="celebracion-section">
            <div className="celebracion-icon-container">
                <Lottie options={defaultOptions} height={200} width={200} />
            </div>
            <div className="celebracion-text">
                <p className="subtitulo">CELEBRACIÓN</p>
                <p className="subtitulo">Después del "Sí, quiero"... ¡Empieza la fiesta!</p>
                <p className="mt-4 text-center text-gray-700">
                    Al terminar la ceremonia, daremos paso a una <strong>celebración tipo cóctel</strong>, llena de sabores, música y alegría.
                    <br />
                    Ven con ganas de brindar, bailar y crear recuerdos inolvidables con nosotros.
                </p>
            </div>
        </section>)
}

export default Celebracion;