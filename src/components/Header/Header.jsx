import ReactLogo from '../../assets/react.svg';
import Button from '../Button';
import classes from './Header.module.css';
function Header() {
	return (
		<header className={classes.header}>
			<p>
				<img src={ReactLogo} alt='react logo' />
				<span>React Cheat Sheet</span>
			</p>

			<div className={classes.headerButtons}>
				<Button>Add</Button>
				<Button>Login</Button>
			</div>
		</header>
	);
}

export default Header;
