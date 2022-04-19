import {
    BUILDINGS_LIST_FAIL,
    BUILDINGS_LIST_SUCCESS,
    BUILDINGS_LIST_REQUEST,
    BUILDING_DESKS_FAIL,
    BUILDING_DESKS_REQUEST,
    BUILDING_DESKS_SUCCESS
} from '../constants/buildingConstants'
import axios from "axios";

export const listBuildings= () => async (dispatch, getState) => {
    try {
      dispatch({
        type: BUILDINGS_LIST_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/buildings/`, config);
  
      dispatch({
        type: BUILDINGS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: BUILDINGS_LIST_FAIL,
        payload: message,
      });
    }
  };

  export const listBuildingDesks= (address) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BUILDING_DESKS_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/buildings/${address}`, config);
  
      dispatch({
        type: BUILDING_DESKS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: BUILDING_DESKS_FAIL,
        payload: message,
      });
    }
  };
  