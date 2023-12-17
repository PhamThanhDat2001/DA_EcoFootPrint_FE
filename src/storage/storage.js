const setToken = (token) => {
    localStorage.setItem('token', token);
};


const getToken = () => {
    return localStorage.getItem('token');
};

const setUserInfo = (username,email,fullname,gender,address,birthday,phone,status) => {
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('fullname', fullname);
    localStorage.setItem('gender', gender);
    localStorage.setItem('address', address);
    localStorage.setItem('birthday', birthday);
    localStorage.setItem('phone', phone);
    localStorage.setItem('status', status);
};

const getUserInfo = () => {
    return{
        'username':localStorage.getItem('username'),
        'email':localStorage.getItem('email'),
        'fullname':localStorage.getItem('fullname'),
        'gender':localStorage.getItem('gender'),
        'address':localStorage.getItem('address'),
        'birthday':localStorage.getItem('birthday'),
        'phone':localStorage.getItem('phone'),
        'status':localStorage.getItem('status'),
    }
    
};



// export
const Storage = {setToken,getToken,getUserInfo ,setUserInfo}
export default Storage;

