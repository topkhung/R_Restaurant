const dgram = require('dgram');
const udp_server_k1 = dgram.createSocket('udp4');
const udp_port_k1 = 10801;
// const udp_host_k1 = '127.0.0.1';
// const udp_host_k1 = '192.168.31.101';

const args = process.argv.slice(2);
const udp_host_k1 = args[0];

console.log("ServerIP: ",udp_host_k1)

port_name = "/dev/ttyUSB0";
// port_name = "COM12";
const SerialPort = require('serialport');

var client = dgram.createSocket('udp4');

var sw_msg = [];
var connectArd = function() {

  const esp32Serial = new SerialPort(port_name, {baudRate: 115200})

  // do something with incoming data
  esp32Serial.on('data', function (data) {
    sw_msg = data;
    // console.log(sw_msg[0]);

    // var message = new Buffer(sw_msg[0]);

    var message = Buffer.from(data);


    client.send(message, udp_port_k1, udp_host_k1, (err) => {
      console.log('UDP sent: '+message+' to ' + udp_host_k1 +':'+ udp_port_k1);
      // client.close();
    });

    // client.send(message, 0, message.length, udp_port_k1, udp_host_k1, function(err, bytes) {
    //   if (err) throw err;
    //   console.log('UDP '+message+' sent to ' + udp_host_k1 +':'+ udp_port_k1);
    //   client.close();
    // });

  });

  esp32Serial.on('close', function(){
    console.log('ControlBox PORT CLOSED');
    reconnectArd();
  });

  esp32Serial.on('error', function (err) {
    console.error("error", err);
    reconnectArd();
  });

}

connectArd();

// check for connection errors or drops and reconnect
var reconnectArd = function () {
  console.log('INITIATING RECONNECT');
  setTimeout(function(){
    console.log('RECONNECTING TO ControlBox');
    connectArd();
  }, 2000);
};
// {"_id":"1","menu":"sdfsdf","table":"1","qty":"1","set#":"1","timeout":"4","orderTime":"18:00:30"}
//ยกเลิกของในเมนูโดยลดจำนวนไม่ได้
//monitor 1280x1024
