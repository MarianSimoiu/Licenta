import MainMenu from "../../components/MainMenu"
import TextBar from "../../components/TextBar"
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import floorPrint from "../../images/mainFloor.png"
import { FaRegPlusSquare, FaRegUserCircle } from "react-icons/fa";
import { createBookingAction } from "../../actions/bookingsActions";
import axios from "axios";
import "./DeskBooking.css"
import moment from 'moment'
import ReactTooltip from 'react-tooltip';
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
  
        fetchFilteredBookings();
        fetching();
      },[match.params.id,userInfo,floor,date,fetchFilteredBookings])

    
      const SubmitHandler = (e) => {
            e.preventDefault();
            dispatch(createBookingAction(match.params.id, address, floor, date, codSpace, userInfo.name));
            if (!floor || !date || !codSpace) 
               return;
            setShowConfirmation(false)
            setShowConfirmationError(true);
            resetHandler();  
      };

      const resetHandler = () => {
        setFloor(floor);
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
    
    
   

    function Reserved(props) {
      
      return(
          fetchedData?.map((d, i) => {
          if(d.codSpace == props.deskNo) {
            if(d.user == userInfo._id)
              var cls = "deskReservedByMe";
            else
              var cls = "deskReserved";
            let string = "booked by: " + d.userName + "<br></br>" +   "space cod: " + d.codSpace 
          return( 
          <>
            <FaRegUserCircle class={cls} id={props.cod} key={props.cod}  data-type="warning" data-place ="top"
            data-tip={string} data-html={true} ></FaRegUserCircle>
            <ReactTooltip />
          </>
          )}

        }))
    }

    function Available(props) {
      let string = "Available!" + "<br></br>" + "space cod: " + props.deskNo;

      return(
        <>
          <FaRegPlusSquare class="desk" id={props.cod} key={props.cod} data-type="success" data-tip={string} data-html={true}
          onClick={() => {setShowConfirmation(true); setSpace(props.deskNo)}}></FaRegPlusSquare>
          <ReactTooltip />
        </>
      )
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
          {IsAvailable("D-1") ? <Available cod="slot1" deskNo="D-1" > </Available> : <Reserved cod="slot1" deskNo="D-1"></Reserved>}
          {IsAvailable("D-2") ? <Available cod="slot2" deskNo="D-2" > </Available> : <Reserved cod="slot2" deskNo="D-2"></Reserved>}  
          {IsAvailable("D-3") ? <Available cod="slot3" deskNo="D-3" > </Available> : <Reserved cod="slot3" deskNo="D-3"></Reserved>} 
          {IsAvailable("D-4") ? <Available cod="slot4" deskNo="D-4" > </Available> : <Reserved cod="slot4" deskNo="D-4"></Reserved>} 
          {IsAvailable("D-5") ? <Available cod="slot5" deskNo="D-5" > </Available> : <Reserved cod="slot5" deskNo="D-5"></Reserved>} 
          {IsAvailable("D-6") ? <Available cod="slot6" deskNo="D-6" > </Available> : <Reserved cod="slot6" deskNo="D-6"></Reserved>}
          {IsAvailable("D-7") ? <Available cod="slot7" deskNo="D-7" > </Available> : <Reserved cod="slot7" deskNo="D-7"></Reserved>}
          {IsAvailable("D-8") ? <Available cod="slot8" deskNo="D-8" > </Available> : <Reserved cod="slot8" deskNo="D-8"></Reserved>}
          {IsAvailable("D-9") ? <Available cod="slot9" deskNo="D-9" > </Available> : <Reserved cod="slot9" deskNo="D-9"></Reserved>}
          {IsAvailable("D-10") ? <Available cod="slot10" deskNo="D-10" > </Available> : <Reserved cod="slot10" deskNo="D-10"></Reserved>}
          {IsAvailable("D-11") ? <Available cod="slot11" deskNo="D-11" > </Available> : <Reserved cod="slot11" deskNo="D-11"></Reserved>}
          {IsAvailable("D-12") ? <Available cod="slot12" deskNo="D-12" > </Available> : <Reserved cod="slot12" deskNo="D-12"></Reserved>}                      
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
        <form onSubmit={SubmitHandler} id="first-form">
          
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