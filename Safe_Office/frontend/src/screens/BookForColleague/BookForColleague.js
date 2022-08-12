import React, { useEffect, useState } from "react";
import { FaRegPlusSquare,FaRegUserCircle } from "react-icons/fa";
import { createBookingColleagueAction } from "../../actions/bookingsActions";
import floorPrint from "../../images/mainFloor.PNG"
import TextBar from "../../components/TextBar"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import MainMenu from "../../components/MainMenu"
import moment from 'moment'
import ReactTooltip from 'react-tooltip';
import './BookForColleague.css' 

function BookForColleague({history, match}) {

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
  const [pic, setPic] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [colleague, setColleague] = useState("");

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
      setPic(data.pic);
}

      if (!userInfo) {
        history.push("/login");
      }

      fetchFilteredBookings();
      fetching();
    },[match.params.id,userInfo,floor,date])

  
    const SubmitHandler = (e) => {
      e.preventDefault();
      const startDate = moment(date).add(from, 'm').toDate();
      const endDate = moment(date).add(to, 'm').toDate();
      dispatch(createBookingColleagueAction(match.params.id, address, floor, startDate, endDate, codSpace, colleague));
      
      setShowConfirmation(false)
      setShowConfirmationError(true);
      resetHandler();  
      setTimeout(function(){
        window.location.reload(1);
     }, 1000);
      if (!floor || !date || !codSpace) 
         return;
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
            <p>Floors: {floor}</p>
            <p>Date: {date}</p>
            <p>Space cod: {codSpace}</p>
        </div>
        <div class="modal-footer">
            <button  form="first-form" type="submit" class="btn btn-primary" id="btn-">Save changes</button>
            <button onClick={ () => {setShowConfirmation(false);}} type="button" class="btn btn-danger"  data-bs-dismiss="modal">Close</button>
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
      <div style={{position:"relative"}}> 
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
        {showConfirmationError ? <ConfirmationError id="confirmation"/> : null }
        
        <TextBar text={"Room Booking"} subText={"Choose a conference room and confirm your booking"}></TextBar>
        <form onSubmit={SubmitHandler} id="first-form">
        <div className="row">
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
              
                <label id="dateLabel">Date</label>
                <input type="date" className="form-control"  id="dateSelect"  value={date} onChange={(e) => setDate(e.target.value)}></input>
                <label id="dateLabel">From</label>
                <input type="time" className="form-control" id="time-from" value={from} onChange={(e) => setFrom(e.target.value)}></input>
                <label id="dateLabel">To</label>
                <input type="time"  className="form-control"  id="time-to" value={to} onChange={(e) => setTo(e.target.value)}></input>
                <label id="dateLabel">Colleague</label> <br></br>
                <span className="custom-dropdown small" >
                  <select id="colleague" value={colleague} onChange={(e) => {setColleague(e.target.value)}}>
                    <option value="" select disabled hidden>Choose Colleague</option>
                    {userInfo.permission?.map((p,i) => {
                      return(
                        <option key={i}>{p}</option>
                      )})}
                  </select>
                </span>

              </div>
              
            </div>         
          <div className="col-5 pt-5" style={{margin:"auto", display:"block"}}>
              <FloorPlan ></FloorPlan>
              <div div class="btn-group me-2" role="group" aria-label="First group">
                {[...Array.from(Array(noFloors).keys())].map((num, i) =>{
                  return(
                      <button  type="button" class="btn btn-primary" value={num+1} onClick={(e) => setFloor(e.target.value)}> {num+1}</button>
                    )})}
              </div>
          </div> 
        </div>
      </form>
  </>
  )
}
export default BookForColleague;
