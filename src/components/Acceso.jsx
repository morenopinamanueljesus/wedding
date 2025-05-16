import fondo from '../assets/galeria2.jpg';
import '../styles/Acceso.css';

const Invitacion = ({ nombreCompleto, mostrarInvitacion, setMostrarInvitacion }) => {
    return (
        <div
            className={`principal ${mostrarInvitacion ? 'h-auto min-h-screen' : ''}`}
            style={{ backgroundImage: `url(${fondo})` }}
        >
            <div className="box-formulario-acceso text-center">
                <p className="fs-1 fw-bold">Hola, {nombreCompleto}</p>
                <p className="fs-5 fst-italic mb-5">
                    “El amor se celebra con quienes lo hacen aún más grande. Y tú eres parte de eso.”
                </p>
                <p className="mb-1">
                    Estamos preparando cada detalle con mucho cariño y sería un honor contar contigo en nuestro gran día.
                </p>
                <button className="btn-acceso" onClick={() => setMostrarInvitacion(true)}>Abrir Invitación</button>
            </div>
        </div>
    )
}

export default Invitacion;