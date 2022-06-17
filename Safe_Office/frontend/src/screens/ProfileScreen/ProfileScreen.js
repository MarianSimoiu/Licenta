import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import MainMenu from "../../components/MainMenu";
import "./ProfileScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;
  const bar = "_"
  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [history, userInfo]);

  const postDetailsVaccination = (pics) => {
    setPicMessage(null);
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "safeoffice");
      data.append("cloud_name","dnmtxnbkb");
      data.append("public_id", `${userInfo.name + "_" + userInfo.email}`);
      data.append("folder", "vaccination_certificate")
      fetch("https://api.cloudinary.com/v1_1/dnmtxnbkb/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  
  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(pic);
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

    dispatch(updateProfile({ name, email, password, pic }));
  };

  return (
     
      <div>
        <MainMenu uInfo={userInfo}></MainMenu>
        <h1 className="title">Edit your profile</h1>
          <div className="content-profile">
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
           
                <label htmlFor="" className="form-label mt-2">Name</label>
                <Form.Control  type="text" placeholder="Enter Name"value={name} onChange={(e) => setName(e.target.value)}></Form.Control>

                <label htmlFor="" className="form-label mt-2">Email Address</label>
                <Form.Control type="email"placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
             
                <label htmlFor="" className="form-label mt-2">Password</label>
                <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                <label htmlFor="" className="form-label mt-2">Confirm Password</label>
                <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>

              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
  
                <label htmlFor="" className="form-label mt-2">Change Profile Picture</label>
                <input class="form-control mt-2"   onChange={(e) => postDetails(e.target.files[0])} id="formFile" type="file" label="Upload Profile Picture"></input>
                <label htmlFor="" className="form-label mt-2">Add Vaccination Certificate</label>
                <input class="form-control mt-2"   onChange={(e) => postDetailsVaccination(e.target.files[0])} id="formFile" type="file" label="Upload Profile Picture"></input>
                <button type="submit" class="btn btn-success mt-2">Update</button>
            </Form>
          </div>

          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <div>
              <img src={pic} alt={name} className="profilePic" />
            </div>
          </Col>
      </div>
     
  );
};

export default ProfileScreen;
