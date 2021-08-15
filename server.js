const express = require('express')
const app = express()

app.use(express.static('public'))

const http = require('http').Server(app)
const serverSocket = require('socket.io')(http)


const porta = process.env.PORT || 8000 //sera mudado

const host = process.env.HEROKU_APP_NAME ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com` : 'http://localhost'

http.listen(porta, function(){
    console.log('Conexão bem sucedida, abra o seu navegador em http//localhost'+ porta)
    
    const portaStr = porta === 80 ?'' : ':' + porta

    if(process.env.HEROKU_APP_NAME)
    {
        console.log('servidor iniciado abra o navegador em ' + host)
    }else
    {
        console.log('servidor iniciado abra o navegador em ' + host + portaStr)
    }
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
