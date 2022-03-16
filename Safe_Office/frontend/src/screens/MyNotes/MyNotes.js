import React, { useEffect } from "react";
import { Container} from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import "./MyNotes.css";

import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function MyNotes({ history, search }) {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  return (
  <div>
    <div class="sidebar">
    <a href="#">Desk Booking</a>
    <a href="#contact">Room Booking</a>
    <a href="#about">Your Bookings</a>
    </div>
  
    <div class="content">
      <h1>Welcome to Safe Office Desk Booking System!</h1>
      <Container>
        <h2>Quick search for a desk!</h2>
        <form>
          <label>City: </label>
          <select class="form-select form-control-sm" id="exampleSelect1" >
            <option>Cluj Napoca Cale Motilor nr. 35</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            </select>

          <label > Address: </label> 
          <select class="form-select form-control-sm" id="exampleSelect1">
            <option>Cluj Napoca Cale Motilor nr. 35</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            </select>
          <label >Floor:</label> 
          <select class="form-select" id="exampleSelect1" >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            </select>
          <label>Date:</label> <br></br>
          <input type="date"></input>

      
        </form>
      </Container>
    
    </div>
  </div>
  );
}

export default MyNotes;
