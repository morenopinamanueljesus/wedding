import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const Gracias = () => {
    return (
        <section id="gracias" className="celebracion-section">
            <div className="celebracion-icon-container">
                <div className="celebracion-text">
                    <p className="subtitulo">¿Tienes dudas o solo quieres saludarnos?</p>
                </div>
            </div>
            <div className="celebracion-text contacto-divertido">
                <p>
                    <strong>Rocío</strong><br />
                    <a
                        href="https://wa.me/34692270432"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-icon"
                        title="Enviar WhatsApp"
                    >
                        <FaWhatsapp color="#25D366" size={20} />
                    </a> <FaPhoneAlt />{" "}
                    <a href="tel:+34692270432" className="telefono-link">692 27 04 32</a>
                </p>
                <p>
                    <strong>Julio</strong><br /> 
                    <a
                        href="https://wa.me/34663727006"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-icon"
                        title="Enviar WhatsApp"
                    >
                        <FaWhatsapp color="#25D366" size={20} />
                    </a> <FaPhoneAlt />{" "}
                    <a href="tel:+34663727006" className="telefono-link">663 72 70 06</a>
                </p>
                <p style={{ marginTop: '1rem' }}>
                    ¡Escríbenos o llámanos si necesitas algo antes del gran día! 💬📞
                </p>
            </div>
            <div className="celebracion-text">
                <p className="subtitulo">Vente con ganas de festejar, nosotros ponemos la excusa perfecta. 💛</p>
            </div>
        </section>
    )
}

export default Gracias;