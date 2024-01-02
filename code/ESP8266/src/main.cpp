#include <Arduino.h>
#include <ESP8266WiFi.h>

const char* ssid = "Redmi Note 8";
const char* password = "12345678";

void wifi_setup(){
  // Starting the serial communication with baud rate of 115200 bits per second
  Serial.begin(115200);
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  // Connecting to the wifi network
  WiFi.begin(ssid, password);
  // Waiting for the wifi connection
  while (WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP()); // Printing the IP address
  
}

void setup() {

  wifi_setup();
  
}

void loop() {
  // put your main code here, to run repeatedly:
}

// put function definitions here:
int myFunction(int x, int y) {
  return x + y;
}