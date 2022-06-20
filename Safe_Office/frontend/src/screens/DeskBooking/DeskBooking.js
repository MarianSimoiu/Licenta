import MainMenu from "../../components/MainMenu"
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import floorPrint from "../../images/mainFloor.png"
import { FaRegPlusSquare, FaRegUserCircle } from "react-icons/fa";
import { createBookingAction } from "../../actions/bookingsActions";
import axios from "axios";
import "./DeskBooking.css"
import moment from 'moment'
import {render} from 'react-dom';


function DeskBooking({history, match}) {

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
      if( !floor || !date)
         return        
      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`,
          },
        };
      
      const response  = await axios.get(`/api/bookings/${match.params.id}/${floor}/${date}`, config)
      setFetchedData(response.data)
    }

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`/api/buildings/${match.params.id}`);
            setFloors(data.noFloors);
            setAddress(data.address);
        }

        if (!userInfo) {
          history.push("/login");
        }

        
          
        fetchFilteredBookings()
      
        fetching();
      },[match.params.id,userInfo])

      const submitHandler = (e) => {
        e.preventDefault();
            dispatch(createBookingAction(match.params.id, address, floor, date, codSpace));
            if (!floor || !date || !codSpace) 
               return;
            setShowConfirmation(false)
            setShowConfirmationError(true);
            resetHandler();  
      };

      const resetHandler = () => {
        setFloor("");
        setDate("");
        setSpace("");
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
    
    function Yes(info, slot) {
    
      return(
       <>
         <FaRegUserCircle class="desk" id="slot1"></FaRegUserCircle>
        <div class="hide">
          <p>desk cod: D-2</p>
          <p>status: Unavailable</p>
        </div>
       </>
     
      );
    }

    function IsAvailable(deskNo){
      
      var available = true;
      fetchedData.map((d, i) => {
          if(d.codSpace == deskNo) 
            available = false;
          })
      return available;
    }


    
    function FloorPlan() { 
        return(
        <div>  
          {IsAvailable("D-2") ? <FaRegPlusSquare class="desk" id="slot1" onClick={() => {setShowConfirmation(true); setSpace("D-1")}}></FaRegPlusSquare>: <Yes info={fetchedData} slot={"slot1"}></Yes>}        
            <FaRegPlusSquare class="desk" id="slot2" onClick={() => {setShowConfirmation(true); setSpace("D-2")}}></FaRegPlusSquare>
            <FaRegPlusSquare class="desk" id="slot3" onClick={() => {setShowConfirmation(true); setSpace("D-3")}}></FaRegPlusSquare>
            <FaRegPlusSquare class="desk" id="slot4" onClick={() => {setShowConfirmation(true); setSpace("D-4")}}></FaRegPlusSquare>
            <FaRegPlusSquare class="desk" id="slot5" onClick={() => {setShowConfirmation(true); setSpace("D-5")}}></FaRegPlusSquare>
            <FaRegPlusSquare class="desk" id="slot6" onClick={() => {setShowConfirmation(true); setSpace("D-6")}}></FaRegPlusSquare>
      
            <FaRegPlusSquare class="desk" id="slot7" onClick={() => {setShowConfirmation(true); setSpace("D-7")}}></FaRegPlusSquare>
            <FaRegPlusSquare class="desk" id="slot8" onClick={() => {setShowConfirmation(true); setSpace("D-8")}}></FaRegPlusSquare>
            <FaRegPlusSquare class="desk" id="slot9" onClick={() => {setShowConfirmation(true); setSpace("D-9")}}></FaRegPlusSquare>
            <FaRegPlusSquare class="desk" id="slot10" onClick={() => {setShowConfirmation(true); setSpace("D-10")}}></FaRegPlusSquare>
            <FaRegPlusSquare class="desk" id="slot11" onClick={() => {setShowConfirmation(true); setSpace("D-11")}}></FaRegPlusSquare>
            <FaRegPlusSquare class="desk" id="slot12" onClick={() => {setShowConfirmation(true); setSpace("D-12")}}></FaRegPlusSquare>
            <img  id="image-floor" src={floorPrint} ></img>
            {showConfirmation ? <Confirmation/> : null}
          </div>
        )}


    return(
    <>
      {userInfo &&
        <MainMenu uInfo={userInfo}></MainMenu>}
        {showConfirmationError ? <ConfirmationError/> : null }
        <div className="content">
        <form onSubmit={submitHandler} id="first-form">
          <h2 id="welcome-text">Welcome to Safe Office Desk Booking.</h2>
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
                  <button  id="btn-floor" type="button" class="btn btn-primary" onClick={()=> fetchFilteredBookings()}>Search</button>
                  
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

/*
<div className="control-point">
                    <label for="dateSelect">From:</label> 
                    <span className="custom-dropdown small">
                      <select>
                        <option value=""disabled selected>starting hour</option>
                        <option value="08:00">08:00</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
              
                      </select>
                    </span>
                  </div>

                  <div className="control-point">
                    <label for="dateSelect">To:</label> 
                    <span className="custom-dropdown small">
                      <select>
                        <option value=""disabled selected>end hour</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                        <option value="20:00">20:00</option>
                        <option value="21:00">21:00</option>
                      </select>
                      
                    </span>
                  </div>
*/

export default DeskBooking