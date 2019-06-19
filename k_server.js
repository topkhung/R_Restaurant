const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const socketport = 8080;

const dgram = require('dgram');
const udp_server_k1 = dgram.createSocket('udp4');
const udp_server_k2 = dgram.createSocket('udp4');
const udp_server_k3 = dgram.createSocket('udp4');
const udp_server_k4 = dgram.createSocket('udp4');

const udp_port_k1 = 10801;
const udp_port_k2 = 10802;
const udp_port_k3 = 10803;
const udp_port_k4 = 10804;

var cr_index_k1 = 0;
var pr_index_k1 = 0;
var table_k1 = 1;
var data_id_k1 = "";
var sw_msg_k1 = [];

var cr_index_k2 = 0;
var pr_index_k2 = 0;
var table_k2 = 1;
var data_id_k2 = "";
var sw_msg_k2 = [];

var cr_index_k3 = 0;
var pr_index_k3 = 0;
var table_k3 = 1;
var data_id_k3 = "";
var sw_msg_k3 = [];

var cr_index_k4 = 0;
var pr_index_k4 = 0;
var table_k4 = 1;
var data_id_k4 = "";
var sw_msg_k4 = [];


//////////////////kitchen 1////////////////////////////
udp_server_k1.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  udp_server_k1.close();
});

udp_server_k1.on('message', (msg, rinfo) => {

  // console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  sw_msg_k1 = msg;
  console.log(sw_msg_k1[0]);

  if(sw_msg_k1[0] == 49)
    {
      ///////////////รับปุ่มเขียว///////////////
    }
  else if(sw_msg_k1[0] == 50)
    {
      if(table_k1 == 1){table_k1 = 2; cr_index_k1 += 100;}
      else if(table_k1 == 2){table_k1 = 1; cr_index_k1 -= 100;}
      
      io.emit('index_k1', cr_index_k1);
      io.emit('pr_index_k1', pr_index_k1);
    }
  else if(sw_msg_k1[0] == 51)
    {
      ///////////////รับปุ่มเหลือง///////////////
    }
  else if(sw_msg_k1[0] == 52)
    { 
      if(table_k1 == 1)
      {
        cr_index_k1++; 
        if(cr_index_k1>99){cr_index_k1 =99;}
      }
      else if(table_k1 == 2)
      {
        cr_index_k1++; 
        if(cr_index_k1>199){cr_index_k1 =199;}
      }

      io.emit('index_k1', cr_index_k1);
      io.emit('pr_index_k1', pr_index_k1);
    }
  else if(sw_msg_k1[0] == 53)
    { 
      
      if(table_k1 == 1)
      {
        cr_index_k1--; 
        if(cr_index_k1<=0){cr_index_k1 =0;}
      }
      else if(table_k1 == 2)
      {
        cr_index_k1--; 
        if(cr_index_k1<=100){cr_index_k1 =100;}
      }
      
      io.emit('index_k1', cr_index_k1);
      io.emit('pr_index_k1', pr_index_k1);
    }
    pr_index_k1 = cr_index_k1;


});

udp_server_k1.on('listening', () => {
  const address = udp_server_k1.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

udp_server_k1.bind(udp_port_k1);


io.on('connection', (socket) => {

  socket.on('id_k1', function (data) {
    data_id_k1 = data;
    console.log("data_id_k1:",data_id_k1);
  });

});

/////////////////////////////////////////////////////////////////////

//////////////////kitchen 2////////////////////////////
udp_server_k2.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  udp_server_k2.close();
});

udp_server_k2.on('message', (msg, rinfo) => {

  // console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  sw_msg_k2 = msg;
  console.log(sw_msg_k2[0]);

  if(sw_msg_k2[0] == 49)
    {
      ///////////////รับปุ่มเขียว///////////////
    }
  else if(sw_msg_k2[0] == 50)
    {
      if(table_k2 == 1){table_k2 = 2; cr_index_k2 += 100;}
      else if(table_k2 == 2){table_k2 = 1; cr_index_k2 -= 100;}
      
      io.emit('index_k2', cr_index_k2);
      io.emit('pr_index_k2', pr_index_k2);
    }
  else if(sw_msg_k2[0] == 51)
    {
      ///////////////รับปุ่มเหลือง///////////////
    }
  else if(sw_msg_k2[0] == 52)
    { 
      if(table_k2 == 1)
      {
        cr_index_k2++; 
        if(cr_index_k2>99){cr_index_k2 =99;}
      }
      else if(table_k2 == 2)
      {
        cr_index_k2++; 
        if(cr_index_k2>199){cr_index_k2 =199;}
      }

      io.emit('index_k2', cr_index_k2);
      io.emit('pr_index_k2', pr_index_k2);
    }
  else if(sw_msg_k2[0] == 53)
    { 
      
      if(table_k2 == 1)
      {
        cr_index_k2--; 
        if(cr_index_k2<=0){cr_index_k2 =0;}
      }
      else if(table_k2 == 2)
      {
        cr_index_k2--; 
        if(cr_index_k2<=100){cr_index_k2 =100;}
      }
      
      io.emit('index_k2', cr_index_k2);
      io.emit('pr_index_k2', pr_index_k2);
    }
    pr_index_k2 = cr_index_k2;


});

