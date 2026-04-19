import { useState, useEffect, useMemo, useRef } from 'react';
import { API_URL } from '../../constants';
import QuestionCardList from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch';
import classes from './HomePage.module.css';
import SearchInput from '../../components/SearchInput';
import Button from '../../components/Button';

const DEFAULT_PER_PAGE = 10;

function HomePage() {
	const [searchParams, setSearchParams] = useState(
		`?_page=1&_per_page=${DEFAULT_PER_PAGE}`,
	);
	const [questions, setQuestions] = useState({});
	const [searchValue, setSearchValue] = useState('');
	const [sortSelectValue, setSortSelectValue] = useState('');

	const controlsContainerRef = useRef();

	const getActivePageNumber = () =>
		questions.next === null ? questions.last : questions.next - 1;

	const [getQuestions, isLoading, error] = useFetch(async url => {
		const response = await fetch(`${API_URL}/${url}`);
		const questions = await response.json();

		setQuestions(questions);
		return questions;
	});

	const cards = useMemo(() => {
		if (questions?.data) {
			if (searchValue.trim()) {
				return questions.data.filter(d =>
					d.question.toLowerCase().includes(searchValue.trim().toLowerCase()),
				);
			} else {
				return questions.data;
			}
		}
		return [];
	}, [questions, searchValue]);

	const pagination = useMemo(() => {
		const totalCardsCount = questions?.pages || 0;

		return Array(totalCardsCount)
			.fill(0)
			.map((_, i) => i + 1);
	}, [questions]);

	useEffect(() => {
		getQuestions(`react${searchParams}`);
	}, [searchParams]);

	const onSearchChangeHandler = e => {
		setSearchValue(e.target.value);
	};

	const onSortSelectChangeHandler = e => {
		setSortSelectValue(e.target.value);

		setSearchParams(
			`?_page=1&_per_page=${DEFAULT_PER_PAGE}${
				e.target.value ? `&${e.target.value}` : ''
			}`,
		);
	};

	const paginationHandler = e => {
		if (e.target.tagName === 'BUTTON') {
			setSearchParams(
				`?_page=${e.target.textContent}&_per_page=${DEFAULT_PER_PAGE}${
					sortSelectValue ? `&${e.target.value}` : ''
				}`,
			);
			controlsContainerRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<>
			<div className={classes.controlsContainer} ref={controlsContainerRef}>
				<SearchInput value={searchValue} onChange={onSearchChangeHandler} />
				<select
					value={sortSelectValue}
					onChange={onSortSelectChangeHandler}
					className={classes.select}
				>
					<option value=''>sort by</option>
					<option value='_sort=level'>level ASC</option>
					<option value='_sort=-level'>level DESC</option>
					<option value='_sort=completed'>completed ASC</option>
					<option value='_sort=-completed'>completed DESC</option>
				</select>
			</div>

			{isLoading && <Loader />}
			{error && <p>{error}</p>}

			<QuestionCardList cards={cards} />

			{cards.length === 0 ? (
				<p className={classes.noCardsInfo}>No cards...</p>
			) : (
				<div
					className={classes.paginationContainer}
					onClick={paginationHandler}
				>
					{pagination.map(value => {
						return (
							<Button kay={value} isActive={value === getActivePageNumber()}>
								{' '}
								{value}{' '}
							</Button>
						);
					})}
				</div>
			)}
		</>
	);
}

export default HomePage;
