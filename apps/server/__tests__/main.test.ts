import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import Client from 'socket.io-client'
import { describe, beforeAll, afterAll, test, expect } from '@jest/globals'

describe('socket.io-project', () => {
	let io: Server,
		serverSocket: Socket,
		clientSocket: ReturnType<typeof Client>

	beforeAll((done) => {
		const httpServer = createServer()
		io = new Server(httpServer)
		httpServer.listen(3000, () => {
			clientSocket = Client('http://localhost:3000')
			io.on('connection', (socket) => {
				serverSocket = socket
			})
			clientSocket.on('connect', done)
		})
	})

	afterAll(() => {
		io.close()
		clientSocket.close()
	})

	test('Basic emit', (done) => {
		clientSocket.on('hello', (arg) => {
			expect(arg).toBe('world')
			done()
		})
		serverSocket.emit('hello', 'world')
	})

	test('Basic emit (with ack)', (done) => {
		serverSocket.on('hi', (cb) => {
			cb('hola')
		})
		clientSocket.emit('hi', (arg: string) => {
			expect(arg).toBe('hola')
			done()
		})
	})
})
