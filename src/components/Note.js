import { MdDeleteForever } from 'react-icons/md';

const Note = ({ id,title,body, date, handleDeleteNote }) => {
	return (
		<div className='note'>
			<span>{title}</span>
			<textarea>{body}</textarea>
			<div className='note-footer'>
				<small>{date}</small>
				<MdDeleteForever
					onClick={() => handleDeleteNote(id)}
					className='delete-icon'
					size='1.3em'
				/>
			</div>
		</div>
	);
};

export default Note;
