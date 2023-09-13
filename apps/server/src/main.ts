import { Server } from 'socket.io'

const io = new Server({
	cors: {
		origin: 'http://localhost:3000'
	}
})

io.on('connection', (socket) => {
	console.log(socket.id)
	socket.on('message', (message) => {
		console.log('New message: ', message)
		socket.broadcast.emit('message', message)
	})
	socket.on('disconnect', (reason) => {
		console.log(`User disconnected: ${reason}`)
	})
})

io.listen(3000)
