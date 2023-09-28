const Events = ({ events }: { events: string[] }) => {
	return (
		<ul className="border border-gray-500 rounded h-80 mb-4">
			{events.map((event, index) => (
				<li key={index}>{event}</li>
			))}
		</ul>
	)
}

export default Events
