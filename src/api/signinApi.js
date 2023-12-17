import Api from './Api';



const urllogin = "/auth/login"




const Signin = (username,password) =>{
    const body ={
        username: username,
        password:password
    }
    return Api.post(urllogin,body);
}

// export
const Loginapi = {Signin }
export default Loginapi;

