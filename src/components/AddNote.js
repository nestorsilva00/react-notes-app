import { useState } from 'react';

const AddNote = ({ handleAddNote }) => {
	const [body, setbody] = useState('');
	const [title, settitle] = useState('');
	const characterLimit = 200;
	const titleCharacterLimit = 40;

	const handleChangeText = (event) => {
		if (characterLimit - event.target.value.length >= 0) {
			setbody(event.target.value);
		}
	};

	const handleChangeTitle = (event) => {
		if (titleCharacterLimit - event.target.value.length >= 0) {
			settitle(event.target.value);
		}
	};

	
	

	const handleSaveClick = () => {
		if (body.trim().length > 0) {
			handleAddNote(body, title);
			setbody('');
			settitle('');
		}

	};

	return (
		<div className='note new'>
			<textarea
				rows='2'
				cols='10'
				placeholder='Title'
				value={title}
				onChange={handleChangeTitle}
			></textarea>
			<textarea
				rows='8'
				cols='10'
				placeholder='Type to add a note...'
				value={body}
				onChange={handleChangeText}
			></textarea>
			<div className='note-footer'>
				<small>
					{characterLimit - body.length} Remaining
				</small>
				<button className='save' onClick={handleSaveClick}>
					Save
				</button>
			</div>
		</div>
	);
};

export default AddNote;
