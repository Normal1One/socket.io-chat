import { io } from 'socket.io-client'

const PORT = import.meta.env.VITE_SERVER_PORT || 3000

export const socket = io(`ws://localhost:${PORT}`)
