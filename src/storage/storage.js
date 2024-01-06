const setToken = (token) => {
    localStorage.setItem('token', token);
};


const getToken = () => {
    return localStorage.getItem('token');
};

const setId = (id) => {
    localStorage.setItem('id', id);
};


const getId = () => {
    return localStorage.getItem('id');
};

const setUserInfo = (id,username,email,fullname,gender,address,birthday,phone,status,role,avatarUrl) => {
    localStorage.setItem('id', id);
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('fullname', fullname);
    localStorage.setItem('gender', gender);
    localStorage.setItem('address', address);
    localStorage.setItem('birthday', birthday);
    localStorage.setItem('phone', phone);
    localStorage.setItem('status', status);
    localStorage.setItem('role', role);
    localStorage.setItem('avatarUrl', avatarUrl);
};



const getUserInfo = () => {
    return {
        "id" : localStorage.getItem("id"),
        "username" : localStorage.getItem("username"),
        "email" : localStorage.getItem("email"),
        "fullname" : localStorage.getItem("fullname"),
        "gender" : localStorage.getItem("gender"),
        "address" : localStorage.getItem("address"),
        "birthday" : localStorage.getItem("birthday"),
        "phone" : localStorage.getItem("phone"),
        "status" : localStorage.getItem("status"),
        "role" : localStorage.getItem("role"),
        "avatarUrl" : localStorage.getItem("avatarUrl"),
    };
}
// const setUserInfo = (id,username,email,fullname,gender,address,birthday,phone,status) => {
//     localStorage.setItem('id', id);
//     localStorage.setItem('username', username);
//     localStorage.setItem('email', email);
//     localStorage.setItem('fullname', fullname);
//     localStorage.setItem('gender', gender);
//     localStorage.setItem('address', address);
//     localStorage.setItem('birthday', birthday);
//     localStorage.setItem('phone', phone);
//     localStorage.setItem('status', status);
// };



// const getUserInfo = () => {
//     return {
//         "id" : localStorage.getItem("id"),
//         "username" : localStorage.getItem("username"),
//         "email" : localStorage.getItem("email"),
//         "fullname" : localStorage.getItem("fullname"),
//         "gender" : localStorage.getItem("gender"),
//         "address" : localStorage.getItem("address"),
//         "birthday" : localStorage.getItem("birthday"),
//         "phone" : localStorage.getItem("phone"),
//         "status" : localStorage.getItem("status"),
//     };
// }

const Storage = {getId,setId, setToken, getToken, getUserInfo, setUserInfo };
export default Storage;
