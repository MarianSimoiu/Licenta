import React, { useEffect, useState } from "react";
import { Container} from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { FaRegPlusSquare } from "react-icons/fa";
import { createNoteAction } from "../../actions/notesActions";
import "./MyNotes.css";

import floorPrint from "../../images/mainFloor.png"

import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";


function MyNotes({ history, search }) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const [showConfirmation, setShowConfirmation] = React.useState(false)
  
  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNoteAction(title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    history.push("/mynotes");
  };

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
        
        <form onSubmit={submitHandler} id="first-form">
          <label for="citySelect" class="form-label mt-4">City:</label>
          <select class="form-select form-control-sm" id="citySelect" value={title}  onChange={(e) => setTitle(e.target.value)} >
            <option>Cluj Napoca</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>

          <label for="addressSelect" class="form-label mt-2">Address:</label>
          <select class="form-select" id="addressSelect" value={content} onChange={(e) => setContent(e.target.value)} >
            <option>Cale Motilor nr. 35</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>

          <label for="floorSelect" class="form-label mt-2" id="floorSelect" >Floor:</label>
          <select class="form-select" id="inputSmall" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>

          <label for="dateSelect" class="form-label mt-2">Date:</label> <br></br>
          <input type="date" class="form-control"  id="dateSelect"  ></input>

          <button type="submit" class="btn btn-outline-primary mt-4" id="submit1">Search</button>
          <button type="submit" class="btn btn-outline-warning mt-4" id="submit2">Floor plan</button>
        </form>
      </div>
    </div>
    <div class="floor" >
      <FaRegPlusSquare class="desk" id="slot1" onClick={() => setShowConfirmation(true)}></FaRegPlusSquare>
      {showConfirmation ? 
       <div class="modal-sm" id="confirmation">
       <div class="modal-dialog" role="document">
         <div class="modal-content">
           <div class="modal-header">
             <h5 class="modal-title">Confirm Booking</h5>
             <button onClick={ () => setShowConfirmation(false)} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
             { showConfirmation ? null: null }
             <span aria-hidden="true"></span>
             </button>
           </div>
           <div class="modal-body">
             <p>Accept in order to book your desk!</p>
           </div>
           <div class="modal-footer">
             <button  form="first-form" type="submit" class="btn btn-primary">Save changes</button>
             <button onClick={ () => setShowConfirmation(false)} type="button" class="btn btn-secondary"  data-bs-dismiss="modal">Close</button>
             { showConfirmation ? null: null }
           </div>
        </div>
       </div>
     </div>
        : null}
      <FaRegPlusSquare class="desk" id="slot2"></FaRegPlusSquare>
      <FaRegPlusSquare class="desk" id="slot3"></FaRegPlusSquare>
      <FaRegPlusSquare class="desk" id="slot4"></FaRegPlusSquare>
      <FaRegPlusSquare class="desk" id="slot5"></FaRegPlusSquare>
      <FaRegPlusSquare class="desk" id="slot6"></FaRegPlusSquare>

      <FaRegPlusSquare class="desk" id="slot7"></FaRegPlusSquare>
      <FaRegPlusSquare class="desk" id="slot8"></FaRegPlusSquare>
      <FaRegPlusSquare class="desk" id="slot9"></FaRegPlusSquare>
      <FaRegPlusSquare class="desk" id="slot10"></FaRegPlusSquare>
      <FaRegPlusSquare class="desk" id="slot11"></FaRegPlusSquare>
      <FaRegPlusSquare class="desk" id="slot12"></FaRegPlusSquare>
      <img  id="image-floor" src={floorPrint} ></img>
    </div>
  </div>
  );
}

export default MyNotes;
