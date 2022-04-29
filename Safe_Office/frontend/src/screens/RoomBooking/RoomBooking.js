import MainMenu from "../../components/MainMenu"
import React, { useEffect, useState } from "react";
import axios from "axios"
import { FaBorderNone, FaRegPlusSquare } from "react-icons/fa";
import floorPrint from "../../images/mainFloor.png"
import { createBookingAction } from "../../actions/bookingsActions";
import { useDispatch, useSelector } from "react-redux";
import {listBuildings} from "../../actions/buildingActions";
import  "./RoomBooking.css"

function RoomBooking({history}) {
    
    const [address, setAddress] = useState("");
    const [floor, setFloor] = useState("");
    const [date, setDate] = useState("");
    const [floorSeat, setFloorSeat] = useState("");
    const [fDesk, setFetchDesk] = useState("");
    const [noFloors, setFloors] = useState("");
    const floors = 10;
    const [fetchedData, setFetchedData] = useState([]);
    const dispatch = useDispatch();
    const city = "ROmania";
    const buildingList = useSelector((state) => state.buildingList);
    const {buildings}  = buildingList;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [showConfirmation, setShowConfirmation] = React.useState(false)
    const [showSearch, setShowSearch] = React.useState(false)

    const [showConfirmationError, setShowConfirmationError] = React.useState(false)
    const [showSearchError, setShowSearchError] = React.useState(false)

    const fetching = async () => {
              
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
          };
      
        const response  = await axios.get(`/api/buildings/${address}`, config)
        setFetchedData(response.data)
        console.log(response.data)
      }

    var fetchedRooms
    fetchedData?.map((f) => fetchedRooms = f.floors[floor-1].conferenceRooms)
    console.log(fetchedRooms)


    useEffect(() => {
        dispatch(listBuildings())
        
      },[dispatch])

    const resetHandler = () => {
        setAddress("");
        setFloor("");
        setDate("");
        setFloorSeat("");
      };
    
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createBookingAction(city, address, floor, date, floorSeat));
        if (!city || !address || !floor || !date || !floorSeat) 
           return;
        setShowConfirmation(false)
        setShowConfirmationError(true);
        resetHandler();  
        history.push("/room_booking");
      };

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
                <p>Room: {floorSeat}</p>
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
            <img  id="image-floor" src={floorPrint} ></img>
            <FaRegPlusSquare className="room" id="conference_room" onClick={() => {setShowConfirmation(true); setFloorSeat("1-CR")}}></FaRegPlusSquare>
            {showConfirmation ? <Confirmation/> : null}
            
            
        </div>
        )}

    function Search(){
        return(
        <div>
          {fetchedRooms?.map((data, i) =>  {if(data.status == "available"){  i = i - 1
          
          return(
          <table class="table table-hover">
          <thead>
          <tr>
            <th scope="col">Nr.crt</th>
            <th scope="col">Building</th>
            <th scope="col">Floor</th>
            <th scope="col">Room</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
           <tbody>
           <tr class="table-light">
            <td>{i+1}</td> 
            <td>{address}</td>
            <td>{floor}</td> 
            <td>{data.conferenceRoomNo}{"-CR"}</td>
            <td>{data.status}</td>
            <button type="button" id="btn-booking"class="btn btn-success" onClick={ () => {setShowConfirmation(true); setFloorSeat(data.conferenceRoomNo)}}>Book now!</button>
          </tr>
        </tbody>
        </table> )}}
          )}
        {showConfirmation ? <Confirmation/> : null}
        </div>
        )
      }

   return(
<>
    <MainMenu uInfo={userInfo}></MainMenu>
     { showConfirmationError ? <ConfirmationError/> : null }
    <div class="content">
      <h1>Welcome to Safe Office Desk Booking System!</h1>
      <div class="search-container">
        <h2 >Quick search for a room!</h2>
        
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
          <button type="submit" class="btn btn-outline-primary mt-4" id="submit1" onClick={() => {setShowSearch(true);fetching()}}>Search</button>
          <button type="submit" class="btn btn-outline-warning mt-4" id="submit2" onClick={() => setShowSearch(false)}>Floor plan</button>
        </form>
      </div>
    </div>
    <div class="floor">
        
    {showSearch ? <Search/> : <FloorPlan/>}
    </div>
    
</>
       
   )
}

export default RoomBooking;