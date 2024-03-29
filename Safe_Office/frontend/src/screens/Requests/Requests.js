import TextBar from "../../components/TextBar";
import MainMenu from "../../components/MainMenu"
import {useSelector} from "react-redux"
import React, { useEffect , useState} from "react";
import axios from "axios"
import "./Requests.css"
function Request({history}){

    
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [fetchedAllData, setFetchedAllData] = useState([]);
    const [showConfirmation, setShowConfirmation] = React.useState(false)
    const [pdf, setPdf] = useState([""])

    const deleteRequest = async(id) =>{
        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          };

        if (window.confirm("Are you sure?")) {
            const {data} = await axios.delete(`/api/request/${id}`, config);
          }
        window.location.reload();
    }

    const updateRequest = async(id, request) =>{
        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          };

        const {data} = await axios.put(`/api/users/status/${id}`, config);
        localStorage.setItem("userInfo", JSON.stringify(data));
        deleteRequest(request);
        window.location.reload();
    }

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
          }
        const fetching = async () => {
              
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
              };
            const respone = await axios.get(`/api/request/`, config);
        
            setFetchedAllData(respone.data)
          };
      
          fetching();
    },[userInfo])

    function Confirmation(){
        return(
           <div className="fill">
                <iframe id="frame" src={pdf}></iframe>
                 
                 <button type="button" id="btnClose" onClick={ () => {setShowConfirmation(false);}}class="btn-close" data-bs-dismiss="alert"></button>
                
           </div>
            

          )}

    function ManageRequests(){
        return(
            <>
            {fetchedAllData?.map((b,i) => {
                
             return( 
                <tr>
                <td>{i+1}</td>
                <td>Nume</td>
                <td><a onClick={() => {setShowConfirmation(true); setPdf(b.dcc)}}>Click to view</a></td>  
                <td><button class="btn btn-success" onClick={() => {updateRequest(b.user,b._id)}}>Validate</button></td>
                <td><button className="btn btn-danger" onClick={() => {deleteRequest(b._id)}}>Reject</button></td>
                </tr>
                
                )})}
        </>      
        )
    }
    return(
    <>
    <MainMenu uInfo={userInfo}></MainMenu>
    <TextBar text={"Request"} subText={"Check and validate vaccination certificates"}></TextBar>
    {showConfirmation ? <Confirmation/> : null}
    <div class="container-xl" >    
        <div class="table-responsive">
            <div class="table-wrapper">   
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6"><h2>Manage <b>Requests</b></h2></div>
                    <div class="col-sm-6">
                        <div class="btn-group" data-toggle="buttons">
        
                        </div>
                    </div>
                </div>
            </div>
            
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>DCC</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                 <ManageRequests/>
                </tbody>
            </table>
        </div> 
    </div>   
</div> 
    </>
    )
}


export default Request;