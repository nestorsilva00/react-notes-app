import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://nestjs-notes-app.herokuapp.com";

const getNotes = () => {
  return axios.get(API_URL + "/note", { headers: authHeader() });
};

const deleteNote = (id) => {
  return axios.delete(API_URL + "/note/delete/"+id.toString(), { headers: authHeader() });
};

const createNote = (body) => {
  const data = JSON.stringify(body)
  console.log(body)
  return axios.post(API_URL + "/note/create", { headers: authHeader() }, data);
};

const noteService = {
  getNotes,
  deleteNote,
  createNote,
};

export default noteService;
