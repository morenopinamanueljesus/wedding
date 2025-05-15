import Lottie from 'react-lottie';

const Ceremonia = ({ defaultOptions }) => {
    return (
        <section id="ceremonia" className="celebracion-section">
            <div className="celebracion-icon-container">
                <Lottie options={defaultOptions} height={150} width={150} />
            </div>
            <div className="celebracion-text">
                <p className="subtitulo">Nuestra historia se viste de gala y tú eres parte esencial de ella</p>
                <p className="mt-4 text-center text-gray-700">
                    La ceremonia comenzará a las <strong>19:45</strong>.
                    Prepárate para compartir con nosotros un momento lleno de emoción, promesas y mucho amor.<br />
                    ¡Nos vemos en <strong>Hacienda Al-Yamanah!</strong>
                </p>
                <a
                    href="https://maps.app.goo.gl/W1HmGLuWLanBvE5VA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-custom"
                >
                    Ver Ubicación
                </a>
            </div>
        </section>
    )
}

export default Ceremonia;