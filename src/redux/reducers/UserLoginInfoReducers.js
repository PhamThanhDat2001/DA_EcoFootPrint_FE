import storage from "../../storage/storage.js";
import * as types from "../constants";

const initialState = {
  token: storage.getToken(),
  userInfo: storage.getUserInfo()
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.USER_LOGIN_INFO:
      return {
        ...state,
        userInfo: actions.payload
      };
    case types.TOKEN_INFO:
      return {
        ...state,
        token: actions.payload
      };

    default:
      return state;
  }
}