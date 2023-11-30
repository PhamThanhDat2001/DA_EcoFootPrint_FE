import Api from './Api';

const url = "/username";

const url2 = "/email";
const urlcreate = "/user/register"
const urlResentEmail = "/user/userRegistrationConfirmRequest?"
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
// export
const api = {ResentEmailToActive,create, existsByEmail,existsByusername }
export default api;

