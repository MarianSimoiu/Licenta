
/*
<div className="content">   
            <form onSubmit={submitHandler} className="form-profile">
            <div className="row">
              <div className="col-sm-4">
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <div className="form-group">
                  <label htmlFor="name" className="form-label mt-2">Name</label>
                  <input  type="text" className="input-general" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>

                <div className="form-group">
                  <label htmlFor="" className="form-label mt-2">Email Address</label>
                  <input type="email" className="input-general" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>

                <div className="form-group">
                  <label htmlFor="" className="form-label mt-2">Password</label>
                  <input type="password" placeholder="Enter Password" className="input-general" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                
                <div className="form-group">
                  <label htmlFor="" className="form-label mt-2">Confirm Password</label>
                  <input type="password" placeholder="Confirm Password" className="input-general" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </div>

              
              <div className="form-group">
                <label htmlFor="" className="form-label mt-2">Add Vaccination Certificate</label>
                <input class="input-general mt-2"   onChange={(e) => postDetailsVaccination(e.target.files[0])} id="formFile" type="file" label="Upload Profile Picture"></input>
              </div>
 
              </div>
              <div className="col-sm-4">
                {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                )}
                <img src={userInfo.pic} alt={name} className="profilePic" />
                <div className="form-group" id="changePicture">
                  <label htmlFor="" className="form-label mt-2">Change Profile Picture</label>
                  <input class="input-general mt-2"   onChange={(e) => postDetails(e.target.files[0])} id="formFile" type="file" label="Upload Profile Picture"></input>
                </div>
                <button type="submit" class="btn btn-success mt-2">Update Profile</button>   

              </div>
              <div className="col-mt-2">
                  <p className="ml-2">Create permission</p>
                  <span className="custom-dropdown small">
                    <select value={userNameAdd} onChange={(e) => {setAddPermission(e.target.value)}}>
                      {fetchedData?.map((c,i) => {
                        if(c._id != userInfo._id)
                        return(
                          <option key={i}>{c.name}</option>
                        )})}
                    </select>
                  </span>
                  <button type="submit" class="btn btn-success ml-4" onClick={() => setPermissionType("add")}>Add permission</button>
                <p className="ml-2">Modify permission</p>
                <span className="custom-dropdown small">
                  <select value={userNameDelete} onChange={(e) => {setDeletePermission(e.target.value)}}>
                    {userInfo.permission?.map((p,i) => {
                      return(
                        <option key={i}>{p}</option>
                      )})}
                  </select>
                </span>
                <button type="submit" className="btn btn-danger ml-4" onClick={() => setPermissionType("delete")}>Delete permission</button>
              </div>
            </div>
          </form>
        </div>

        */