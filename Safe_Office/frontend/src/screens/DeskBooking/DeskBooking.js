import MainMenu from "../../components/MainMenu"
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import floorPrint from "../../images/mainFloor.png"
import { FaRegPlusSquare } from "react-icons/fa";
import { listBuildingById } from "../../actions/buildingActions";
import axios from "axios";

function DeskBooking({history, match}) {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [address, setAddress] = useState("");
    const [floor, setFloor] = useState("");
    const [date, setDate] = useState(new Date())
    const [desk, setDesk] = useState("");
    const [noFloors, setFloors] = useState("");

    const [showConfirmation, setShowConfirmation] = React.useState(false)
    const [showConfirmationError, setShowConfirmationError] = React.useState(false)

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`/api/buildings/${match.params.id}`);
            setFloors(data.noFloors);
        }

        if (!userInfo) {
          history.push("/login");
        }

        fetching();
      },[match.params.id,userInfo])


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
            <FaRegPlusSquare class="desk" id="slot1" onClick={() => {setShowConfirmation(true);}}></FaRegPlusSquare>
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

    return(
    <>
        <MainMenu uInfo={userInfo}></MainMenu>
        <div className="content">
            <div className="search-container">
                
            </div>
            <div className="floor">
                <FloorPlan></FloorPlan>
            </div>
        </div>
    </>
    )
}


export default DeskBooking