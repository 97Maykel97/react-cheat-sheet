import { useState, useEffect } from 'react';
import { API_URL } from '../../constants';
import QuestionCardList from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch';

function HomePage() {
	const [questions, setQuestions] = useState([]);
	const [getQuestions, isLoading, error] = useFetch(async url => {
		const response = await fetch(`${API_URL}/${url}`);
		const questions = await response.json();

		setQuestions(questions);
		return questions;
	});

	useEffect(() => {
		getQuestions('react');
	}, []);

	return (
		<>
			{isLoading && <Loader />}
			{isLoading && <Loader />}
			{error && <p>{error}</p>}
			<QuestionCardList cards={questions} />
		</>
	);
}

export default HomePage;
