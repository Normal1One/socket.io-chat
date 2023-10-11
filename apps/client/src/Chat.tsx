import { useState, useEffect } from 'react'
import { socket } from './utils/socket'

interface Props {
	username: string
	room: string
	handleLeave: () => void
}

interface Message {
	author: string
	timestamp: string
	message: string
}

const Chat = ({ username, room, handleLeave }: Props) => {
	const [messages, setMessages] = useState<Message[]>([])
	const [currentMessage, setCurrentMessage] = useState('')

	const onMessageSubmit = () => {
		if (currentMessage) {
			const message = {
				message: currentMessage,
				author: username,
				timestamp: new Date().toLocaleString()
			}
			socket.emit('send-message', { ...message, room })
			setMessages((previous) => [...previous, message])
			setCurrentMessage('')
		}
	}

	useEffect(() => {
		document.title = `Room ${room}`
		const onRecieveMessage = (data: Message) => {
			setMessages((previous) => [...previous, data])
		}
		socket.on('receive-message', onRecieveMessage)
		return () => {
			socket.off('receive-message', onRecieveMessage)
		}
	}, [room])

	return (
		<div className="p-40 pt-10 flex flex-col">
			<p className="text-2xl text-center font-bold mb-10">
				{`Room ${room}`}
			</p>
			<div className="flex items-center mb-4 justify-between">
				<button
					type="button"
					className="rounded border self-end text-white bg-gray-500 p-2 hover:opacity-80"
					onClick={handleLeave}
				>
					Leave room
				</button>
			</div>
			<ul className="border border-gray-500 rounded p-4 h-[50vh] overflow-y-scroll mb-4">
				{messages.map((message, index) => (
					<li
						key={index}
						className={
							message.author === username ? 'text-end' : ''
						}
					>{`[${message.timestamp}] - [${message.author}] - ${message.message}`}</li>
				))}
			</ul>
			<form className="flex">
				<input
					type="text"
					value={currentMessage}
					className="border w-full rounded p-2 border-gray-500"
					onChange={(e) => setCurrentMessage(e.target.value)}
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
