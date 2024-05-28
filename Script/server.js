const express = require('express')
const path = require('path')
const port = 3000

const app = express()
const server = require('http').createServer(app)

server.listen(port, () => console.log(`Listening on port ${port}`));

const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname+"/public")))

io.on("connection", (socket) => {
    socket.on('newuser', (username) => {
        socket.broadcast.emit('update', username + 'joined the conversation')
    })

    socket.on('exituser', (username) => {
        socket.broadcast.emit('update', username + 'left the conversation')
    })

    socket.on('chat', (message) => {
        socket.broadcast.emit('chat', message)
    })
})