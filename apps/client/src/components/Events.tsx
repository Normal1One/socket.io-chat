import { ReactNode } from 'react'

const Events = ({ events }: { events: ReactNode[] }) => {
	return (
		<ul>
			{events.map((event, index) => (
				<li key={index}>{event}</li>
			))}
		</ul>
	)
}

export default Events
