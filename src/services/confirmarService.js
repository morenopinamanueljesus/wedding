import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseService";
import emailjs from 'emailjs-com';

export async function confirmarAsistencia(codigo, nombre, numero, mensaje) {
  await updateDoc(doc(db, "invitados", codigo), {
    asistenciaConfirmada: true,
    mensaje: mensaje,
    personas: numero
  });

  await emailjs.send(
    "service_lwixr2b",
    "template_1e0s3hj",
    { nombre },
    "80jNXmTMgIDfMp0sk"
  );
}