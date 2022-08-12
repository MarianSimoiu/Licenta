
import "./MainMenu.css"
import {FaDesktop, FaUserFriends, FaUserEdit} from "react-icons/fa";
import { MdMeetingRoom, MdOutlineLogout} from "react-icons/md";
import {RiTeamFill, RiLogoutBoxRFill} from "react-icons/ri"
import {GiNotebook} from "react-icons/gi"
import { logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {HiUserAdd} from "react-icons/hi"
import React, { useEffect, useState} from "react";

function MainScreen({uInfo, history}) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };


  
  return (
<>
    
  {uInfo && 
  <div class="vertical-nav bg-white" id="sidebar">
  <div class="py-4 px-3 mb-4 bg-light">
    
    <div class="media d-flex align-items-center">
      <img src={uInfo.pic} alt={uInfo.name} id="profile-pic" class="mr-3 rounded-circle img-thumbnail shadow-sm"></img>
      <div class="media-body">
        <h4 class="m-0">{uInfo.name}</h4>
        {uInfo.isAdmin ? <p class="font-weight-light text-muted mb-0">Admin</p> 
                       : <p class="font-weight-light text-muted mb-0">Employee</p>}
      </div>
    </div>
  </div>

  <p class="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Booking Actions</p>

  <ul class="nav flex-column bg-white mb-0">
    <li class="nav-item">
      <a href="/select_building/desk_booking" class="nav-link text-dark font-italic bg-light"><FaDesktop id="side-icon"></FaDesktop> <p id="side-item"><em>Desk booking</em></p></a>
      
    </li>
    <li class="nav-item" id="option">
      <a href="/select_building/room_booking" class="nav-link text-dark font-italic">
      <MdMeetingRoom id="little-icon"></MdMeetingRoom> <p id="side-item"><em>Room booking</em></p>
      </a>
    </li>
    <li class="nav-item"  id="option">
      <a href="/select_building/book_for_colleague" class="nav-link text-dark font-italic">
      <FaUserFriends id="side-icon"></FaUserFriends> <p id="side-item"><em>Colleague booking</em></p>
      </a>
    </li>
    <li class="nav-item"  id="option">
      <a href="/select_building/table_booking" class="nav-link text-dark font-italic">
      <RiTeamFill id="side-icon"></RiTeamFill> <p id="side-item"><em>Table booking</em></p>
      </a>
    </li>
  </ul>
  <p class="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">Admin actions</p>
  <ul class="nav flex-column bg-white mb-0">
    <li class="nav-item" id="option">
      <a href={`/add_user`} class="nav-link text-dark font-italic">
        <HiUserAdd id="little-icon"></HiUserAdd> <p id="side-item"><em>Add User</em></p>
      </a>
    </li>
  </ul>
  <p class="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">Profile actions</p>

  <ul class="nav flex-column bg-white mb-0">
    <li class="nav-item" id="option">
      <a href={`/my_bookings/${uInfo._id}`} class="nav-link text-dark font-italic">
        <GiNotebook id="side-icon"></GiNotebook> <p id="side-item"><em>My Bookings</em></p>
      </a>
    </li>
    <li class="nav-item" id="option">
      <a href="/profile" class="nav-link text-dark font-italic">
      <FaUserEdit id="side-icon"></FaUserEdit> <p id="side-item"><em>Edit Profile</em></p>
      </a>
    </li>
    <li class="nav-item" id="option">
      <a href="" onClick={logoutHandler} class="nav-link text-dark font-italic">
      <RiLogoutBoxRFill id="little-icon"></RiLogoutBoxRFill> <p id="side-item"><em>Logout</em></p>
      </a>
    </li>
  </ul>
  </div>
  }
</>
    )
}

export default MainScreen;