const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require("fs");

var nextProblem = '';

//Whenever someone connects this getns executed
io.on('connection', function(socket) {
    console.log('A user connected');



    // Socket disconnect
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });

    socket.on('room_connect', (msg) => {
        socket.join(msg);
    });


    socket.on('comp', (msg) => {
        socket.join(msg.room_id);
        socket.to('asd').emit("newDot", msg);
    })

    socket.on('die', (args) =>
        {
            socket.to(args.room_id).emit('newDot', args);
        })

 });



// This displays message that the server is running and listening to specified port
http.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/', (req, res) => {
    console.log("printing from the server f3f134g");
  res.sendFile(__dirname + '/dev/index.html');
});

app.get('/snow.html', (req, res) => {
    console.log("printing from the server f3f134g");
    res.sendFile(__dirname + '/dev/snow.html');
});

app.get('/temp.txt', (req, res) => {
    console.log("printing from the server sending");
    getRandomLine("dev/mathProblems.txt", null);
    res.sendFile(__dirname + '/dev/mathProblems.txt');
});

app.get('/temp.txt', (req, res) => {
    console.log("printing from the server sending");
    getRandomLine("dev/mathProblems.txt", null);
    res.sendFile(__dirname + '/dev/mathProblems.txt');
});

app.get('/sketch.js', (req, res) => {
    console.log("printing from the server sending");
    res.sendFile(__dirname + '/dev/sketch.js');
});

app.get('/snowflake.jpg', (req, res) => {
    console.log("printing from the server sending");
    res.sendFile(__dirname + '/dev/snowflake.jpg');
});






function getRandomLine(filename, callback){
  fs.readFile(filename, "utf-8", function(err, data){
    if(err) {
        throw err;
    }

    // note: this assumes `data` is a string - you may need
    //       to coerce it - see the comments for an approach
    var lines = data.split('\n');

    // choose one of the lines...
    var line = lines[Math.floor(Math.random()*lines.length)]

    // invoke the callback with our line
    nextProblem = line;
 })
}
