import React from "react";
import "./MainMenu.css"

function MainScreen({uInfo}) {
  return (
    <div class="sidebar">
      <a href="bookings">Desk Booking</a>
      <a href="/room_booking">Room Booking</a>
      { uInfo ? 
      <a href={`/mybookings/${uInfo._id}`}> Your Bookings</a>
      : <></>}
      <a href="/search_friend">Serach for friend</a>
      <a href="#">Book for a friend</a>
    </div>
  );
}

export default MainScreen;