import MainMenu from "../../components/MainMenu"
import React, { useEffect, useState } from "react";
import axios from "axios"
import { FaRegUserCircle, FaRegPlusSquare } from "react-icons/fa";
import floorPrint from "../../images/mainFloor.PNG"
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
    const [showError, setShowError] = React.useState(false)
    const [fetchedData, setFetchedData] = useState([]);
    const [pic, setPic] = useState([]);
    const [from, setFrom] = useState("08:00");
    const [to, setTo] = useState("20:00");
    const [isOn, setOn] = React.useState(JSON.parse(localStorage.getItem('is-on')) || false);
    const dispatch = useDispatch();

    
    
    const fetchFilteredBookings = async () => {
      if( !floor || !date)
         return        
      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`,
          },
        };
      
      const startDate = moment(date).add(from, 'm').toDate();
      const endDate = moment(date).add(to, 'm').toDate();
      console.log(startDate)
      const start = new Date(startDate)
      console.log(endDate)

      const response  = await axios.get(`/api/bookings/${match.params.id}/${floor}/${startDate}/${endDate}`, config)
      setFetchedData(response.data)  
      console.log(fetchedData)
    }


    useEffect(() => {
      const fetchBuildingInfo = async() =>{
        const { data } = await axios.get(`/api/buildings/${match.params.id}`);
              setFloors(data.noFloors);
              setAddress(data.address);
              setPic(data.pic);
      }

      if (!userInfo) {
        history.push("/login");
      }

      fetchFilteredBookings();
    
      fetchBuildingInfo();
      },[match.params.id,userInfo,floor,date, from, to])

    const resetHandler = () => {
        setFloor(floor);
        setSpace("");
      };
    
      function canBook(){
        if(isOn)
          if(userInfo.isVaccinated){
            setShowConfirmation(true); 
          }else
            setShowError(true);
        else
        setShowConfirmation(true);
      }
  
      const SubmitHandler = (e) => {
        e.preventDefault();
        const startDate = moment(date).add(from, 'm').toDate();
        const endDate = moment(date).add(to, 'm').toDate();
        dispatch(createBookingAction(match.params.id, address, floor, startDate, endDate, codSpace, userInfo.name));
        
        setShowConfirmation(false)
        setShowConfirmationError(true);
        resetHandler();  
        setTimeout(function(){
          window.location.reload(1);
       }, 1000);
        if (!floor || !date || !codSpace) 
           return;
  };

  

    function ConfirmationError(){
      return(
          <div class="alert alert-dismissible alert-success" id="success-alert">
              <strong>Well done!</strong> Your booking has been <a href="#" class="alert-link">successfully registered</a>.
              <button type="button" class="btn-close" data-bs-dismiss="alert" onClick={() => setShowConfirmationError(false)}></button>
          </div>
      )
  }
  function ErrorConfirmation(){
    return(
      <div class="alert alert-dismissible alert-danger" id="success-alert">
      <strong>Vaccination error!</strong> Your digital covid certificate is not valid or has not been verified. You can upload one in <a href="/profile" class="alert-link">My Profile section</a>.
      <button type="button" class="btn-close" data-bs-dismiss="alert" onClick={() => setShowError(false)}></button>
      </div>
      )
  }
  function Confirmation(){
    return(
      <div class="card bg-secondary mb-3" id="confirmation">
        <div class="card-header">
          <h4>Confirm your booking!</h4>
        </div>
        <div class="card-body">
          {address?.map((d) =>  {
            return(
            <>
              <p>City: {d.city}</p>
              <p>Address: {d.street}</p>
            </>
            )})}
            <p>Floor: {floor}</p>
                <p>Date: {date}</p>
                <p>Time interval: {from} - {to}</p>
                <p>Desk: {codSpace}</p>
        </div>
        <div class="modal-footer">
            <button id="butonSave"  form="first-form" type="submit" class="btn btn-primary" >Save changes</button>
            <button id="butonSave" onClick={ () => {setShowConfirmation(false);}} type="button" class="btn btn-warning"  data-bs-dismiss="modal">Close</button>
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
               
                var start = d.startDate
                var end = d.endDate
                moment(new Date()).format('hh:mm: a')
                //let interval = start.format("H:MM") + "-" + end.format("H:MM")
                let interval = "Time interval: " + moment(start).format("hh:mm a") + " - " + moment(end).format("hh:mm a")
                let string = "booked by: " + d.userName + "<br></br>" +  interval +  "<br></br>" + "space cod: " + d.codSpace 
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
              onClick={() => { setSpace(props.roomNo); canBook()}}></FaRegPlusSquare>
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
          <div style={{position:"relative"}}> 
            {IsAvailable("CR-1") ? <Available cod="slot1" roomNo="CR-1" > </Available> : <Reserved cod="slot1" roomNo="CR-1"></Reserved>}                     
            <img  id="image-floor" src={floorPrint} style={{display:"block"}} alt={"image-floor"}></img>
            {showConfirmation ? <Confirmation/> : null}
          </div>
      )}

   return(
  <>
      
      {userInfo &&
        <MainMenu uInfo={userInfo}></MainMenu>}
        {showConfirmationError ? <ConfirmationError id="confirmation"/> : null }
        {showError ?  <ErrorConfirmation/> : null}
        <TextBar text={"Room Booking"} subText={"Choose a conference room and confirm your booking"}></TextBar>
        <form onSubmit={SubmitHandler} id="first-form">
        <div className="row pt-4">
          <div className="col-2"> </div>
          <div className="col-2 pt-4" style={{margin:"auto"}}> 
            <div class="example">
              <article class="card depth--two"  style={{width:"330px"}}>
                <figure class="image"><img src={pic}/></figure>
                <div class="card__body">
                  <header class="card__primary-title">
                  {address.map((a) => 
                    <>
                    <h2 class="text-large">{a.city}</h2>
                    <span class="badge bg-primary">{a.street}</span>
                    </> 
                    )}
                  </header>
                  <div class="card__supporting-text">      
                    <span class="badge bg-warning">Total floors: {noFloors}</span> <br></br>
                    <span class="badge bg-info">Total desks: {noFloors}</span>  <br></br>
                  </div>
                </div>
              </article>
            </div>
          </div>
         
            <div className="col-2 pt-5">
            
            <div className="control-point" style={{left:"10px"}}>
                <label id="dateLabel">Floor</label>
                <span className="custom-dropdown small">
                    <select id="permission2" value={floor} onChange={(e) => {setFloor(e.target.value); }}>
                      <option value=""disabled selected>select floor</option>
                      {[...Array.from(Array(noFloors).keys())].map((num, i) => <option key={i}>{num+1}</option>)}
                   </select>
                </span>
                <label id="dateLabel">Date</label>
                <input type="date" className="form-control"  id="dateSelect"  value={date} onChange={(e) => setDate(e.target.value)}></input>
                <label id="dateLabel">From</label>
                <input type="time" className="form-control" id="time-from" value={from} step="240" onChange={(e) => setFrom(e.target.value)}></input>
                <label id="dateLabel">To</label>
                <input type="time"  className="form-control"  id="time-to" value={to} onChange={(e) => setTo(e.target.value)}></input>
               
              </div>
              
            </div>         
          <div className="col-5 pt-5" style={{margin:"auto", display:"block"}}>
              <FloorPlan ></FloorPlan>
             
          </div> 
        </div>
      </form>
    
    </>
    )
}
    
  

export default RoomBooking;