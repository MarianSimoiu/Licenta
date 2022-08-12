import TextBar from "../../components/TextBar";
import MainMenu from "../../components/MainMenu"
import {useSelector} from "react-redux"
import "./AddUser.css"
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function AddUser(){

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

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
            <Form >
                <Form.Group className="mb-3"controlId="formBasicEmail">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control id="input" type="name" placeholder="Enter full name"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control id="input" type="email" placeholder="Enter email"/>
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