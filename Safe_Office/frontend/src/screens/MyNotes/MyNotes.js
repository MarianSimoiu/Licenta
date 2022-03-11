import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
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
    <a class="active" href="#home">Home</a>
    <a href="#news">News</a>
    <a href="#contact">Contact</a>
    <a href="#about">About</a>
    </div>
  
    <div class="content">
      <h2>Responsive Sidebar Example</h2>
      <p>This example use media queries to transform the sidebar to a top navigation bar when the screen size is 700px or less.</p>
      <p>We have also added a media query for screens that are 400px or less, which will vertically stack and center the navigation links.</p>
      <h3>Resize the browser window to see the effect.</h3>
    </div>
  </div>
  );
}

export default MyNotes;
