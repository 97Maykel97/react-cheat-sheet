import QuestionCard from '../../components/QuestionCard/QuestionCard';
import classes from './HomePage.module.css';

function HomePage() {
	return (
		<div className={classes.home}>
			Home Page
			<QuestionCard />
		</div>
	);
}

export default HomePage;
