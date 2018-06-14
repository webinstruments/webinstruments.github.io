let app = require('express')();
let server = require('http').Server(app);
let io = require('socket.io')(server);

let start = false;
let ws1Bool, ws2Bool, ws3Bool, ws4Bool, ws5Bool, ws6Bool, ws7Bool, ws8Bool;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080);

io.on('connection', function (socket) {
    socket.emit('announcements', { message: 'A new Client has joined!' })
    start = true;

    if (start == true) {
        console.log('start is true');
        setInterval(function () {

            //ws1
            ws1Bool = Math.random() >= 0.5;
            socket.emit('ws1', { message: ws1Bool })
            console.log('ws1: ' + ws1Bool);

            //ws2
            ws2Bool = Math.random() >= 0.5;
            socket.emit('ws2', { message: ws2Bool })
            console.log('ws2: ' + ws2Bool);

            //ws3
            ws3Bool = Math.random() >= 0.5;
            socket.emit('ws3', { message: ws3Bool })
            console.log('ws3: ' + ws3Bool);

            //ws4
            ws4Bool = Math.random() >= 0.5;
            socket.emit('ws4', { message: ws4Bool })
            console.log('ws4: ' + ws4Bool);
        }, 500);

        setInterval(function () {

            //ws5
            ws5Bool = Math.random() >= 0.5;
            socket.emit('ws5', { message: ws5Bool })
            console.log('ws5: ' + ws5Bool);

            //ws6
            ws6Bool = Math.random() >= 0.5;
            socket.emit('ws6', { message: ws6Bool })
            console.log('ws6: ' + ws6Bool);

            //ws7
            ws7Bool = Math.random() >= 0.5;
            socket.emit('ws7', { message: ws7Bool })
            console.log('ws7: ' + ws7Bool);

            //ws8
            ws8Bool = Math.random() >= 0.5;
            socket.emit('ws8', { message: ws8Bool })
            console.log('ws8: ' + ws8Bool);
        }, 200);
    }
    console.log('connection: ' + start);
});