const express = require('express');
const app = express();
const socketio = require('socket.io');
const chokidar = require('chokidar');

app.use(express.static(__dirname+'/public'));

const expressServer = app.listen(8001, ()=> {
    console.log('server is running at '+ 8001)
});
// io = the server object in the docs!

io = socketio(expressServer)

io.on('connection', (socket) => {
    console.log(socket.id,"has connected");
    socket.emit('messageFromServer',{data:"Socket is stablist with server!"});
    socket.on('newMessageToServer',(dataFromClient)=>{
        console.log("Data:",dataFromClient);
        io.emit('newMessageToClients',{text:dataFromClient.text});
        
    });    
});

const watcher = chokidar.watch(__dirname+'/demo.txt');

watcher.on('change', function(path, stats) {
    console.log('File', path, 'changed size to', stats.size);
    io.emit('newMessageToClients',{text:new Date()});
});


