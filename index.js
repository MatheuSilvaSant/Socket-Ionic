let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
 

app.get('/', (req, res)=>{
  res.sendFile(__dirname+'/index.html')
})

// io.on('connection', (socket)=>{
//   console.log('new connection', socket.id)
// })

// server.listen(3000, function(){
//   console.log('Listening on port 3000')
// });




io.on('connection', (socket) => {
 
  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.username, event: 'left'});   
  });
 
  socket.on('set-name', (name) => {
    socket.username = name;
    io.emit('users-changed', {user: name, event: 'joined'});    
  });
  
  socket.on('send-message', (message) => {
    io.emit('message', {msg: message.text, user: socket.username, createdAt: new Date()});    
  });
});
 
var port = process.env.PORT || 3002;
 
server.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});