import React from "react";
import "./MainMenu.css"

function MainScreen({uInfo}) {
 
  return (
 

  <div class="vertical-nav bg-white" id="sidebar">
  <div class="py-4 px-3 mb-4 bg-light">
    
    <div class="media d-flex align-items-center">
      <img src={uInfo.pic} alt="..." width="65" class="mr-3 rounded-circle img-thumbnail shadow-sm"></img>
      <div class="media-body">
        <h4 class="m-0">{uInfo.name}</h4>
        <p class="font-weight-light text-muted mb-0">Online</p>
      </div>
    </div>
  </div>

  <p class="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Booking Actions</p>

  <ul class="nav flex-column bg-white mb-0">
    <li class="nav-item">
      <a href="/buildings" class="nav-link text-dark font-italic bg-light">
        <i class="fa fa-th-large mr-3 text-primary fa-fw"></i>
        Buildings
      </a>
    </li>
    <li class="nav-item">
      <a href="/buildings" class="nav-link text-dark font-italic">
        <i class="fa fa-address-card mr-3 text-primary fa-fw"></i>
        Desk Booking
      </a>
    </li>
    <li class="nav-item">
      <a href="/room_booking" class="nav-link text-dark font-italic">
        <i class="fa fa-cubes mr-3 text-primary fa-fw"></i>
        Room Booking
      </a>
    </li>
    <li class="nav-item">
      <a href="/book-for-colleague" class="nav-link text-dark font-italic">
        <i class="fa fa-picture-o mr-3 text-primary fa-fw"></i>
        Book for a Colleague
      </a>
    </li>
  </ul>

  <p class="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">Profile actions</p>

  <ul class="nav flex-column bg-white mb-0">
    <li class="nav-item">
      <a href={`/mybookings/${uInfo._id}`} class="nav-link text-dark font-italic">
        <i class="fa fa-area-chart mr-3 text-primary fa-fw"></i>
        My Bookings
      </a>
    </li>
    <li class="nav-item">
      <a href="/profile" class="nav-link text-dark font-italic">
        <i class="fa fa-bar-chart mr-3 text-primary fa-fw"></i>
        Edit Profile
      </a>
    </li>
    <li class="nav-item">
      <a href="#" class="nav-link text-dark font-italic">
        <i class="fa fa-pie-chart mr-3 text-primary fa-fw"></i>
        Pie charts
      </a>
    </li>
    <li class="nav-item">
      <a href="#" class="nav-link text-dark font-italic">
        <i class="fa fa-line-chart mr-3 text-primary fa-fw"></i>
        Line charts
      </a>
    </li>
  </ul>
</div>
    
    )
}

export default MainScreen;