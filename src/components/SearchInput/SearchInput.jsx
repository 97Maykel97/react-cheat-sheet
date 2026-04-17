import { useId } from 'react';
import classes from './SearchInput.module.css';
import { SearchIcon } from '../icons';

function SearchInput({ value, onChange }) {
	const inputId = useId();
	return (
		<div className={classes.inputContainer}>
			<label htmlFor={inputId}>
				<SearchIcon className={classes.searchIcon} />
			</label>
			<input
				type='text'
				id={inputId}
				className={classes.input}
				placeholder='search...'
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}

export default SearchInput;
