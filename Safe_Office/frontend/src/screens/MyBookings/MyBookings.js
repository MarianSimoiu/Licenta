
import {useDispatch, useSelector} from "react-redux"
import React, { useEffect , useState} from "react";
import axios from "axios"


function MyBookings({match}) {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [address, setAddress] = useState("");
    const [floor, setFloor] = useState("");
    const [date, setDate] = useState("");
    const [desk, setDesk] = useState("");
    const [noFloors, setFloors] = useState("");
    const [fetchedData, setFetchedData] = useState([]);
    useEffect(() => {

        const fetching = async () => {
              
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
              };

            const response  = await axios.get(`/api/bookings/${match.params.user}`, config)
            console.log(response.data)
            setFetchedData(response.data)
          };
      
          fetching();
    },[match.params.user])

      
    return(
        <div>
            {fetchedData?.map((d) => <p>{d.address}</p>)}
            <div className="sidebar">
                <a href="#lo">Desk Booking</a>
                <a href="#contact">Room Booking</a>
                <a href="#about">Your Bookings</a>
            </div>
            <div className="content">
                <h1>Current Bookings!</h1>

            </div>
        </div>
        
    )
}

export default MyBookings;