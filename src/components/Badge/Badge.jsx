import classes from './Badge.module.css';

function Badge({ variant, children }) {
	switch (variant) {
		case 'primary':
			return (
				<div className={`${classes.badge} ${classes.primary}`}> {children}</div>
			);
		case 'success':
			return (
				<div className={`${classes.badge} ${classes.success}`}> {children}</div>
			);
		case 'warning':
			return (
				<div className={`${classes.badge} ${classes.warning}`}> {children}</div>
			);
		case 'alert':
			return (
				<div className={`${classes.badge} ${classes.alert}`}> {children}</div>
			);
		default:
			return <div className={classes.badge}> {children}</div>;
	}
}

export default Badge;
