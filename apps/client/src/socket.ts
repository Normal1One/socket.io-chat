import { io } from 'socket.io-client'

export const socket = io(`ws://localhost:${process.env.SERVER_PORT || 3000}`)
