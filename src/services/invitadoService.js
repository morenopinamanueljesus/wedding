import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseService";

export async function obtenerInvitadoPorCodigo(codigo) {
  try {
    const docRef = doc(db, "invitados", codigo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("Invitado no encontrado");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el invitado:", error);
    throw error;
  }
}