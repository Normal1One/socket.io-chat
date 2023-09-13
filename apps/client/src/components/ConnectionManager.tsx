import { socket } from '../utils/socket'

const ConnectionManager = () => {
	const connect = () => {
		socket.connect()
	}

	const disconnect = () => {
		socket.disconnect()
	}

	return (
		<>
			<button onClick={connect}>Connect</button>
			<button onClick={disconnect}>Disconnect</button>
		</>
	)
}

export default ConnectionManager
