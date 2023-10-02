import { useState } from 'react'
import Chat from './Chat'
import { socket } from './utils/socket'

const App = () => {
	const [username, setUsername] = useState('')
	const [showChat, setShowChat] = useState(false)
	const [room, setRoom] = useState('')

	const onJoinRoom = () => {
		if (room && username) {
			socket.emit('join-room', room)
			setShowChat(true)
		}
	}

	return (
		<>
			{!showChat ? (
				<div className="left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2">
					<p className="text-2xl text-center font-bold mb-4">
						Join chat
					</p>
					<form className="flex flex-col w-80 gap-3 m-auto">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							value={username}
							className="border w-full rounded p-2 border-gray-500"
							onChange={(e) => setUsername(e.target.value)}
						/>
						<label htmlFor="room">Room ID</label>
						<input
							type="text"
							name="room"
							value={room}
							className="border w-full rounded p-2 border-gray-500"
							onChange={(e) => setRoom(e.target.value)}
						/>
						<button
							type="button"
							onClick={onJoinRoom}
							className="rounded border text-white bg-gray-500 p-2 hover:opacity-80"
						>
							Join
						</button>
					</form>
				</div>
			) : (
				<Chat username={username} room={room} />
			)}
		</>
	)
}

export default App
