import React, { useEffect } from "react";
import { Container} from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { FaHeart } from "react-icons/fa";
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
      <div class="search-container">
        <h2 >Quick search for a desk!</h2>
        <form>
          <label for="citySelect" class="form-label mt-4">City:</label>
          <select class="form-select form-control-sm" id="citySelect" >
            <option>Cluj Napoca</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>

          <label for="addressSelect" class="form-label mt-2">Address:</label>
          <select class="form-select" id="addressSelect">
            <option>Cale Motilor nr. 35</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>

          <label for="floorSelect" class="form-label mt-2" id="floorSelect">Floor:</label>
          <select class="form-select" id="inputSmall" >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>

          <label for="dateSelect" class="form-label mt-2">Date:</label> <br></br>
          <input type="date" class="form-control"  id="dateSelect"></input>

          <button type="submit" class="btn btn-outline-primary mt-4" id="submit1">Search</button>
          <button type="submit" class="btn btn-outline-warning mt-4" id="submit2">Floor plan</button>

        </form>
      </div>
    </div>
    <div style={{float:"right", display:"inline"}}>
        <FaHeart></FaHeart>
    </div>
  </div>
  );
}

export default MyNotes;
