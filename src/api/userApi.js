import Api from './Api';

const url = "/username";

const url2 = "/email";
const urlcreate = "/user/register"
const urlResentEmail = "/user/userRegistrationConfirmRequest?"
const urlresetPassRequest = "/resetPasswordRequest"
const urlresendresetPass = "/resendResetPassword?"
const urlresetPass = "/resetPassword"
const existsByEmail = (email) => {
    return Api.get(`${url2}/${email}`);
};

const ResentEmailToActive = (email) => {
    const param = {
        email: email
    }
    return Api.get(`${urlResentEmail}`, {params:param});
};

const existsByusername = (username) => {
    return Api.get(`${url}/${username}`);
};
const create = (username,email,password) =>{
    const body ={
        userName: username,
        email:email,
        password:password
    }
    return Api.post(urlcreate,body);
}

const resetPasswordRequest = (email) =>{
    const body ={
        email:email,
    }
    return Api.post(urlresetPassRequest,body);
}

const resetPassword = (token,newPassword) =>{
    const body ={
        token:token,
        newPassword:newPassword
    }
    return Api.post(urlresetPass,body);
}
const resendresetPasswordRequest = (email) => {
    const param = {
        email: email
    }
    return Api.get(`${urlresendresetPass}`, {params:param});
};


// export
const api = {resetPassword,resendresetPasswordRequest,resetPasswordRequest,ResentEmailToActive,create, existsByEmail,existsByusername }
export default api;

