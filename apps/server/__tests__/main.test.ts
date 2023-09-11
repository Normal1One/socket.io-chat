import { createServer } from 'http'
import { Server } from 'socket.io'
import Client from 'socket.io-client'
import { describe, beforeAll, afterAll, test, expect } from '@jest/globals'

const port = process.env.PORT | 3000

describe('socket.io-project', () => {
	let io, serverSocket, clientSocket

	beforeAll((done) => {
		const httpServer = createServer()
		io = new Server(httpServer)
		httpServer.listen(port, () => {
			clientSocket = Client(`http://localhost:${port}`)
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

	test('should work', (done) => {
		clientSocket.on('hello', (arg) => {
			expect(arg).toBe('world')
			done()
		})
		serverSocket.emit('hello', 'world')
	})

	test('should work (with ack)', (done) => {
		serverSocket.on('hi', (cb) => {
			cb('hola')
		})
		clientSocket.emit('hi', (arg) => {
			expect(arg).toBe('hola')
			done()
		})
	})
})
