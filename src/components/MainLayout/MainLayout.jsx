import { Outlet } from 'react-router-dom';
import classes from './MainLayout.module.css';
import Header from '../Header/Header';
function MainLayout() {
	const currentYear = new Date().getFullYear();
	return (
		<div className={classes.mainLayout}>
			<Header />
			<div className={classes.mainWrapper}>
				<main className={classes.main}>
					<Outlet />
				</main>
				<footer className={classes.footer}>
					React Cheat Sheet Application | {currentYear} <br />
					by Maykel Shalumov
				</footer>
			</div>
		</div>
	);
}

export default MainLayout;