udp_server_k2.on('listening', () => {
  const address = udp_server_k2.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

udp_server_k2.bind(udp_port_k2);


io.on('connection', (socket) => {

  socket.on('id_k2', function (data) {
    data_id_k2 = data;
    console.log("data_id_k1:",data_id_k2);
  });

});

/////////////////////////////////////////////////////////////////////


//////////////////kitchen 3////////////////////////////
udp_server_k3.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  udp_server_k3.close();
});

udp_server_k3.on('message', (msg, rinfo) => {

  // console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  sw_msg_k3 = msg;
  console.log(sw_msg_k3[0]);

  if(sw_msg_k3[0] == 49)
    {
      ///////////////รับปุ่มเขียว///////////////
    }
  else if(sw_msg_k3[0] == 50)
    {
      if(table_k3 == 1){table_k3 = 2; cr_index_k3 += 100;}
      else if(table_k3 == 2){table_k3 = 1; cr_index_k3 -= 100;}
      
      io.emit('index_k3', cr_index_k3);
      io.emit('pr_index_k3', pr_index_k3);
    }
  else if(sw_msg_k3[0] == 51)
    {
      ///////////////รับปุ่มเหลือง///////////////
    }
  else if(sw_msg_k3[0] == 52)
    { 
      if(table_k3 == 1)
      {
        cr_index_k3++; 
        if(cr_index_k3>99){cr_index_k3 =99;}
      }
      else if(table_k3 == 2)
      {
        cr_index_k3++; 
        if(cr_index_k3>199){cr_index_k3 =199;}
      }

      io.emit('index_k2', cr_index_k3);
      io.emit('pr_index_k2', pr_index_k3);
    }
  else if(sw_msg_k3[0] == 53)
    { 
      
      if(table_k3 == 1)
      {
        cr_index_k3--; 
        if(cr_index_k3<=0){cr_index_k3 =0;}
      }
      else if(table_k3 == 2)
      {
        cr_index_k3--; 
        if(cr_index_k3<=100){cr_index_k3 =100;}
      }
      
      io.emit('index_k3', cr_index_k3);
      io.emit('pr_index_k3', pr_index_k3);
    }
    pr_index_k3 = cr_index_k3;


});

udp_server_k3.on('listening', () => {
  const address = udp_server_k3.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

udp_server_k3.bind(udp_port_k3);


io.on('connection', (socket) => {

  socket.on('id_k3', function (data) {
    data_id_k3 = data;
    console.log("data_id_k3:",data_id_k3);
  });

});

/////////////////////////////////////////////////////////////////////


//////////////////kitchen 4////////////////////////////
udp_server_k4.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  udp_server_k4.close();
});

udp_server_k4.on('message', (msg, rinfo) => {

  // console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  sw_msg_k4 = msg;
  console.log(sw_msg_k4[0]);

  if(sw_msg_k4[0] == 49)
    {
      ///////////////รับปุ่มเขียว///////////////
    }
  else if(sw_msg_k4[0] == 50)
    {
      if(table_k4 == 1){table_k4 = 2; cr_index_k4 += 100;}
      else if(table_k4 == 2){table_k4 = 1; cr_index_k4 -= 100;}
      
      io.emit('index_k4', cr_index_k4);
      io.emit('pr_index_k4', pr_index_k4);
    }
  else if(sw_msg_k4[0] == 51)
    {
      ///////////////รับปุ่มเหลือง///////////////
    }
  else if(sw_msg_k4[0] == 52)
    { 
      if(table_k4 == 1)
      {
        cr_index_k4++; 
        if(cr_index_k4>99){cr_index_k4 =99;}
      }
      else if(table_k4 == 2)
      {
        cr_index_k4++; 
        if(cr_index_k4>199){cr_index_k4 =199;}
      }

      io.emit('index_k4', cr_index_k4);
      io.emit('pr_index_k4', pr_index_k4);
    }
  else if(sw_msg_k4[0] == 53)
    { 
      
      if(table_k4 == 1)
      {
        cr_index_k4--; 
        if(cr_index_k4<=0){cr_index_k4 =0;}
      }
      else if(table_k4 == 2)
      {
        cr_index_k4--; 
        if(cr_index_k4<=100){cr_index_k4 =100;}
      }
      
      io.emit('index_k4', cr_index_k4);
      io.emit('pr_index_k4', pr_index_k4);
    }
    pr_index_k4 = cr_index_k4;


});

udp_server_k4.on('listening', () => {
  const address = udp_server_k4.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

udp_server_k4.bind(udp_port_k4);


io.on('connection', (socket) => {

  socket.on('id_k4', function (data) {
    data_id_k4 = data;
    console.log("data_id_k4:",data_id_k4);
  });

});

/////////////////////////////////////////////////////////////////////

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


server.listen(socketport, function(){

  console.log('Server listening on port '+socketport+'!')

});


// {"_id":"1","menu":"sdfsdf","table":"1","qty":"1","set#":"1","timeout":"4","orderTime":"18:00:30"}
//ยกเลิกของในเมนูโดยลดจำนวนไม่ได้
//monitor 1280x1024
