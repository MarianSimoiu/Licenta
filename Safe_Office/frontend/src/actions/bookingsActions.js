import {
  BOOKINGS_CREATE_FAIL,
  BOOKINGS_CREATE_REQUEST,
  BOOKINGS_CREATE_SUCCESS,
  BOOKINGS_DELETE_FAIL,
  BOOKINGS_DELETE_REQUEST,
  BOOKINGS_DELETE_SUCCESS,
  BOOKINGS_LIST_FAIL,
  BOOKINGS_LIST_REQUEST,
  BOOKINGS_LIST_SUCCESS,
  BOOKINGS_UPDATE_FAIL,
  BOOKINGS_UPDATE_REQUEST,
  BOOKINGS_UPDATE_SUCCESS,
} from "../constants/bookingsConstants";
import axios from "axios";

export const listBookings = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKINGS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/bookings`, config);

    dispatch({
      type: BOOKINGS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BOOKINGS_LIST_FAIL,
      payload: message,
    });
  }
};

export const listUserBookings = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKINGS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/bookings/`, { params: { user: userInfo._id}}, config)
    console.log(userInfo._id)
    dispatch({
      type: BOOKINGS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BOOKINGS_LIST_FAIL,
      payload: message,
    });
  }
};

export const createBookingAction = (building, address, floor, date, codSpace, userName) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: BOOKINGS_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/bookings/create`,
      {building, address, floor, date, codSpace, userName},
      config
    );

    dispatch({
      type:  BOOKINGS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BOOKINGS_CREATE_FAIL,
      payload: message,
    });
  }
};

export const deleteBookingAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKINGS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/bookings/${id}`, config);

    dispatch({
      type: BOOKINGS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BOOKINGS_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateBookingAction = (id, city, address, floor, date ) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: BOOKINGS_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/bookings/${id}`,
      { city, address, floor, date },
      config
    );

    dispatch({
      type: BOOKINGS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BOOKINGS_UPDATE_FAIL,
      payload: message,
    });
  }
};
