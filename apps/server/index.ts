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

client.connect()

io.on('connection', (socket) => {
	socket.on('join-room', async (data) => {
		const roomNames = await client.sMembers('room-names')

		if (!roomNames.includes(data.room)) {
			await client.hSet('rooms', data.room, JSON.stringify(data))
			await client.sAdd('room-names', data.room)
		}

		const room = (await client.hGet('rooms', data.room)) as string

		if (!('secretKey' in JSON.parse(room))) {
			socket.join(data.room)
			return
		}

		if (JSON.parse(room).secretKey === data.secretKey) {
			socket.join(data.room)
		} else {
			console.log('Wrong key!')
		}

		io.to(data.room).emit(
			'connected-users',
			io.sockets.adapter.rooms.get(data.room)?.size
		)
	})
	socket.on('send-message', (data) => {
		socket.to(data.room).emit('receive-message', data)
	})
	socket.on('leave-room', (room) => {
		socket.leave(room)
		io.to(room).emit(
			'connected-users',
			io.sockets.adapter.rooms.get(room)?.size
		)
	})
})

httpServer.listen(SERVER_PORT, () => {
	console.log(`Listening on port: ${SERVER_PORT}`)
})
