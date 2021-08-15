const express = require('express')
const app = express()

app.use(express.static('public'))

const http = require('http').Server(app)
const serverSocket = require('socket.io')(http)

const porta = 8080

http.listen(porta, function(){
    console.log('Conexão bem sucedida, abra o seu navegador em http//localhost'+ porta)
})

app.get('/', function(req, resp){
    resp.sendFile(__dirname + '/index.html')
})


serverSocket.on('connection', function(socket){

    socket.on('chat msg', function(msg){
        //console.log(`Msg recebida do cliente ${nickname} : ${msg}`)
        serverSocket.emit('chat msg', `Usuário : ${msg}`)
    })
})