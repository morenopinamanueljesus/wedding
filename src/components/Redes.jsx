import Lottie from 'react-lottie';

const Redes = ({ defaultOptions }) => {
    return (
        <section id="redes" className="historia-section">
            <div className="celebracion-icon-container">
                <Lottie options={defaultOptions} height={150} width={150} />
            </div>
            <div className="celebracion-text">
                <p className="subtitulo">
                    ¿SACASTES LA MEJOR FOTO DE LA NOCHE? <br/>¡QUEREMOS VERLA!
                    <br />
                </p>
                <p className="subtitulo">Súbelas a nuestro álbum de Google Drive</p>
                <button
                    className="btn-custom"
                    onClick={() =>
                        window.open(
                            'https://drive.google.com/drive/folders/1DFi0ADNAD3jCnewaNbQN2zDzTlpXAqgp?usp=sharing',
                            '_blank'
                        )
                    }
                >
                    Subir fotos
                </button>
            </div>
        </section>
    )
}

export default Redes;