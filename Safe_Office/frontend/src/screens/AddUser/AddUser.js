import TextBar from "../../components/TextBar";
import MainMenu from "../../components/MainMenu"
import {useSelector} from "react-redux"
import "./AddUser.css"
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function AddUser(){

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const sgMail = require('@sendgrid/mail')
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");

    const SubmitHandler = (e) =>{
      e.preventDefault();
      alert("Email sent");   
    const msg = {
        to: `${email}`, // Change to your recipient
        from: 'marian.simoiu00@e-uvt.ro', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    sgMail
        .send(msg)
        .then(() => {
          console.alert('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })}

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
                    <Form.Control id="input" type="name"value={userName} placeholder="Enter full name" onChange={(e) => setUserName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control id="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email"/>
                </Form.Group>
                <Form.Group className="mt-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="is admin" />
                </Form.Group>
                <Button className="mt-3" variant="primary" type="submit">Submit</Button>
            </Form>
            </div>
          </div> 
        </div>
      </div>
    </div>
  </div>
</>
    )}

export default AddUser;