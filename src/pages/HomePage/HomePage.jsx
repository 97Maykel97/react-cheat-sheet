import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
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
	const [countSelectValue, setCountSelectValue] = useState(
		`${DEFAULT_PER_PAGE}`,
	);

	const controlsContainerRef = useRef();

	const getActivePageNumber = () =>
		questions.next === null ? questions.last : questions.next - 1;

	const getQuestionsCallback = useCallback(async url => {
		const response = await fetch(`${API_URL}/${url}`);
		const questions = await response.json();

		setQuestions(questions);
		return questions;
	}, []);

	const [getQuestions, isLoading, error] = useFetch(getQuestionsCallback);

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
	}, [getQuestions, searchParams]);

	const onSearchChangeHandler = e => {
		setSearchValue(e.target.value);
	};

	const onSortSelectChangeHandler = e => {
		setSortSelectValue(e.target.value);

		setSearchParams(
			`?_page=1&_per_page=${countSelectValue}${
				e.target.value ? `&${e.target.value}` : ''
			}`,
		);
	};

	const paginationHandler = e => {
		if (e.target.tagName === 'BUTTON') {
			setSearchParams(
				`?_page=${e.target.textContent}&_per_page=${countSelectValue}${
					sortSelectValue ? `&${sortSelectValue}` : ''
				}`,
			);
			controlsContainerRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const onCountSelectChangeHandler = e => {
		setCountSelectValue(e.target.value);
		setSearchParams(
			`?_page=1&_per_page=${e.target.value}${
				sortSelectValue ? `&${sortSelectValue}` : ''
			}`,
		);
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

				<select
					value={countSelectValue}
					onChange={onCountSelectChangeHandler}
					className={classes.select}
				>
					<option disabled>count</option>
					<option value='10'>10</option>
					<option value='20'>20</option>
					<option value='30'>30</option>
					<option value='50'>50</option>
					<option value='100'>100</option>
				</select>
			</div>

			{isLoading && <Loader />}
			{error && <p>{error}</p>}

			<QuestionCardList cards={cards} />

			{cards.length === 0 ? (
				<p className={classes.noCardsInfo}>No cards...</p>
			) : (
				pagination.length > 1 && (
					<div
						className={classes.paginationContainer}
						onClick={paginationHandler}
					>
						{pagination.map(value => {
							return (
								<Button key={value} isActive={value === getActivePageNumber()}>
									{value}
								</Button>
							);
						})}
					</div>
				)
			)}
		</>
	);
}

export default HomePage;
