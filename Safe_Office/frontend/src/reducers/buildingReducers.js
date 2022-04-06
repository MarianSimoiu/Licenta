import {
    BUILDINGS_LIST_FAIL,
    BUILDINGS_LIST_SUCCESS,
    BUILDINGS_LIST_REQUEST
} from '../constants/buildingConstants'



export const buildingListReducer = (state = { buildings: [] }, action) => {
    switch (action.type) {
      case BUILDINGS_LIST_REQUEST:
        return { loading: true };
      case BUILDINGS_LIST_SUCCESS:
        return { loading: false, cities: action.payload };
      case BUILDINGS_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };