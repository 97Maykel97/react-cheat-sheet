import classes from './AddQuestionPage.module.css';

function QuestionPage() {
	return (
		<>
			<h1 className={classes.formTitle}>Add new question</h1>
			<div className={classes.formContainer}>
				<form action='' className={classes.form}>
					<div className={classes.formControl}>
						<label htmlFor='questionField'>Question: </label>
						<textarea
							defaultValue={''}
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
							defaultValue={''}
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
							defaultValue={''}
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
							defaultValue={''}
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
						<select name='level' id='levelField' defaultValue={'defaultValue'}>
							<option disabled>Question level</option>
							<hr />
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
							defaultValue={true}
						/>
						<span>clear form after submitting?</span>
					</label>
					<button>Add question</button>
				</form>
			</div>
		</>
	);
}

export default QuestionPage;
