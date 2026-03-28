const items = [
	{ task: 'Выучить React', icon: '💕', isCompleted: false },
	{ task: 'Выучить JavaScript', icon: '💕', isCompleted: false },
	{ task: 'Выучить CSS', icon: '💕', isCompleted: true },
	{ task: 'Выучить HTML', icon: '💕', isCompleted: false },
];

function List() {
	return (
		<div>
			{items.map((item, index) => {
				return (
					<section key={index} className={item.isCompleted ? 'completed' : ''}>
						<span>{item.icon}</span>
						<h4>{item.task}</h4>
					</section>
				);
			})}
		</div>
	);
}

export default List;
