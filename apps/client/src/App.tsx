import { useEffect, useState } from 'react'
import Chat from './Chat'
import { socket } from './utils/socket'

const App = () => {
	const [username, setUsername] = useState('')
	const [room, setRoom] = useState('')
	const [secretKey, setSecretKey] = useState('')
	const [showChat, setShowChat] = useState(false)
	const [saveMessages, setSaveMessages] = useState(true)

	const onJoinRoom = () => {
		if (room && username) {
			socket.emit('join-room', {
				room,
				username,
				saveMessages,
				secretKey
			})
			setShowChat(true)
		}
	}

	const onLeaveRoom = () => {
		socket.emit('leave-room', room)
		setShowChat(false)
	}

	useEffect(() => {
		const onRecieveMessage = (data: string) => {
			console.log(data)
		}
		socket.on('join-room', onRecieveMessage)
		return () => {
			socket.off('join-room', onRecieveMessage)
		}
	}, [])

	return (
		<>
			{!showChat ? (
				<div className="left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2">
					<p className="text-2xl text-center font-bold mb-4">
						Join room
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
						<label htmlFor="secretKey">Secret key (optional)</label>
						<input
							type="password"
							name="secretKey"
							value={secretKey}
							className="border w-full rounded p-2 border-gray-500"
							onChange={(e) => setSecretKey(e.target.value)}
						/>
						<div className="flex">
							<input
								type="checkbox"
								className="mr-5"
								checked={saveMessages}
								name="save"
								onChange={() => setSaveMessages(!saveMessages)}
							/>
							<label htmlFor="save">Save messages</label>
						</div>
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
				<Chat
					username={username}
					room={room}
					handleLeave={onLeaveRoom}
				/>
			)}
		</>
	)
}

export default App
