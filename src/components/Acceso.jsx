import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../services/firebaseService";
import fondo from '../assets/galeria2.jpg';
import '../styles/Acceso.css';

const Invitacion = ({ nombreCompleto, mostrarInvitacion, setMostrarInvitacion, esAdmin }) => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            const snapshot = await getDocs(collection(db, 'invitados'));
            const data = snapshot.docs.map(doc => doc.data());
            setUsuarios(data);
        };

        if (esAdmin) {
            fetchUsuarios();
        }
    }, [esAdmin]);
    
    return (
        <div
            className={`principal ${mostrarInvitacion ? 'h-auto min-h-screen' : ''}`}
            style={esAdmin ? {} : { backgroundImage: `url(${fondo})` }}
        >
            {esAdmin ? (
                <div className="tabla-admin">
                    <h3>Lista de Invitados</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Ha confirmado?</th>
                                <th>Personas</th>
                                <th>Teléfono</th>
                                <th>Comensales</th>
                                <th>Mensaje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((u, i) => (
                                <tr key={i}>
                                    <tr key={i}>
                                        <td data-label="Nombre">{u.nombreCompleto}</td>
                                        <td data-label="Ha confirmado?">{u.asistenciaConfirmada ? 'Sí' : '-'}</td>
                                        <td data-label="Personas">{u.personas && !isNaN(u.personas) ? parseInt(u.personas, 10) : '-'}</td>
                                        <td data-label="Teléfono">{u.telefono || '-'}</td>
                                        <td data-label="Comensales">{u.nombresComensales || '-'}</td>
                                        <td data-label="Mensaje">{u.mensaje || '-'}</td>
                                    </tr>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <>
                    <div className="box-formulario-acceso text-center">
                        <p className="box-formulario-portada-texto">Hola, {nombreCompleto}</p>
                        <p className="fs-7 fst-italic mb-3">
                            “El amor se celebra con quienes lo hacen aún más grande. Y tú eres parte de eso.”<br />
                            Estamos preparando cada detalle con mucho cariño y sería un honor contar contigo en nuestro gran día.
                        </p>
                    </div>
                    <button className="btn-acceso" onClick={() => setMostrarInvitacion(true)}>Abrir Invitación</button>
                </>
            )}
        </div>
    );
};

export default Invitacion;