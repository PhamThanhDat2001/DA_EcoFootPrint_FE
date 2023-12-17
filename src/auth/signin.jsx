import React,{useState} from 'react';
import ReactDOM from "react-dom";
import { ErrorMessage, FastField, Formik, Form  } from 'formik';
import { Button, Checkbox, Input,Alert} from 'antd';
import * as Yup from 'yup';
import Api from '../api/userApi';
import Loginapi from '../api/signinApi';
import '../css/signup.css';
import {setUserLoginInfo,setTokenInfo} from '../redux/actions/UserLoginInfoActions.js'
import { connect } from 'react-redux';
// import {WithRouter} from 'react-router-dom'
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import ModalSignup from '../modal/modalsignup';
import { Link } from 'react-router-dom';
import Storage from '../storage/storage.js';
import Aler from './test.jsx';
const Signin = (props) => {
  const [isopenModal, setOpenModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [email, setEmail] = useState("");
  const [isDisableButtonResend, setDisableButtonResend] = useState(false); 
  const handleModalClose = () => {
    setOpenModal(false);
    // Thực hiện các xử lý khác khi modal đóng
  };
  const resenEmailToActive = async() =>{
    setDisableButtonResend(true)
    await Api.ResentEmailToActive(email);
    setDisableButtonResend(false)
  }
  const styles = `
  .error-message {
    color: red;
  }`;
  return(
  <>
 <div id='ptc'>
 <div>
      <img src="https://ecofootprint.vn/images/config/logo-01_1473319995.png" alt="Description of the imassge" />
      <h1 className='slogan'>ECOFOOTPRINT - DẤU CHÂN SINH THÁI</h1>
    </div>
    
  <Formik
    initialValues={
      {
        username: '',
      
        password: '',
      
      }
    } validationSchema={Yup.object({
      username: Yup.string()
        .min(6, 'Tài khoản phải trên 6 kí tự và dưới 50 kí tự')
        .max(50, 'Tài khoản phải trên 6 kí tự và dưới 50 kí tự')
        .required('Hãy nhập Tài khoản')
        .test('checkUniqueUsername', 'Tài khoản này chưa được đăng ký', async username => {
          // call api
          const isExists = await Api.existsByusername(username);
          // console.log(isExists);
          return isExists;
      })
    ,
        
    
      
      password: Yup.string()
        .min(6, 'Mật khẩu phải trên 6 kí tự và dưới 50 kí tự')
        .max(50, 'Mật khẩu phải trên 6 kí tự và dưới 50 kí tự')
        .required('Hãy nhập mật khẩu'),

      
    })}
    
    onSubmit={
      async (values) => {
      
        try {
            const result =await Loginapi.Signin(values.username,values.password);
            if(result.status === 'NOT_ACTIVE' ){
              // console.log(result);
              setEmail(result.email)
              setOpenModal(true)
              console.log('1')
            }else{
              setShowAlert(false);
              Storage.setToken(result.token)
              Storage.setUserInfo(
                result.username,
                result.email,
                result.fullname,
                result.gender,
                result.address,
                result.birthday,
                result.phone,
                result.status);

                props.setTokenInfo(result.token);
                props.setUserLoginInfo(
                  result.username,
                  result.email,
                  result.fullname,
                  result.gender,
                  result.address,
                  result.birthday,
                  result.phone,
                  result.status)
            }


            ;
        } catch (error) {
          console.log(error);
          if (error.response && error.response.status === 401) {
            console.log('avc');
            setShowAlert(true);
           
          } else {
            // Handle other errors
            console.error('Error:', error);
          }
        }
    }
    }
    validateOnBlur={false}
    validateOnChange={false}
  >
    {({ isSubmitting }) => (
    // <div>
    
      <Form className='form-signup'>
        <h3>Đăng nhập</h3>
        <div>
          {/* <label htmlFor="">Tài khoản</label> */}
        <FastField
        label="sse"
        name="username"
        type="text"
       
        placeholder="Hãy nhập tài khoản"
        rules={[
          {
            required: true,
            message: 'Hãy nhập tài khoản!',
          },
        ]}   
        
      ></FastField>
        
        </div>
        <ErrorMessage  name="username"  />
        
        <div>
          {/* <label htmlFor="">Email</label> */}
      
    
    
        </div>
        <ErrorMessage  name="email" />
       <div>
        {/* <label htmlFor="">Mật khẩu</label> */}
       <FastField
        label="Password"
        name="password"
        type="password"
     
        placeholder="Hãy nhập mật khẩu"
         
      ></FastField>
     {showAlert && (
  <Alert
  // message="Sai tài khoản hoặc mật khẩu"
  description="Sai tài khoản hoặc mật khẩu"
  type="error"
  showIcon
  style={{ fontSize: '12px', padding: '8px', borderRadius: '4px' }} 
/>
)}
    
       </div>
       <ErrorMessage name="password" />
        <div>
        {/* <label htmlFor="">Nhập lại Mật khẩu</label> */}
     
    
        </div>
          <ErrorMessage name="confirmPassword" />
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          Đăng nhập
        </Button>
        <div className="form-links">
        <Link to="/signup">Đăng ký</Link>
        <Link to="/ResetPassword">Quên mật khẩu</Link>
      </div>
    </Form>
    
    // </div>
    )}
  </Formik>
  
 </div>

  {/* <ModalSignup/> */}
  <Modal className="modalsignup"
              isOpen={isopenModal}
             
            >
              <ModalHeader>
                Bạn cần kích hoạt tài khoản của mình
              </ModalHeader>
              <ModalBody className="text-center m-3">
                <p className="mb-0">
                Tài khoản của bạn chưa được kích hoạt. <br />
                Bạn hãy kiểm tra email {email} để kích hoạt tài khoản của bạn
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={resenEmailToActive} disabled={isDisableButtonResend}>
                  Gửi lại
                </Button>
                {/* <Button color="primary" onClick={() => setOpenModal(false)}> */}
                <Button color="primary" onClick={handleModalClose}>

                 Đã hiểu
                </Button>
              </ModalFooter>
            </Modal>
  </>

)};
// export default Signin;
export default connect(null, { setUserLoginInfo, setTokenInfo})(Signin);