import { Server } from 'socket.io'
import { createServer } from 'http'
import { createClient } from 'redis'
import 'dotenv/config'

const SERVER_PORT = process.env.VITE_SERVER_PORT || 3000
const CLIENT_PORT = process.env.VITE_CLIENT_PORT || 3001

const httpServer = createServer()

const client = createClient()

const io = new Server(httpServer, {
	cors: {
		origin: [
			`http://localhost:${CLIENT_PORT}`,
			`http://127.0.0.1:${CLIENT_PORT}`
		]
	}
})

io.on('connection', (socket) => {
	socket.on('join-room', async (data) => {
		const rooms = await client.lRange('rooms', 0, -1)
		const room = rooms.find((elem) => JSON.parse(elem).room === data.room)
		if (room) {
			if ('secretKey' in JSON.parse(room)) {
				if (JSON.parse(room).secretKey === data.secretKey) {
					socket.join(data.room)
				} else {
					console.log('Wrong key!')
				}
			} else {
				socket.join(data.room)
			}
		} else {
			client.rPush('rooms', JSON.stringify(data))
			socket.join(data.room)
		}
	})
	socket.on('send-message', (data) => {
		socket.to(data.room).emit('receive-message', data)
	})
	socket.on('leave-room', (room) => {
		socket.leave(room)
	})
})

httpServer.listen(SERVER_PORT, () => {
	console.log(`Listening on port: ${SERVER_PORT}`)
})
