import { Server } from 'socket.io'

const io = new Server()

io.on('connection', (socket) => {
	console.log(socket.id)
	socket.on('message', (message) => {
		socket.emit(`Received message: ${message}`)
	})
	socket.on('disconnect', () => {
		console.log(`User disconnected ${socket.id}`)
	})
})

io.listen(3000)
