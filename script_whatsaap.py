import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import time

# Cargar invitados
df = pd.read_csv("invitados.csv", sep=";", header=None, encoding="utf8")
df.columns = ["Nombre", "Telefono", "Codigo"]

# Ruta al ChromeDriver
chromedriver_path = "C:/Users/manueljesus.moreno/Downloads/chromedriver-win64/chromedriver-win64/chromedriver.exe"

# Opciones del navegador
options = webdriver.ChromeOptions()
options.add_argument("--user-data-dir=C:/Users/manueljesus.moreno/Desktop/Formacion/weeding/WhatsApp_Profile")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--disable-gpu")
options.binary_location = "C:/Program Files/Google/Chrome/Application/chrome.exe"

# Iniciar navegador
service = Service(executable_path=chromedriver_path)
driver = webdriver.Chrome(service=service, options=options)

input("🔒 Escanea el código QR y presiona ENTER cuando esté cargado completamente...")

# URL de la boda
url_boda = "https://boda-rocio-julio.vercel.app/"

for i, row in df.iterrows():
    nombre = row["Nombre"]
    telefono = str(row["Telefono"]).strip()
    codigo = row["Codigo"]

    mensajes = [
        f"Hola {nombre}, estás invitado/a a nuestra boda.",
        f"Accede a nuestra invitación web para confirmar asistencia",
        f"Tu código de acceso es: {codigo}",
        "¡Esperamos contar contigo!"
    ]

    try:
        driver.get(f"https://web.whatsapp.com/send?phone=34{telefono}&text=")
        
        # Esperar que cargue la caja de texto
        caja_texto = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.XPATH, '//div[@contenteditable="true" and @data-tab="10"]'))
        )

        caja_texto.send_keys(url_boda)
        time.sleep(5)  
        caja_texto.send_keys(Keys.ENTER)
        time.sleep(1)

        for msg in mensajes:
            caja_texto.send_keys(msg)
            caja_texto.send_keys(Keys.ENTER)
            time.sleep(1)  

        print(f"✅ Mensajes enviados a {nombre}")
        time.sleep(5)
    except Exception as e:
        print(f"❌ Error con {nombre}: {e}")

driver.quit()
