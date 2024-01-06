import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const userLoginInfoSelector = (state) => state.UserLoginInfo;

const selectUserInfoSelector = createSelector(
    userLoginInfoSelector,
    state => state.userInfo);

const selectTokenSelector = createSelector(
    userLoginInfoSelector,
    state => state.token);


const selectUserNameSelector = createSelector(
    userLoginInfoSelector,
    state => state.userInfo.username); 
    
    // const selectIdSelector = createSelector(
    //     userLoginInfoSelector,
    //     state => state.userInfo.id); 
        
/** function */
export const selectUserInfo = (state) => {
    return selectUserInfoSelector(state);
}

export const selectToken = (state) => {
    return selectTokenSelector(state);
}

export const selectUsername = (state) => {
    return selectUserNameSelector(state);
}
// export const selectId = (state) => {
//     return selectIdSelector(state);
// }
const selectRoleSelector = createSelector(
    userLoginInfoSelector,
    state => state.userInfo.role); 

export const selectRole = (state) => {
    return selectRoleSelector(state);
}
const selectIdSelector = createSelector(
    userLoginInfoSelector,
    state => state.userInfo.id); 

export const selectId = (state) => {
    return selectIdSelector(state);
}