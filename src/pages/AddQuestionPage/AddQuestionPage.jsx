import { useState } from 'react';
import { delayFn } from '../../helpers/delayFn';
import classes from './AddQuestionPage.module.css';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants';

const initialFormState = {
	question: '',
	answer: '',
	description: '',
	resources: '',
	level: '',
	clearForm: true,
};

function AddQuestionPage() {
	const [formState, setFormState] = useState(initialFormState);
	const [isPending, setIsPending] = useState(false);

	const onChangeHandler = e => {
		const { name, value, type, checked } = e.target;
		setFormState(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const onSubmitHandler = async e => {
		e.preventDefault();
		try {
			setIsPending(true);
			await delayFn();

			const resources = formState.resources.trim();
			const response = await fetch(`${API_URL}/react`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					question: formState.question,
					answer: formState.answer,
					description: formState.description,
					resources: resources.length ? resources.split(',') : [],
					level: Number(formState.level),
					completed: false,
					editDate: undefined,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to create question');
			}

			await response.json();
			toast.success('New question is successfully created!');

			if (formState.clearForm) {
				setFormState(initialFormState);
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsPending(false);
		}
	};

	return (
		<>
			<h1 className={classes.formTitle}>Add new question</h1>
			<div className={classes.formContainer}>
				<form onSubmit={onSubmitHandler} className={classes.form}>
					<div className={classes.formControl}>
						<label htmlFor='questionField'>Question: </label>
						<textarea
							value={formState.question}
							onChange={onChangeHandler}
							name='question'
							id='questionField'
							cols='30'
							rows='2'
							required
							placeholder='please enter a question'
						></textarea>
					</div>
					<div className={classes.formControl}>
						<label htmlFor='answerField'>Short Answer: </label>
						<textarea
							value={formState.answer}
							onChange={onChangeHandler}
							name='answer'
							id='answerField'
							cols='30'
							rows='2'
							required
							placeholder='please enter a short answer'
						></textarea>
					</div>
					<div className={classes.formControl}>
						<label htmlFor='descriptionField'>Description: </label>
						<textarea
							value={formState.description}
							onChange={onChangeHandler}
							name='description'
							id='descriptionField'
							cols='30'
							rows='5'
							required
							placeholder='please enter a full description'
						></textarea>
					</div>
					<div className={classes.formControl}>
						<label htmlFor='resourcesField'>Resources: </label>
						<textarea
							value={formState.resources}
							onChange={onChangeHandler}
							name='resources'
							id='resourcesField'
							cols='30'
							rows='2'
							required
							placeholder='please enter a resources separated by commas'
						></textarea>
					</div>
					<div className={classes.formControl}>
						<label htmlFor='levelField'>Level: </label>
						<select
							name='level'
							id='levelField'
							value={formState.level}
							onChange={onChangeHandler}
						>
							<option value='' disabled>
								Question level
							</option>
							<option value='1'>1 - easiest</option>
							<option value='2'>2 - medium</option>
							<option value='3'>3 - hardest</option>
						</select>
					</div>
					<label htmlFor='clearFromField' className={classes.clearFormControl}>
						<input
							className={classes.checkbox}
							type='checkbox'
							name='clearForm'
							id='clearFromField'
							checked={formState.clearForm}
							onChange={onChangeHandler}
						/>
						<span>clear form after submitting?</span>
					</label>
					<button disabled={isPending}>Add question</button>
				</form>
			</div>
		</>
	);
}

export default AddQuestionPage;
