import {
    BUILDINGS_LIST_FAIL,
    BUILDINGS_LIST_SUCCESS,
    BUILDINGS_LIST_REQUEST,
    BUILDING_DESKS_FAIL,
    BUILDING_DESKS_SUCCESS,
    BUILDING_DESKS_REQUEST
} from '../constants/buildingConstants'



export const buildingListReducer = (state = { buildings: [] }, action) => {
    switch (action.type) {
      case BUILDINGS_LIST_REQUEST:
        return { loading: true };
      case BUILDINGS_LIST_SUCCESS:
        return { loading: false, buildings: action.payload };
      case BUILDINGS_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

export const desksListReducers = (state = { desks: [] }, action) => {
  switch (action.type) {
    case BUILDING_DESKS_REQUEST:
      return { loading: true };
    case BUILDING_DESKS_SUCCESS:
      return { loading: false, buildings: action.payload };
    case BUILDING_DESKS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};