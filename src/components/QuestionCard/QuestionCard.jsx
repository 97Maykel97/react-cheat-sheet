import classes from './QuestionCard.module.css';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

function QuestionCard({ card }) {
	const navigate = useNavigate();
	return (
		<div className={classes.card}>
			<div className={classes.cardLabels}>
				<div>Level: {card.level}</div>
				<div>{card.completed ? 'Completed' : 'Not Completed'}</div>
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
