import MainMenu from "../../components/MainMenu"
import TextBar from "../../components/TextBar"
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import floorPrint from "../../images/mainFloor.PNG"
import { FaRegPlusSquare, FaRegUserCircle} from "react-icons/fa";
import { createBookingAction } from "../../actions/bookingsActions";
import axios from "axios";
import moment from 'moment'
import ReactTooltip from 'react-tooltip';


function TableBooking({history, match}){
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading, error, success } = userUpdate;
    
    var today = moment(new Date()).format('YYYY-MM-DD');
    var time = moment(new Date()).format('hh:mm: a')

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
      },[match.params.id,userInfo,floor,date, history])
      
    
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

      const resetHandler = () => {
        setFloor(floor);
        setSpace("");
      };
     
      function ConfirmationError(){
        return(
            <div class="alert alert-dismissible alert-success" id="success-alert" >
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
                <p>Desk: {codSpace}</p>
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
                             
          <img  id="image-floor" src={floorPrint} style={{display:"block"}} alt={"image-floor"}></img>
          {showConfirmation ? <Confirmation/> : null}
        </div>
        )}


    return(
        <>
          {userInfo &&
            <MainMenu uInfo={userInfo}></MainMenu>}
            {showConfirmationError ? <ConfirmationError id="confirmation"/> : null }
            
            <TextBar text={"Desk Booking"} subText={"Choose a desk and confirm your booking"}></TextBar>
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
    )}


export default TableBooking;