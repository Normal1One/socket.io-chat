import { io } from 'socket.io-client'

export const socket = io(`ws://localhost:${import.meta.env.VITE_SERVER_PORT || 3000}`)
