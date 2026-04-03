import classes from './QuestionCard.module.css';
import Button from '../Button';

function QuestionCard() {
	return (
		<div className={classes.card}>
			<div className={classes.cardLabels}>
				<div>Level: 1</div>
				<div>Not Completed</div>
			</div>
			<h5 className={classes.cardTitle}>Что такое JSX?</h5>

			<div className={classes.cardAnswers}>
				<label>short answer:</label>
				<p className={classes.cardAnswer}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, ex!
				</p>
			</div>

			<Button onClick={() => {}}> View </Button>
		</div>
	);
}

export default QuestionCard;
