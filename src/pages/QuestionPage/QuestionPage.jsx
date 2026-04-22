import { useNavigate, useParams } from 'react-router-dom';
import Badge from '../../components/Badge/Badge';
import classes from './QuestionPage.module.css';
import Button from '../../components/Button/Button';
import { useEffect, useId, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { API_URL } from '../../constants';
import { Loader, SmallLoader } from '../../components/Loader';

function QuestionPage() {
	const checkboxId = useId();
	const navigate = useNavigate();
	const { id } = useParams();
	const [card, setCard] = useState(null);

	const levelVariant = () =>
		card.level === 1 ? 'primary' : card.level === 2 ? 'warning' : 'alert';
	const completedVariant = () => (card.completed ? 'success' : 'primary');

	const [fetchCard, isCardLoading] = useFetch(async () => {
		const response = await fetch(`${API_URL}/react/${id}`);
		const data = await response.json();

		setCard(data);
	});

	const [updateCard, isCardUpdating] = useFetch(async isChecked => {
		const response = await fetch(`${API_URL}/react/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({ completed: isChecked }),
		});

		const data = await response.json();

		setCard(data);
	});

	useEffect(() => {
		fetchCard();
	}, []);

	const onCheckboxChangeHandler = () => {
		if (!card) return;
		const nextCompleted = !card.completed;
		setCard(prev => ({ ...prev, completed: nextCompleted }));
		updateCard(nextCompleted);
	};

	return (
		<>
			{isCardLoading && <Loader />}

			{card !== null && (
				<div className={classes.container}>
					<div className={classes.cardLabels}>
						<Badge variant={levelVariant()}>Level: {card.level}</Badge>
						<Badge variant={completedVariant()}>
							{card.completed ? 'Completed' : 'Not Completed'}
						</Badge>

						{card?.editDate && (
							<p className={classes.editDate}>editDate: {card.editDate}</p>
						)}
					</div>
					<h5 className={classes.cardTitle}>{card.question}</h5>
					<p className={classes.cardDescription}>{card.description}</p>

					<div className={classes.cardAnswers}>
						<label>short answer:</label>
						<p className={classes.cardAnswer}>{card.answer}</p>
					</div>

					<ul className={classes.cardLinks}>
						Resources:
						{card.resources.map((link, index) => {
							return (
								<li key={index}>
									<a href={link.trim()} target='_blank' rel='noreferrer'>
										{link.trim()}
									</a>
								</li>
							);
						})}
					</ul>

					<label htmlFor={checkboxId} className={classes.cardCheckBox}>
						<input
							type='checkbox'
							id={checkboxId}
							className={classes.checkbox}
							checked={card.completed}
							onChange={onCheckboxChangeHandler}
							disabled={isCardUpdating}
						/>
						<span>mark question as completed</span>

						{isCardUpdating && <SmallLoader />}
					</label>
					<Button
						onClick={() => navigate(`/editQuestion/${card.id}`)}
						isDisabled={isCardUpdating}
					>
						Edit Question
					</Button>
					<Button onClick={() => navigate('/')} isDisabled={isCardUpdating}>
						Back
					</Button>
				</div>
			)}
		</>
	);
}

export default QuestionPage;
