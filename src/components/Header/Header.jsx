import { useNavigate } from 'react-router-dom';
import ReactLogo from '../../assets/react.svg';
import Button from '../Button';
import classes from './Header.module.css';
function Header() {
	const navigate = useNavigate();
	return (
		<header className={classes.header}>
			<p onClick={() => navigate('/')}>
				<img src={ReactLogo} alt='react logo' />
				<span>ReactCards</span>
			</p>

			<div className={classes.headerButtons}>
				<Button onClick={() => navigate('/addquestion')}>Add</Button>
				<Button>Login</Button>
			</div>
		</header>
	);
}

export default Header;
