import classes from './Button.module.css';

function Button({ onClick, isActive, isDisabled, children }) {
	return (
		<button
			className={`${classes.btn} ${isActive ? classes.active : ''}`}
			onClick={onClick}
			disabled={isDisabled}
		>
			{children}
		</button>
	);
}

export default Button;
