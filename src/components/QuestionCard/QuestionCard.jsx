import classes from './QuestionCard.module.css';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import Badge from '../Badge';

function QuestionCard({ card }) {
	const navigate = useNavigate();

	const levelVariant =
		card.level === 1 ? 'primary' : card.level === 2 ? 'warning' : 'alert';
	const completedVariant = card.completed ? 'success' : 'primary';

	return (
		<div className={classes.card}>
			<div className={classes.cardLabels}>
				<Badge variant={levelVariant}>Level: {card.level}</Badge>
				<Badge variant={completedVariant}>
					{card.completed ? 'Completed' : 'Not Completed'}
				</Badge>
			</div>
			<h5 className={classes.cardTitle}>{card.question}</h5>

			<div className={classes.cardAnswers}>
				<label>short answer:</label>
				<p className={classes.cardAnswer}>{card.answer}</p>
			</div>

			<Button onClick={() => navigate(`/question/${card.id}`)}> View </Button>
		</div>
	);
}

export default QuestionCard;
