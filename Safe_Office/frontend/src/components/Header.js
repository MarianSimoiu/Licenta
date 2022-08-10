import React, { useEffect, useState } from "react";
import {FaVirus, FaVirusSlash, FaShieldVirus} from "react-icons/fa";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {} from "react-router-dom";
import { logout } from "../actions/userActions"
import {AiFillSafetyCertificate} from "react-icons/ai"

function Header({ setSearch }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  console.log(userInfo)
  const logoutHandler = () => {
    dispatch(logout());
  };

  const [isOn, setOn] = React.useState(JSON.parse(localStorage.getItem('is-on')) || false);
  const [checked, setCheck] = React.useState(isOn)

  const handleToggle = () => {
    setOn(!isOn);
  }
   
  React.useEffect(() => {
    localStorage.setItem('is-on', JSON.stringify(isOn));
    if (isOn == false)
       setCheck("");
    else setCheck("true")
  },[isOn]);
  
  
 
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand><AiFillSafetyCertificate id="safe-logo"></AiFillSafetyCertificate> Safe Office</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
          </Nav>
          <Nav className="m-auto">
            {userInfo && userInfo.isAdmin ? (
              <div className="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"  onClick={handleToggle} checked={checked}></input>
                { !isOn ? 
                <>
                  <FaVirusSlash style ={{ color:'red'}}></FaVirusSlash>
                  <label className="form-check-label"  style ={{ color:'red'}} for="flexSwitchCheckDefault">Protocol Off</label>
                  
                </>
                  : 
                <>
                <FaShieldVirus style ={{ color:'green'}}></FaShieldVirus>
                <label className="form-check-label"  style ={{ color:'green'}} for="flexSwitchCheckDefault">Protocol On</label>
                </>
                }
                 
        
            </div>
            ) : <></>}
          </Nav>
          <Nav>
            {userInfo ? (
              <>
                
                <NavDropdown
                  title={`${userInfo.name}`}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item href="/profile">
                    {/* <img
                      alt=""
                      src={`${userInfo.pic}`}
                      width="25"
                      height="25"
                      style={{ marginRight: 10 }}
                    /> */}
                    My Profile
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default Header;
