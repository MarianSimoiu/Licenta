import {
  BOOKINGS_UPDATE_REQUEST,
  BOOKINGS_UPDATE_SUCCESS,
  BOOKINGS_UPDATE_FAIL,
  BOOKINGS_CREATE_FAIL,
  BOOKINGS_CREATE_REQUEST,
  BOOKINGS_CREATE_SUCCESS,
  BOOKINGS_DELETE_FAIL,
  BOOKINGS_DELETE_REQUEST,
  BOOKINGS_DELETE_SUCCESS,
  BOOKINGS_LIST_FAIL,
  BOOKINGS_LIST_REQUEST,
  BOOKINGS_LIST_SUCCESS,
} from "../constants/bookingsConstants";

export const bookingistReducer = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case BOOKINGS_LIST_REQUEST:
      return { loading: true };
    case BOOKINGS_LIST_SUCCESS:
      return { loading: false, bookings: action.payload };
    case BOOKINGS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const bookingCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKINGS_CREATE_REQUEST:
      return { loading: true };
    case BOOKINGS_CREATE_SUCCESS:
      return { loading: false, success: true };
    case BOOKINGS_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const bookingDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKINGS_DELETE_REQUEST:
      return { loading: true };
    case BOOKINGS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BOOKINGS_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const bookingUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKINGS_UPDATE_REQUEST:
      return { loading: true };
    case BOOKINGS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case BOOKINGS_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
