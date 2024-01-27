#include <SPI.h>
#include <MFRC522.h>
#include <PubSubClient.h>
#include <ESP8266WiFi.h>
#include <time.h>
#include <FS.h>
#include <BearSSLHelpers.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>
#include "secrets.h"


#define RST_PIN         D3          // Configurable, see typical pin layout above
#define SS_PIN          D8         // Configurable, see typical pin layout above
#define LED_PIN         D4          // Built-in LED on NodeMCU

#define AWS_IOT_PUBLISH_TOPIC   "esp8266/pub"
#define AWS_IOT_SUBSCRIBE_TOPIC "esp8266/sub"

MFRC522 mfrc522(SS_PIN, RST_PIN);  // Create MFRC522 instance


WiFiClientSecure net;
BearSSL::X509List cert(cacert);
BearSSL::X509List client_crt(client_cert);
BearSSL::PrivateKey key(privkey);
PubSubClient client(net);

char uidString[20];
char prevUidString[20] = {'\0'};
char* roomID = "1";
char timestamp[20];

time_t now;
time_t nowish = 1510592825;

unsigned long lastMillis = 0;
unsigned long previousMillis = 0;
const long interval = 5000;

void NTPConnect(void)
{
  Serial.print("Setting time using SNTP");
  configTime(TIME_ZONE * 3600, 0 * 3600, "pool.ntp.org", "time.nist.gov");
  now = time(nullptr);
  while (now < nowish)
  {
    delay(500);
    Serial.print(".");
    now = time(nullptr);
  }
  Serial.println("done!");
  struct tm timeinfo;
  gmtime_r(&now, &timeinfo);
  Serial.print("Current time: ");
  Serial.print(asctime(&timeinfo));
}

void messageReceived(char *topic, byte *payload, unsigned int length)
{
  Serial.print("Received [");
  Serial.print(topic);
  Serial.print("]: ");
  for (int i = 0; i < length; i++)
  {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void connectAWS()
{
  delay(3000);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.println(String("Attempting to connect to SSID: ") + String(WIFI_SSID));
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(1000);
  }
  NTPConnect();
  net.setTrustAnchors(&cert);
  net.setClientRSACert(&client_crt, &key);
  client.setServer(MQTT_HOST, 8883);
  client.setCallback(messageReceived);
  Serial.println("Connecting to AWS IOT");
  while (!client.connect(THINGNAME))
  {
    Serial.print(".");
    delay(1000);
  }
  if (!client.connected()) {
    Serial.println("AWS IoT Timeout!");
    return;
  }
  // Subscribe to a topic
  client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC);
  Serial.println("AWS IoT Connected!");
}

void publishMessage()
{
  StaticJsonDocument<200> doc;
  doc["time"] = String(timestamp);
  doc["roomID"] =String(roomID);
  doc["rfid_id"] = String(uidString);

  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer); // print to client
  client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);
}

void setup() {


  delay(2000); // Wait for 2 seconds

  SPI.begin();      // Init SPI bus
  mfrc522.PCD_Init(); // Init MFRC522 card

  pinMode(LED_PIN, OUTPUT); // Set the LED pin as output
  digitalWrite(LED_PIN, HIGH); // Turn off the LED (it's active low)

  Serial.begin(9600); // Initialize serial communications with the PC
  connectAWS();
}

void loop() {
 

  // Look for new cards
  if ( ! mfrc522.PICC_IsNewCardPresent()) {
    Serial.println("No new card present");
    return;
  }

  // Select one of the cards
  if ( ! mfrc522.PICC_ReadCardSerial()) {
    return;
  }

  // Blink the LED
  digitalWrite(LED_PIN, LOW); // Turn on the LED
  delay(1000); // Wait for a second
  digitalWrite(LED_PIN, HIGH); // Turn off the LED


  // Convert the UID bytes to a string
  for (byte i = 0; i < mfrc522.uid.size; i++) {
      sprintf(&uidString[i*2], "%02X", mfrc522.uid.uidByte[i]);
  }

setenv("TZ", "IST-5:30", 1);
tzset();
configTime(5.5 * 3600, 0, "pool.ntp.org", "time.nist.gov");
time_t now = time(nullptr);
struct tm* timeinfo;


timeinfo = localtime(&now);
strftime(timestamp, sizeof(timestamp), "%Y-%m-%d %H:%M:%S", timeinfo);


  mfrc522.PICC_DumpToSerial(&(mfrc522.uid));
  
  if (!client.connected())
  {
    connectAWS();
  }
  else
  {
    client.loop();
    if (millis() - lastMillis > 5000)
    {
      lastMillis = millis();
      if(strcmp(uidString, prevUidString) != 0){
        strcpy(prevUidString, uidString);
        publishMessage();
      }
      
    }
  }
}