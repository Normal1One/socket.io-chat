import { useState, useEffect } from 'react'
import { socket } from './utils/socket'

interface Props {
	username: string
	room: string
}

const Chat = ({ username, room }: Props) => {
	const [messages, setMessages] = useState<string[]>([])
	const [message, setMessage] = useState('')

	const onMessageSubmit = () => {
		setMessages((previous) => [...previous, message])
		socket.emit('send-message', message)
		setMessage('')
	}

	useEffect(() => {
		socket.on('receive-message', (message) => {
			setMessages((previous) => [...previous, message])
		})
	}, [])

	return (
		<div className="p-20 pt-10">
			<p className="text-2xl text-center font-bold mb-10">
				{`Room ${room}`}
			</p>
			<ul className="border border-gray-500 rounded h-80 p-2 mb-4">
				{messages.map((message, index) => (
					<li
						key={index}
					>{`[${new Date().toLocaleString()}] - [${username}] - ${message}`}</li>
				))}
			</ul>
			<form className="flex">
				<input
					type="text"
					value={message}
					className="border w-full rounded p-2 border-gray-500"
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button
					type="button"
					onClick={onMessageSubmit}
					className="rounded border w-20 ml-2 text-white bg-gray-500 p-2 hover:opacity-80"
				>
					Send
				</button>
			</form>
		</div>
	)
}

export default Chat
