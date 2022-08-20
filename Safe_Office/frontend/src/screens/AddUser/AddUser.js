import TextBar from "../../components/TextBar";
import MainMenu from "../../components/MainMenu"
import {useSelector} from "react-redux"
import "./AddUser.css"
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { register } from "../../actions/userActions";
import axios from "axios";
import loginImage from "../../images/undraw_remotely_2j6y.svg"
function AddUser({history}){

  function createPassword(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
  }
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error } = userRegister;
    const [admin, setAdmin] = useState(false)
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const password = createPassword(10);

    const sender = "marian.simoiu00@e-uvt.ro";
    const topic = "Safe Office Account Password"
    const html = `<h1>Congratulations, your account has been successfully created!</h1>` +
                 `<p><strong>User name:</strong> ${userName}</p>` +
                 `<p><strong>Email:</strong> ${email}</p>` +
                 `<p><strong>Password:</strong> ${password}</p>` 

    useEffect(() => {
    
    if (!userInfo) {
      history.push("/login");
    }
  },[userInfo])
  
    const SubmitHandler = (e) =>{
      const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const name = userName;
      axios.post("/api/users",{ name, email, password},config);

      e.preventDefault()
      fetch(`http://localhost:5000/api/users/send-email?recipient=${email}&sender=${sender}&topic=${topic}&html=${html}`, {
        method: "get"})
        .then(() =>
        console.log("Email sent!"))
        .catch((error) => {
          console.error("Error: ", error);
      })
      resetHandler();
      alert("User Created!")
      }
    
    const resetHandler = () => {
          setUserName("");
          setEmail("");
        };

    

    return(
<>
    <MainMenu uInfo={userInfo}></MainMenu>
    <TextBar text={"Add User"} subText={"Create a new user by filling in the appropriate data"}></TextBar>
    <div class="content-ml-5">
    <div class="container">
      <div class="row">
        <div class="col-md-1">
            <div class="mt-5">
          </div>
        </div>
        <div class="col-md-6 contents">
          <div class="row justify-content-center">
            <div class="col-md-8 mt-5">
              <div class="mt-5">
              <h3 class="text-info">Create User Account</h3>
              <p id="p" class="mb-4">Fill in the login details with your own credentials and book your way to the office!</p>
            </div>
            <Form onSubmit={SubmitHandler}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control id="input" type="name" value={userName} placeholder="Enter full name" onChange={(e) => setUserName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control id="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email"/>
                </Form.Group>
                <Button className="mt-3" variant="primary" type="submit">Submit</Button>
            </Form>
            </div>
          </div> 
        </div>
        <div className="col-4 mt-5"><img src={loginImage} alt="Image" class="img-fluid mt-5"></img>
        </div>
      </div>
    </div>
  </div>
</>
)}

export default AddUser;
