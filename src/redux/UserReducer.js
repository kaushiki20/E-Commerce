import UserActionTypes from "./UserType";
const INITIAL_STATE = {
  curentUser: null,
  error: null,
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return { ...state, currentUser: action.payload, error: null };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
      return { ...state, error: null };
    default:
      return state;
  }
};
export default UserReducer;
