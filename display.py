import subprocess
import time
from mfrc522 import SimpleMFRC522
import RPi.GPIO as GPIO
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def read_rfid():
    try:
        reader = SimpleMFRC522()
        logger.info("Hold an RFID card near the reader")
        rfid_id, text = reader.read()
        logger.info(f"RFID ID: {rfid_id}")
        return rfid_id, text
    except Exception as e:
        logger.error(f"Error reading RFID card: {e}")
        return None, None
    finally:
        GPIO.cleanup()

while True:
	url1 = "/home/pi/default.html"
	command = ["chromium-browser","--kiosk", url1]
	try:
		chromium_process = subprocess.Popen(command)
	except subprocess.CalledProcessError as e:
		logger.error(f"Error running Chromium: {e}")
		
	rfid_id, text = read_rfid()
	if rfid_id is not None:
		url = "http://3.110.77.167:5173/?id=" + str(rfid_id)
		command = ["chromium-browser","--kiosk", url]
		try:
			chromium_process = subprocess.Popen(command)
			time.sleep(30)
			chromium_process.terminate()
			chromium_process.wait() 
		except subprocess.CalledProcessError as e:
			logger.error(f"Error running Chromium: {e}")
	else:
		logger.info("No RFID card detected.")
	time.sleep(2)
