'use client'

import { useEffect, useState } from 'react'
import ConnectionManager from '../components/ConnectionManager'
import ConnectionState from '../components/ConnectionState'
import Events from '../components/Events'
import Form from '../components/Form'
import { socket } from '../utils/socket'

const Home = () => {
	const [isConnected, setIsConnected] = useState(socket.connected)
	const [messages, setMessages] = useState<string[]>([])

	useEffect(() => {
		const onConnect = () => {
			setIsConnected(true)
		}

		const onDisconnect = () => {
			setIsConnected(false)
		}

		const onMessage = (value: string) => {
			setMessages((previous) => [...previous, value])
		}

		socket.on('connect', onConnect)
		socket.on('disconnect', onDisconnect)
		socket.on('message', onMessage)

		return () => {
			socket.off('connect', onConnect)
			socket.off('disconnect', onDisconnect)
			socket.off('message', onMessage)
		}
	}, [])

	return (
		<div className="App">
			<ConnectionState isConnected={isConnected} />
			<Events events={messages} />
			<ConnectionManager />
			<Form />
		</div>
	)
}

export default Home
