import classes from './Button.module.scss';

const isPrimary = true;

function Button({ onClick, children }) {
	return (
		<button
			className={`${classes.btn} ${isPrimary ? classes.primary : ''}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;
