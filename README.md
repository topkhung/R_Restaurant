# R_Restaurant

########################### Run on raspberry pi ###########################

run server.js คือ เปิด webserver Port 8080 พร้อมใช้งานปุ่มกดในตัว ใช้สำหรับเทส 
สั่ง node server.js
Url: 127.0.0.1:8080/index.html

run serial_server.js คือ เปิด Serial over UDP เรียกใช้งานปุ่มกด แล้วส่งค่าไปยัง udp server  ใส่ HostIP ตามด้วย Port
สั่ง node serial_server.js 192.168.31.101 10801


########################### Run on Server ###########################

run k_server.js คือ เปิด webserver Port 8080 พร้อม UDP server โดยรอรับค่าปุ่มกด ผ่าน Udp Socket
