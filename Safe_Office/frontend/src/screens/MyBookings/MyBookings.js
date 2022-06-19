import {useSelector,  useDispatch} from "react-redux"
import React, { useEffect , useState} from "react";
import axios from "axios"
import MainMenu from "../../components/MainMenu";
import "./myBookings.css"
import moment from 'moment'
import { deleteBookingAction} from "../../actions/bookingsActions";

function MyBookings({match, history}) {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [address, setAddress] = useState("");
    const [floor, setFloor] = useState("");
    const [date, setDate] = useState("");
    const [desk, setDesk] = useState("");
    const [noFloors, setFloors] = useState("");
    const [filter, setFilter] = useState("All");
    const [status, setStatus] = useState();

    const [fetchedDataActive, setFetchedDataActive] = useState([]);
    const [fetchedDataExpired, setFetchedDataExpired] = useState([]);
    const [fetchedAllData, setFetchedAllData] = useState([]);
    const [fetchedBuilding, setFetchedBuilding] = useState([]);

    const noteDelete = useSelector((state) => state.noteDelete);
    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
          dispatch(deleteBookingAction(id));
        }
        window.location.reload();
      };


    useEffect(() => {

        const fetching = async () => {
              
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
              };

            const response  = await axios.get(`/api/bookings/active/${match.params.user}`, config)
            const respone2 = await axios.get(`/api/bookings/expired/${match.params.user}`, config)
            const respone3 = await axios.get(`/api/bookings/`, config)
           
          
            setFetchedDataActive(response.data)
            setFetchedDataExpired(respone2.data)
            setFetchedAllData(respone3.data)
            
          };
      
          fetching();
    },[match.params.user])

    function ManageFilter(){
        if(filter == "All")
            return(
                <>
                    {fetchedAllData?.map((b,i) => {
                        
                     return( 
                        <tr>
                        <td>{i+1}</td>
                        {b.address?.map((d) =>  {
                            return(
                            <>
                                <td>{d.city}</td>
                                <td>{d.street}</td>
                            </>
                            )})}
                        <td>{b.floor}</td>
                        <td>{b.codSpace}</td>
                        <td>{moment(b.date).format('yyyy/MM/DD')}</td>
                        {b.status == "Active" ? 
                        <td><span className="badge-success">{b.status}</span></td>
                        : <td><span className="badge-inactive">{b.status}</span></td>
                        }
                        <td><button className="btn btn-danger" onClick={() => deleteHandler(b._id)}>Delete</button></td>
                        </tr>
                        )})}
                </>)
        if(filter == "Expired")
             return(
            <>
                {fetchedDataExpired?.map((b,i) =>  

                    <tr>
                    <td>{i+1}</td>
                    {b.address?.map((d) =>  {
                            return(
                            <>
                                <td>{d.city}</td>
                                <td>{d.street}</td>
                            </>
                            )})}
                    <td>{b.floor}</td>
                    <td>{b.codSpace}</td>
                    <td>{moment(b.date).format('yyyy/MM/DD')}</td>
                    <td><span className="badge-inactive">Expired</span></td>
                    <td><button className="btn btn-danger" onClick={() => deleteHandler(b._id)}>Delete</button></td>
                    </tr>)}
            </>)
        if(filter == "Active")
             return(
            <>
                {fetchedDataActive?.map((b,i) =>        
                    <tr data-status="active">
                    <td>{i+1}</td>
                    {b.address?.map((d) =>  {
                            return(
                            <>
                                <td>{d.city}</td>
                                <td>{d.street}</td>
                            </>
                            )})}
                    <td>{b.floor}</td>
                    <td>{b.codSpace}</td>
                    <td>{moment(b.date).format('yyyy/MM/DD')}</td>
                    <td><span className="badge-success">Active</span></td>
                    <td><button className="btn btn-danger" onClick={() => deleteHandler(b._id)}>Delete</button></td>
                    </tr>)}
            </>) }


    return(
<div>
    <MainMenu uInfo={userInfo}></MainMenu> 
    
    <div class="container-xl" >    
        <div class="table-responsive">
            <div class="table-wrapper">   
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6"><h2>Manage <b>Bookings</b></h2></div>
                    <div class="col-sm-6">
                        <div class="btn-group" data-toggle="buttons">
                            <button  class="btn btn-info active" type="radio" name="status" value="all" checked="checked" onClick={()=> setFilter("All")}> All </button>
                            <button  class="btn btn-success" type="radio" name="status" value="active" onClick={ ()=> setFilter("Active")}> Active </button>
                            <button  className="btn btn-warning" type="radio" name="status" value="expired" onClick={ ()=> setFilter("Expired")}> Expired </button>
                        </div>
                    </div>
                </div>
            </div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Floor</th>
                        <th>Space cod</th>
                        <th>Date</th>
                        <th>Status</th> 
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                 <ManageFilter></ManageFilter>
                </tbody>
            </table>
        </div> 
    </div>   
</div> 
</div>

    )
        /*
    return(

        <div>
            <MainMenu uInfo={userInfo}></MainMenu>      
            <div className="content">
                <Filter></Filter>
                <h2 className="mt-3">Current Bookings:</h2>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Type</th>
                            <th scope="col">Address</th>
                            <th scope="col">Date</th>
                            <th scope="col">Floor</th>
                            <th scope="col">Desk</th>
                        </tr>
                    </thead>
                {fetchedDataActie?.map((b) =>        
                    <tbody>
                        <tr className="table-success">
                        <th scope="row">Active</th>
                        <td>{b.address}</td>
                        <td>{moment(b.date).format('yyyy/MM/DD')}</td>
                        <td>{b.floor}</td>
                        <td>{b.desk}</td>
                        </tr>
                    </tbody>
                )}
                </table>
            <div className="expired">
                <h2 className="mt-3">Bookings History:</h2>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Type</th>
                            <th scope="col">Address</th>
                            <th scope="col">Date</th>
                            <th scope="col">Floor</th>
                            <th scope="col">Desk</th>
                        </tr>
                    </thead>
                {fetchedDataExpired?.map((b) => 
                    <tbody>
                        <tr className="table-active">
                        <th scope="row">Expired</th>
                        <td>{b.address}</td>
                        <td>{moment(b.date).format('yyyy/MM/DD')}</td>
                        <td>{b.floor}</td>
                        <td>{b.desk}</td>
                        </tr>
                    </tbody>
                )}
                </table>
                
            </div>

            </div>
        </div>
        
    )
    */
}

export default MyBookings;