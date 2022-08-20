import React, { useState, useEffect } from "react";
import MainMenu from "../../components/MainMenu";
import "./ProfileScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { addPermission, updateProfile } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import TextBar from "../../components/TextBar";
import axios from "axios";
import {AiFillCamera} from "react-icons/ai";

const ProfileScreen = ({match, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();
  const [fetchedData, setFetchedData] = useState([]);
  const [colleague, setColleague] = useState("");
  const [userNameAdd, setAddPermission] = useState("");
  const [userNameDelete, setDeletePermission] = useState("");
  const [permissionType, setPermissionType] = useState("")
  const [certificate, setCertificate] = useState("");


  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;


  useEffect(() => {
    const fetchColleagues = async() =>{
      const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
      };
    
    const response  = await axios.get(`/api/users/`, config)
    setFetchedData(response.data)
    }

    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
    fetchColleagues();
  }, [history, userInfo]);

  const postDetailsVaccination = (pics) => {
    const cod = createPassword(5)

    setPicMessage(null);
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Safe_Office");
      data.append("cloud_name","dhfeqdcb2");
      data.append("public_id", `${userInfo.name + "_" + userInfo.email + cod}`);
      data.append("folder", "digital_green_certificate")
      fetch("https://api.cloudinary.com/v1_1/dhfeqdcb2/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setCertificate(data.url.toString());
          console.log(certificate)
        })
        .catch((err) => {
          console.log(err);
        });
  };
  function createPassword(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
  }
  const user = userInfo._id;

  const sendRequest = async () => {
    console.log("Am trimis request", certificate)
    const config = {
      headers: {
          Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const dcc = certificate
    await axios.post(`/api/request/create-requests`, {user, dcc}, config);
  }


  const postDetails = (pics) => {
    
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Safe_Office");
      data.append("cloud_name", "dhfeqdcb2");
      data.append("public_id", `${userInfo.name + "_" + userInfo.email }`);
      data.append("folder", "profile_picture")
      fetch("https://api.cloudinary.com/v1_1/dhfeqdcb2/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const submitHandler = (e) => {

    e.preventDefault();
    let permissionArray = [];
    if(permissionType == "add")
      permissionArray.push(permissionType, userNameAdd);
    if(permissionType == "delete")
      permissionArray.push(permissionType, userNameDelete);
    console.log(certificate)
    if(certificate){
       sendRequest();
    }
    dispatch(updateProfile({ name, email, password, pic, permissionArray}));
  };
  return (
  <div>
      <MainMenu uInfo={userInfo}></MainMenu>
      <form onSubmit={submitHandler}>
      <div class="container rounded pt-4" id="contaier-profile">
        <div class="row pt">
          <div class="col-2"></div> 
          <div class="col-2 bg-white border border-secundary border-right" >
          <h4 class="text-right" id="pictureText">Profile info</h4>  
            <div className="profilepic" id="picture">
              <label for="file-input">
                <img class="profilepic__image" src={pic} width="150" height="150" alt="Profibild" />
              <div class="profilepic__content">
              <span class="profilepic__icon"><AiFillCamera id="iconita"></AiFillCamera></span>
              <span class="profilepic__text">Change Profile Picture</span>
              </div>
              </label>
              <input id="file-input" onClick={(e) =>  setPic(e.target.files[0])} onChange={(e) => {postDetails(e.target.files[0])}} type="file" />
              
          </div>
          <span class="badge bg-secondary" id="centrat">Employee</span>
          <h5 class="text-right" id="pictureText2">Vaccination info</h5> 
          {userInfo.isVaccinated ? <span id="bg" class="badge bg-success">Vaccinated</span> : <span id="bg" class="badge bg-warning">Not vaccinated</span> }
          </div>
         <div class="col-4  bg-white border border-secundary border-right" >
            <div class="p-3 py-5 border-right">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Profile settings</h4>                
                </div>
                {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <div className="form-group">
                  <label htmlFor="name" className="form-label mt-2">Name</label><br></br>
                  <input  type="text" id ="formFile1" class="form-control mt-2"placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>

                <div className="form-group">
                  <label htmlFor="" className="form-label mt-2">Email Address</label><br></br>
                  <input type="email" id ="formFile1" class="form-control mt-2" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>

                <div className="form-group">
                  <label htmlFor="" className="form-label mt-2">Password</label><br></br>
                  <input type="password" placeholder="Enter Password" id ="formFile1" class="form-control mt-2" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                
                <div className="form-group">
                  <label htmlFor="" className="form-label mt-2">Confirm Password</label><br></br>
                  <input type="password" placeholder="Confirm Password" id ="formFile1" class="form-control mt-2" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </div>

              
              <div className="form-group">
                <label htmlFor="" className="form-label mt-3">Add Vaccination Certificate</label><br></br>
                <input id ="formFile1" class="form-control mt-2" onChange={(e) => postDetailsVaccination(e.target.files[0])}  type="file"></input>
                
              </div>
 
                <div class="mt-5 text-center">
                  <button type="submit" class="btn btn-success" onClick={() => submitHandler}>Update profile</button>
                </div>
            </div>
        </div>
        <div class="col-4  bg-white border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center experience">
                  <h4 class="text-right mb-4">Manage booking permissions</h4> 
                </div> <br></br>
                <div class="col-md-12">
                  <p className="ml-2">Create permission</p>
                  <span className="custom-dropdown small">
                    <select id="permission" value={userNameAdd} onChange={(e) => {setAddPermission(e.target.value)}}>
                      {fetchedData?.map((c,i) => {
                        if(c._id != userInfo._id)
                        return(
                          <option key={i}>{c.name}</option>
                        )})}
                    </select>
                  </span>
                  <button type="submit" class="btn btn-primary ml-4" onClick={() => setPermissionType("add")}>Add permission</button>
                </div> <br></br>
                
                <div class="col-md-12">
                <p className="ml-2">Modify permission</p>
                <span className="custom-dropdown small">
                  <select id="permission" value={userNameDelete} onChange={(e) => {setDeletePermission(e.target.value)}}>
                    {userInfo.permission?.map((p,i) => {
                      return(
                        <option key={i}>{p}</option>
                      )})}
                  </select>
                </span>
                <button type="submit" className="btn btn-outline-warning ml-4 btn-sm" onClick={() => setPermissionType("delete")}>Delete permission</button>
                </div>
               
            </div>
          </div>
        </div>
    </div>
    </form>
  </div>
  
)}

export default ProfileScreen;


