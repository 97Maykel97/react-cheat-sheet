import { memo } from 'react';
import QuestionCard from '../QuestionCard';
import classes from './QuestionCardList.module.css';
const QuestionCardList = memo(({ cards }) => {
	return (
		<div className={classes.cardList}>
			{cards.map((card, index) => {
				return <QuestionCard card={card} key={index} />;
			})}
		</div>
	);
});

export default QuestionCardList;
