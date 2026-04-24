import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import classes from './MainLayout.module.css';
import Header from '../Header/Header';
import { ToastContainer } from 'react-toastify';
import { Loader } from '../Loader';
function MainLayout() {
	const currentYear = new Date().getFullYear();
	return (
		<>
			<div className={classes.mainLayout}>
				<Header />
				<div className={classes.mainWrapper}>
					<main className={classes.main}>
						<Suspense fallback={<Loader />}>
							<Outlet />
						</Suspense>
					</main>
					<footer className={classes.footer}>
						React Cheat Sheet Application | {currentYear} <br />
						by Maykel Shalumov
					</footer>
				</div>
			</div>

			<ToastContainer />
		</>
	);
}

export default MainLayout;
