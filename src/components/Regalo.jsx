import Lottie from 'react-lottie';
import React, { useEffect, useState, useRef } from "react";



const Regalo = ({ defaultOptions }) => {
    const [showModal, setShowModal] = useState(false);

    // Función para abrir o cerrar el modal
    const toggleModal = () => {
        console.log("Modal Toggled", showModal);  // Esto ayudará a verificar el estado.
        setShowModal(!showModal);
    };


    return (
        <section id="regalo" className="historia-section">
            <div className="celebracion-icon-container">
                <Lottie options={defaultOptions} height={200} width={200} />
            </div>
            <div className="celebracion-text">
                <p className="subtitulo">
                    Nuestro mayor regalo es que nos acompañes, pero si queréis colaborar con nuestro nuevo comienzo…
                </p>
                <button onClick={toggleModal} className="btn-custom">
                    Ver Datos Bancarios
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="custom-modal">
                    <div className="custom-modal-overlay" onClick={toggleModal} />
                    <div className="custom-modal-content">
                        <span className="close" onClick={toggleModal}>&times;</span>
                        <h3>Datos Bancarios</h3>
                        <p>Cuenta: 0073 0100 5106 6795 0864</p>
                        <p>IBAN: ES37 0073 0100 5106 6795 0864</p>
                        <p>Concepto: Regalo boda Rocío y Julio</p>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Regalo;