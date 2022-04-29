import React from "react";
import "./MainMenu.css"

function MainScreen({uInfo}) {
  return (
    <div class="sidebar">
      <a href="#lo">Desk Booking</a>
      <a href="#contact">Room Booking</a>
      { uInfo ? 
      <a href={`/mybookings/${uInfo._id}`}> Your Bookings</a>
      : <p>no</p> }
      <a href="/searchFriend">Serach for friend</a>
      <a href="#">Book for a friend</a>
    </div>
  );
}

export default MainScreen;