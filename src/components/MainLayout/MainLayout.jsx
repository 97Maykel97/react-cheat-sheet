import { Outlet } from 'react-router-dom';
import classes from './MainLayout.module.css';
function MainLayout() {
	const currentYear = new Date().getFullYear();
	return (
		<div className={classes.mainLayout}>
			<header>header</header>
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
