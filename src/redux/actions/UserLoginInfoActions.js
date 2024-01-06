import * as types from "../constants";

// export function setUserLoginInfo(username,email,fullname,gender,address,birthday,phone,status) {
//   return {
//     type: types.USER_LOGIN_INFO,
//     payload: { 
//       "username":username,
//       "email":email,
//       "fullname":fullname,
//       "gender":gender,
//       "address":address,
//       "birthday":birthday,
//       "phone":phone,
//       "status":status,  
//     }
//   };
// }
export function setUserLoginInfo(id,username,email,fullname,gender,address,birthday,phone,status,role,avatarUrl) {
  return {
    type: types.USER_LOGIN_INFO,
    payload: { 
      "id":id,
      "username":username,
      "email":email,
      "fullname":fullname,
      "gender":gender,
      "address":address,
      "birthday":birthday,
      "phone":phone,
      "status":status,  
      "role":role,  
      "avatarUrl":avatarUrl,  
    }
  };
}
export function setTokenInfo(token) {
  return {
    type: types.TOKEN_INFO,
    payload: token
  };
}



