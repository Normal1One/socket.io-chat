import { FormEvent, useState } from 'react'
import { socket } from '../utils/socket'

const Form = ({ handleSubmit }: { handleSubmit: (value: string) => void }) => {
	const [message, setMessage] = useState('')
	const [room, setRoom] = useState('')

	const onMessageSubmit = (e: FormEvent) => {
		e.preventDefault()
		handleSubmit(message)
		setMessage('')
	}

	const onRoomSubmit = (e: FormEvent) => {
		e.preventDefault()
		socket.emit('join-room', room)
		setMessage('')
	}

	return (
		<div className="flex flex-col gap-4 w-80">
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
			<form className="flex">
				<input
					type="text"
					value={room}
					className="border w-full rounded p-2 border-gray-500"
					onChange={(e) => setRoom(e.target.value)}
				/>
				<button
					type="button"
					onClick={onRoomSubmit}
					className="rounded border w-20 ml-2 text-white bg-gray-500 p-2 hover:opacity-80"
				>
					Join
				</button>
			</form>
		</div>
	)
}

export default Form
