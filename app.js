var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
	res.sendFile(__dirname+"/index.html");
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', ()=>{
		console.log('user disconnected');
	});
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
		console.log('message: '+msg);
	});
});

http.listen(8080,()=>{
	console.log('listening on 8080');
});
