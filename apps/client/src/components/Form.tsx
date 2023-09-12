import { FormEvent, useState } from 'react'
import { socket } from '../socket'

const Form = () => {
	const [value, setValue] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const onSubmit = (e: FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		socket.timeout(1000).emit('message', value, () => {
			setIsLoading(false)
		})
	}

	return (
		<form onSubmit={onSubmit}>
			<input onChange={(e) => setValue(e.target.value)} />
			<button type="submit" disabled={isLoading}>
				Submit
			</button>
		</form>
	)
}

export default Form
