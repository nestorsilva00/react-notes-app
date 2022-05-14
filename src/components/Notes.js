import React, { useState, useEffect } from "react";
import PostService from "../services/note.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import NotesList from './NotesList';
import Search from './Search';
import Header from './Header';
import { nanoid } from 'nanoid';

const Home = () => {
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  const [searchText, setSearchText] = useState('');

	const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);

	const addNote = (text, title) => {
		const date = new Date();
		const body = {
			'title': title,
			'body': text,
			'tags': []
		}
		PostService.createNote(body)
		const newNote = {
			id: nanoid(),
			title: title,
			body: text,
			date: date.toLocaleDateString(),
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

	const deleteNote = (id) => {
		PostService.deleteNote(id)
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};

  useEffect(() => {
    PostService.getNotes().then(
      (response) => {
        setNotes(response.data);
      },
      (error) => {
        console.log("Private page", error.response);
        // Invalid token
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      }
    );
  }, []);

  return (
   
     // <h3>{privatePosts.map((post) => post.content)}</h3>
    
     <div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
				<Header handleToggleDarkMode={setDarkMode} />
				<Search handleSearchNote={setSearchText} />
				<NotesList
					notes={notes.filter((note) =>
						note.body.toLowerCase().includes(searchText)
					)}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
				/>
			</div>
		</div>
  );
};

export default Home;
