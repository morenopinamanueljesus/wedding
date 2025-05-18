import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseService";
import emailjs from 'emailjs-com';

export async function confirmarAsistencia(codigo, nombre, numero, mensaje, nombresComensales) {
  const nombresString = nombresComensales.join(', ');

  await updateDoc(doc(db, "invitados", codigo), {
    asistenciaConfirmada: true,
    mensaje: mensaje,
    personas: numero,
    nombresComensales: nombresString
  });

  await emailjs.send(
    "service_lwixr2b",
    "template_1e0s3hj",
    { nombre, numero, mensaje, nombresString },
    "80jNXmTMgIDfMp0sk"
  );
}