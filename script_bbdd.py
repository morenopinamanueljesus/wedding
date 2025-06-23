import firebase_admin
from firebase_admin import credentials, firestore
import csv

def format_nombre(nombre):
    palabras = nombre.split()
    resultado = []
    for palabra in palabras:
        if palabra.lower() == "y":
            resultado.append("y")
        else:
            resultado.append(palabra.capitalize())
    return " ".join(resultado)


# Inicializa Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# Leer el CSV con delimitador ;
with open("invitados.csv", newline='', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile, delimiter=';')
    for row in reader:
        if len(row) < 3:
            continue  # Saltar filas incompletas
        
        nombreCompleto = format_nombre(row[0])
        telefono = row[1]
        doc_id = row[2]  # Este será el ID del documento

        data = {
            "nombreCompleto": nombreCompleto,
            "telefono": telefono,
            "asistenciaConfirmada": False,     
            "mensaje": "",           
            "nombresComensales": "",
            "personas": ""
        }

        # Insertar usando el ID como nombre del documento
        db.collection("invitados").document(doc_id).set(data)
        print(f"Insertado: {doc_id}")