import { Server } from 'socket.io'
import { createServer } from 'http'
import 'dotenv/config'

const PORT = process.env.VITE_SERVER_PORT || 3000

const httpServer = createServer()

const io = new Server(httpServer, {
	cors: {
		origin: `http://localhost:${process.env.VITE_CLIENT_PORT || 3001}`
	}
})

io.on('connection', (socket) => {
	socket.on('send-message', (message, room) => {
		socket.to(room).emit('receive-message', message)
	})
	socket.on('join-room', (room) => {
		socket.join(room)
		console.log(`User with ID: ${socket.id} joined room: ${room}`)
	})
	socket.on('disconnect', () => {
		console.log(`User with ID: ${socket.id} disconnected`)
	})
})

httpServer.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`)
})
