import { useEffect, useState } from 'react'
import Events from './components/Events'
import Form from './components/Form'
import { socket } from './utils/socket'

const App = () => {
	const [messages, setMessages] = useState<string[]>([])

	const handleSubmit = (message: string) => {
		setMessages((previous) => [...previous, message])
		socket.emit('send-message', message)
	}

	useEffect(() => {
		socket.on('connect', () => {
			setMessages((previous) => [
				...previous,
				`You connected with id: ${socket.id}`
			])
		})
		socket.on('receive-message', (message) => {
			setMessages((previous) => [...previous, message])
		})
	}, [])

	return (
		<div className="w-80 m-auto">
			<Events events={messages} />
			<Form handleSubmit={handleSubmit} />
		</div>
	)
}

export default App
