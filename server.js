const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const socketport = 8080;

port_name = "/dev/ttyUSB0";
// port_name = "COM12";
const SerialPort = require('serialport');

var cr_index = 0;
var pr_index = 0;
var table = 1;
var data_id = "";

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/todo";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });

// var db = require('diskdb');
// db = db.connect('./db', ['todo']);

// var DiskDB = require('diskdb');
// var db_todo = DiskDB.connect('./db', ['todo']);
// db_todo.loadCollections(['todo']);

// var db_doing = DiskDB.connect('./db', ['doing']);
// db_doing.loadCollections(['doing']);

// var disk1 = {
//     _id : "1",
//     menu : "กุ้งเผา",
//     table : "1",
//     qty : "1",
//     _set : "1",
//     timeout : "4",
//     orderTime : "18:00:30",
//     etc : "",
//     index_id : "1"
// }

// var disk2 = {
//     menu_id : "2",
//     menu : "กุ้งเผา",
//     table : "2",
//     qty : "1",
//     _set : "1",
//     timeout : "4",
//     orderTime : "18:00:30",
//     etc : "",
//     index_id : "2"
// }


// var saveddb_todo = db_todo.todo.save(disk1);
// var saveddb_doing = db_doing.doing.save(disk2);


// //findAll
// var foundArticles = db_doing.doing.find({menu_id : "2"});
// console.log(foundArticles);

// middleware 1
// app.use(function(req, res, next){

//   console.log(req.method + ' ' + req.url)

//   next();

// });

// middleware 2
app.use(express.static(path.resolve(__dirname, "public")));

app.get('/', function(req, res){

  res.sendFile(path.resolve('index.html'));

});

// middleware 3
app.use(function(req, res){

  res.redirect('/');

});


io.on('connection', (socket) => {

  // setInterval(() => {

  //     cr_index++;
  //     if((cr_index > 15)&&(cr_index < 100)){ cr_index = 100;}
  //     else if(cr_index > 115){ cr_index = 0;}

  //     io.emit('index', cr_index);
  //     io.emit('pr_index', pr_index);

  //     pr_index = cr_index;
  //     // console.log(msg);

  // }, 2000);

  socket.on('id', function (data) {
    data_id = data;
    console.log("data_id:",data_id);
  });

});




server.listen(socketport, function(){

  console.log('Server listening on port '+socketport+'!')

});


var sw_msg = [];
var connectArd = function() {

  const esp32Serial = new SerialPort(port_name, {baudRate: 115200})

  // do something with incoming data
  esp32Serial.on('data', function (data) {
    sw_msg = data;
    console.log(sw_msg[0]);

    if(sw_msg[0] == 49){}
    else if(sw_msg[0] == 50)
      {
        if(table == 1){table = 2; cr_index += 100;}
        else if(table == 2){table = 1; cr_index -= 100;}
        
        io.emit('index', cr_index);
        io.emit('pr_index', pr_index);
      }
    else if(sw_msg[0] == 51)
      {

      }
    else if(sw_msg[0] == 52)
      { 
        if(table == 1)
        {
          cr_index++; 
          if(cr_index>99){cr_index =99;}
        }
        else if(table == 2)
        {
          cr_index++; 
          if(cr_index>199){cr_index =199;}
        }

        io.emit('index', cr_index);
        io.emit('pr_index', pr_index);
      }
    else if(sw_msg[0] == 53)
      { 
        
        if(table == 1)
        {
          cr_index--; 
          if(cr_index<=0){cr_index =0;}
        }
        else if(table == 2)
        {
          cr_index--; 
          if(cr_index<=100){cr_index =100;}
        }
        
        io.emit('index', cr_index);
        io.emit('pr_index', pr_index);
      }
      pr_index = cr_index;

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
