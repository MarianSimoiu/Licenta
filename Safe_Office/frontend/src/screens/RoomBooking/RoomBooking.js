import MainMenu from "../../components/MainMenu"
import React, { useEffect, useState } from "react";
import axios from "axios"
import { FaRegUserCircle, FaRegPlusSquare } from "react-icons/fa";
import floorPrint from "../../images/mainFloor.png"
import { createBookingAction } from "../../actions/bookingsActions";
import { useDispatch, useSelector } from "react-redux";
import {listBuildings} from "../../actions/buildingActions";
import  "./RoomBooking.css"
import TextBar from "../../components/TextBar"; 
import moment from "moment";
import ReactTooltip from 'react-tooltip';

function RoomBooking({history, match}) {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;


    var today = moment(new Date()).format('YYYY-MM-DD');

    const [address, setAddress] = useState([]);
    const [floor, setFloor] = useState("1");
    const [date, setDate] = useState(today)
    const [codSpace, setSpace] = useState("");
    const [noFloors, setFloors] = useState("");
    const [showConfirmation, setShowConfirmation] = React.useState(false)
    const [showConfirmationError, setShowConfirmationError] = React.useState(false)
    const [fetchedData, setFetchedData] = useState([]);
    
    const dispatch = useDispatch();

    const fetchFilteredBookings = async () => {
        if(!floor && !date)
          return;

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
          };
      
        const response  = await axios.get(`/api/bookings/${match.params.id}/${floor}/${date}`, config)
        setFetchedData(response.data)
      }


    useEffect(() => {
      const fetchBuildingInfo = async() =>{
        const { data } = await axios.get(`/api/buildings/${match.params.id}`);
              setFloors(data.noFloors);
              setAddress(data.address);
      }

      if (!userInfo) {
        history.push("/login");
      }

      fetchFilteredBookings();
    
      fetchBuildingInfo();
      },[match.params.id,userInfo,floor,date])

    const resetHandler = () => {
        setFloor(floor);
        setSpace("");
      };
    
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createBookingAction(match.params.id, address, floor, date, codSpace, userInfo.name));
        if (!floor || !date || !codSpace) 
               return;
            setShowConfirmation(false)
            setShowConfirmationError(true);
            resetHandler();  
      };

  

    function ConfirmationError(){
      return(
          <div class="alert alert-dismissible alert-success" id="success-alert">
              <strong>Well done!</strong> Your booking has been <a href="#" class="alert-link">successfully registered</a>.
              <button type="button" class="btn-close" data-bs-dismiss="alert" onClick={() => setShowConfirmationError(false)}></button>
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
                {address?.map((d) =>  {
                  return(
                  <>
                    <p>City: {d.city}</p>
                    <p>Address: {d.street}</p>
                  </>
                  )})}
                  <p>Floors: {floor}</p>
                  <p>Date: {date}</p>
                  <p>Desk: {codSpace}</p>
                </div>
                <div class="modal-footer">
                  <button  form="first-form" type="submit" class="btn btn-primary">Save changes</button>
                  <button onClick={ () => {setShowConfirmation(false);}} type="button" class="btn btn-secondary"  data-bs-dismiss="modal">Close</button>
                </div>
             </div>
            </div>
          </div>
          )}


    function Reserved(props) {
      
          return(
              fetchedData?.map((d, i) => {
              if(d.codSpace == props.roomNo) {
                if(d.user == userInfo._id)
                  var cls = "roomReservedByMe";
                else
                  var cls = "roomReserved";
                let string = "booked by: " + d.userName + "<br></br>" +   "space cod: " + d.codSpace 
              return( 
              <>
                <FaRegUserCircle class={cls}  key={props.cod}  data-type="warning" data-place ="top"
                data-tip={string} data-html={true} ></FaRegUserCircle>
                <ReactTooltip />
              </>
              )}
    
            }))
    }


    function Available(props) {
          let string = "Available!" + "<br></br>" + "space cod: " + props.roomNo;
    
          return(
            <>
              <FaRegPlusSquare class="room" key={props.cod} data-type="success" data-tip={string} data-html={true}
              onClick={() => {setShowConfirmation(true); setSpace(props.roomNo)}}></FaRegPlusSquare>
              <ReactTooltip />
            </>
          )
    }

    function IsAvailable(roomNo){
      
          var available = true;
          fetchedData.map((d, i) => {
              if(d.codSpace == roomNo) 
                available = false;
              })
          return available;
    }

    function FloorPlan() { 
          return(
          <div> 
            {IsAvailable("CR-1") ? <Available cod="slot1" roomNo="CR-1" > </Available> : <Reserved cod="slot1" roomNo="CR-1"></Reserved>}                     
            <img  id="image-floor" src={floorPrint} ></img>
            {showConfirmation ? <Confirmation/> : null}
          </div>
      )}

   return(
  <>
      {userInfo &&
        <MainMenu uInfo={userInfo}></MainMenu>}
        {showConfirmationError ? <ConfirmationError/> : null }
        <TextBar text={"Welcome to Safe Office Desk Booking System!"}></TextBar>
        <div className="content">         
        <form onSubmit={submitHandler} id="first-form">
          
            <div className="row">
                <div className="col-sm-4">
                  <div className="control-area"  >
                    <h4 id="header-search">Quick desk search</h4>
                    <div className="control-point" id="floorSelect">
 
                    {address?.map((d) =>  {
                        return (
                          <>
                            <p>City: <p id="info">{d.city}</p></p>
                            <p>Address: <p id="info">{d.street}</p></p>
                          </>
                        );
                      })} 
                       
                      <label for="floorSelect" class="form-label mt-2" >Floor:</label>
                      <span className="custom-dropdown small">
                        <select value={floor} onChange={(e) => {setFloor(e.target.value); }}>
                          <option value=""disabled selected>select floor</option>
                          {[...Array.from(Array(noFloors).keys())].map((num, i) => <option key={i}>{num+1}</option>)}
                         </select>
                      </span>
                      
                      
                     </div>
              
                  <div className="control-point">
                    <label for="dateSelect">Date:</label> 
                    <input type="date" className="form-control"  id="dateSelect"  value={date} onChange={(e) => setDate(e.target.value)}></input>
                  </div>
                  <div className="line"></div>
                  
                </div>
                </div>          
                <div className="col-sm-4">
                  <div className="floor">
                    <FloorPlan></FloorPlan>
                  </div>
                </div>
            </div>    
          </form>
        </div>
    </>
    )
}
    
  

export default RoomBooking;