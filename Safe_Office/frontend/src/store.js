import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  bookingCreateReducer,
  bookingDeleteReducer,
  bookingListReducer,
  bookingUpdateReducer,
} from "./reducers/bookingsReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

import {buildingListReducer, desksListReducers} from "./reducers/buildingReducers"


const reducer = combineReducers({
  bookingList: bookingListReducer,
  buildingList: buildingListReducer,
  desksList: desksListReducers,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  bookingCreate: bookingCreateReducer,
  bookingDelete: bookingDeleteReducer,
  bookingUpdate: bookingUpdateReducer,
  userUpdate: userUpdateReducer,

});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
