import { Server } from 'socket.io'
import 'dotenv/config'

const server = new Server({
	cors: {
		origin: `http://127.0.0.1:${process.env.VITE_CLIENT_PORT || 3001}`
	}
})

server.on('connection', (socket) => {
	console.log(socket.id)
	socket.on('send-message', (message, room) => {
		if (room === '') {
			socket.broadcast.emit('receive-message', message)
		} else {
			socket.to(room).emit('receive-message', message)
		}
	})
	socket.on('join-room', (room) => {
		socket.join(room)
	})
})

server.listen(process.env.VITE_SERVER_PORT || 3000)
