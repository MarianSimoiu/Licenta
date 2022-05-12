import React, { useEffect, useState } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import { createBookingAction } from "../../actions/bookingsActions";
import {listBuildingDesks, listBuildings} from "../../actions/buildingActions";
import floorPrint from "../../images/mainFloor.png"

import { useDispatch, useSelector } from "react-redux";
import { listBookings } from "../../actions/bookingsActions";
import axios from "axios";
import MainMenu from "../../components/MainMenu"

function BookFriend({history, match}) {

  const [address, setAddress] = useState("");
  const [floor, setFloor] = useState("");
  const [date, setDate] = useState("");
  const [desk, setDesk] = useState("");
  const [fDesk, setFetchDesk] = useState("");
  const [noFloors, setFloors] = useState("");
  const floors = 10;
  const [fetchedData, setFetchedData] = useState([]);
  const [fetchedDesks, setFetchedDesks] = useState([]);
  const dispatch = useDispatch();
  const city = "ROmania";
  const buildingList = useSelector((state) => state.buildingList);
  const {buildings}  = buildingList;

  
  const desksList = useSelector((state) => state.desksList);
  const {desks} = desksList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  

  const fetching = async () => {
              
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
    const response  = await axios.get(`/api/buildings/${address}`, config)
    setFetchedData(response.data)

    var fetchedD
    fetchedData?.map((f) => fetchedD = f.floors[floor-1].desks)
    setFetchedDesks(fetchedD)
  }

  useEffect(() => {
    dispatch(listBuildings())
    fetching()
    if (!userInfo) {
      history.push("/login");
    }
  },[dispatch,userInfo])
                 
 
  const [showSearch, setShowSearch] = React.useState(false)


  const [setFloorPlan, setShowFloor] = React.useState(false)
  

  const bookingList = useSelector((state) => state.bookingList);
  const { bookings } = bookingList;
  
  const resetHandler = () => {
    setAddress("");
    setFloor("");
    setDate("");
    setDesk("");
  };

  const [showConfirmation, setShowConfirmation] = React.useState(false)

  const [showConfirmationError, setShowConfirmationError] = React.useState(false)

  const submitHandler = (e) => {
    e.preventDefault();
        dispatch(createBookingAction(city, address, floor, date, desk));
        if (!city || !address || !floor || !date || !desk) 
           return;
        setShowConfirmation(false)
        setShowConfirmationError(true);
        resetHandler();  
      // history.push("/");
  };
  

  const bookingCreate = useSelector((state) => state.bookingCreate);
  const { success: successCreate } = bookingCreate;


function ConfirmationError(){
    return(
        <div class="alert alert-dismissible alert-success" id="success-alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" onClick={() => setShowConfirmationError(false)}></button>
            <strong>Well done!</strong> Your booking has been <a href="#" class="alert-link">successfully registered</a>.
        </div>
    )
}
function Confirmation(){
  return(
    <div className="modal-sm" id="confirmation">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Confirm Booking</h5>
          <button onClick={ () => {setShowConfirmation(false)}}  type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">

          <span aria-hidden="true"></span>
          </button>
        </div>
        <div class="modal-body">
          <p>Address: {address}</p>
          <p>Floors: {floor}</p>
          <p>Date: {date}</p>
          <p>Desk: {desk}</p>
        </div>
        <div class="modal-footer">
          <button  form="first-form" type="submit" class="btn btn-primary">Save changes</button>
          <button onClick={ () => setShowConfirmation(false)} type="button" class="btn btn-secondary"  data-bs-dismiss="modal">Close</button>
          
        </div>
     </div>
    </div>
  </div>
  )}


function FloorPlan() {
  return(
  <div>
      <FaRegPlusSquare class="desk" id="slot1" onClick={() => {setShowConfirmation(true); setDesk(1)}}></FaRegPlusSquare>
      {showConfirmation ? <Confirmation/> : null}
      <FaRegPlusSquare class="desk" id="slot2"></FaRegPlusSquare>
      <FaRegPlusSquare class="desk" id="slot3"></FaRegPlusSquare>
      <FaRegPlusSquare class="desk" id="slot4"></FaRegPlusSquare>
      <FaRegPlusSquare class="desk" id="slot5"></FaRegPlusSquare>
      <FaRegPlusSquare class="desk" id="slot6"></FaRegPlusSquare>

      <FaRegPlusSquare class="desk" id="slot7"></FaRegPlusSquare>
      <FaRegPlusSquare class="desk" id="slot8"></FaRegPlusSquare>
      <FaRegPlusSquare class="desk" id="slot9"></FaRegPlusSquare>
      <FaRegPlusSquare class="desk" id="slot10"></FaRegPlusSquare>
      <FaRegPlusSquare class="desk" id="slot11"></FaRegPlusSquare>
      <FaRegPlusSquare class="desk" id="slot12"></FaRegPlusSquare>
      <img  id="image-floor" src={floorPrint} ></img>
      {showConfirmation ? <Confirmation/> : null}
    </div>
  )}

function Search(){
  return(
  <div className="search-table">
    {fetchedDesks?.map((data, i) =>  {if(data.status == "available"){  i = i - 1
    
    return(
    <table class="table table-hover">
    <thead>
    <tr>
      <th scope="col">Building</th>
      <th scope="col">Floor</th>
      <th scope="col">Desk</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
     <tbody>
     <tr class="table-light">
      <td>{address}</td>
      <td>{floor}</td> 
      <td>{data.deskNo}</td>
      <td>{data.status}</td>
      <button type="button" id="btn-booking"className="btn btn-success" onClick={ () => {setShowConfirmation(true); setDesk(data.deskNo)}}>Book now!</button>
    </tr>
  </tbody>
  </table> )}}
    )}
  {showConfirmation ? <Confirmation/> : null}
  </div>
  )
}

  return (
  <div>

    <MainMenu uInfo={userInfo}></MainMenu>
    { showConfirmationError ? <ConfirmationError/> : null }
    <div class="content">
      <h1>Welcome to Safe Office Desk Booking System!</h1>
      <div class="search-container">
        <h2 >Quick search for a desk!</h2>
        
        <form onSubmit={submitHandler} id="first-form">
        
          <label for="buildingSelect" class="form-label mt-2">Address:</label>
          <select class="form-select" id="buildingSelect"  onChange={(e) => setAddress(e.target.value)}>
            <option value=""disabled selected>select address</option>
            {buildings?.map((b) => 
             <option  value={b.address} key ={b._id} >{b.address}</option>
             )}
          </select>
    
          <label for="floorSelect" class="form-label mt-2" id="floorSelect" >Floor:</label>
          <select class="form-select" id="inputSmall" value={floor} onChange={(e) => setFloor(e.target.value)}>
            <option value=""disabled selected>select floor</option>
            {[...Array.from(Array(floors).keys())].map((num, i) => <option key={i}>{num+1}</option>)}
          </select>
      

          <label for="dateSelect" class="form-label mt-2">Date:</label> <br></br>
          <input type="date" class="form-control"  id="dateSelect"  value={date} onChange={(e) => setDate(e.target.value)}></input>
        </form>
        <button className="btn btn-outline-primary mt-4" id="submit1" onClick={() => {fetching();setShowSearch(true)}}>Search</button>
        <button className="btn btn-outline-warning mt-4" id="submit2" onClick={() => setShowSearch(false)}>Floor plan</button>
      </div>
    </div>
    <div class="floor">
    {showSearch ? <Search/> : <FloorPlan/>}
    </div>
    
  </div>
  );
}
export default BookFriend;
