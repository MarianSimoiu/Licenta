
import {useSelector} from "react-redux"
import React, { useEffect , useState} from "react";
import axios from "axios"
import MainMenu from "../../components/MainMenu";
import "./myBookings.css"
function MyBookings({match}) {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [address, setAddress] = useState("");
    const [floor, setFloor] = useState("");
    const [date, setDate] = useState("");
    const [desk, setDesk] = useState("");
    const [noFloors, setFloors] = useState("");
    const [fetchedDataActie, setFetchedDataActive] = useState([]);
    const [fetchedDataExpired, setFetchedDataExpired] = useState([]);
    useEffect(() => {

        const fetching = async () => {
              
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
              };

            const response  = await axios.get(`/api/bookings/active/${match.params.user}`, config)
            const respone2 = await axios.get(`/api/bookings/expired/${match.params.user}`, config)
            console.log(response.data)
            setFetchedDataActive(response.data)
            setFetchedDataExpired(respone2.data)
            
          };
      
          fetching();
    },[match.params.user])

      
    return(
        <div>
            <MainMenu uInfo={userInfo}></MainMenu>
           
            <div className="content">
                <h1>Current Bookings!</h1>
                {fetchedDataActie?.map((b) => 
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Type</th>
                            <th scope="col">Address</th>
                            <th scope="col">Date</th>
                            <th scope="col">Floor</th>
                            <th scope="col">Desk</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="table-success">
                        <th scope="row">Active</th>
                        <td>{b.address}</td>
                        <td>{b.date}</td>
                        <td>{b.floor}</td>
                        <td>{b.desk}</td>
                        </tr>
                    </tbody>
                </table>
                )}
            <div className="expired">
                <h2>Bookings History:</h2>
                {fetchedDataExpired?.map((b) =>
                <table class="table table-hover m-3">
                    <thead>
                        <tr>
                            <th scope="col">Type</th>
                            <th scope="col">Address</th>
                            <th scope="col">Date</th>
                            <th scope="col">Floor</th>
                            <th scope="col">Desk</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="table-active">
                        <th scope="row">Expired</th>
                        <td>{b.address}</td>
                        <td>{b.date}</td>
                        <td>{b.floor}</td>
                        <td>{b.desk}</td>
                        </tr>
                    </tbody>
                </table>
                )}
            </div>

            </div>
        </div>
        
    )
}

export default MyBookings;