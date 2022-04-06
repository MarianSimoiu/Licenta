import React, { useEffect, useState } from "react";
import { listBookings } from "../../actions/bookingsActions";
import { useSelector, useDispatch } from "react-redux";


function Test(){
 
    const dispatch = useDispatch();
    const bookingList = useSelector((state) => state.bookingList);
    const { loading, error, bookings } = bookingList;

    useEffect(() => {
        dispatch(listBookings());
      }, [dispatch]);

    return(
        <div>
        { bookings?.map(building => <p key={building._id}>{building.city}</p>)}
        </div>
    )}

  export default Test;