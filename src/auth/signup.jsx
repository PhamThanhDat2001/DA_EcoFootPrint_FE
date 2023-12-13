import React,{useState} from 'react';
import ReactDOM from "react-dom";
import { ErrorMessage, FastField, Formik, Form  } from 'formik';
import { Button, Checkbox, Input} from 'antd';
import * as Yup from 'yup';
import Api from '../api/userApi';
import '../css/signup.css'
import {
 
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "reactstrap";
import ModalSignup from '../modal/modalsignup';
import { Link } from 'react-router-dom';
const Signup = () => {
  const [isopenModal, setOpenModal] = useState(false);
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
        email: '',
        password: '',
        confirmPassword: ''
      }
    } validationSchema={Yup.object({
      username: Yup.string()
        .min(6, 'Tài khoản phải trên 6 kí tự và dưới 50 kí tự')
        .max(50, 'Tài khoản phải trên 6 kí tự và dưới 50 kí tự')
        .required('Hãy nhập Tài khoản')
        .test('checkUniqueUsername', 'Tài khoản này đã được đăng ký', async username => {
          // call api
          const isExists = await Api.existsByusername(username);
          console.log(isExists);
          return !isExists;
      }),
        
      email: Yup.string()
        .email('Email không hợp lệ')
        .required('Hãy nhập Email')
        .test('checkUniqueEmail', 'Email này đã được đăng ký', async email => {
          // call api
          const isExists = await Api.existsByEmail(email);
          console.log(isExists);
          return !isExists;
      })
      ,
      password: Yup.string()
        .min(6, 'Mật khẩu phải trên 6 kí tự và dưới 50 kí tự')
        .max(50, 'Mật khẩu phải trên 6 kí tự và dưới 50 kí tự')
        .required('Hãy nhập mật khẩu'),

      confirmPassword: Yup.string()
        .required('Hãy nhập xác nhận mật khẩu')
        // .when("password", {
        //   is: values => (values && values.length > 0 ? true : false),
        //   then: Yup.string().oneOf(
        //     [Yup.ref("password")],
        //     "Both password need to be the same"
        //   )
        // })
    })}
    
    onSubmit={
      async (values, { resetForm }) => {
      
        try {
            // call api
            await Api.create(values.username,values.email,values.password);
            // message
            setOpenModal(true);
            setEmail(values.email);
            
            // reset form
            resetForm({});
        } catch (error) {
            console.log(error);
        }
    }
    }
    validateOnBlur={false}
    validateOnChange={false}
  >
    {({ isSubmitting }) => (
    // <div>
    
      <Form className='form-signup'>
        <h3>Đăng Ký Tài Khoản</h3>
        <div>
          {/* <label htmlFor="">Tài khoản</label> */}
        <FastField
        label="sse"
        name="username"
        type="text"
       
        placeholder="Hãy nhập Tài khoản"
        rules={[
          {
            required: true,
            message: 'Hãy nhập Tài khoản!',
          },
        ]}   
        
      ></FastField>
        
        </div>
        <ErrorMessage  name="username"  />
        
        <div>
          {/* <label htmlFor="">Email</label> */}
        <FastField
        name="email"
        type="text"
      
        placeholder="Hãy nhập Email"
         
      ></FastField>
    
    
        </div>
        <ErrorMessage  name="email" />
       <div>
        {/* <label htmlFor="">Mật khẩu</label> */}
       <FastField
        label="Password"
        name="password"
        type="password"
     
        placeholder="Hãy nhập Mật khẩu"
         
      ></FastField>
    
    
       </div>
       <ErrorMessage name="password" />
        <div>
        {/* <label htmlFor="">Nhập lại Mật khẩu</label> */}
        <FastField
        name="confirmPassword"
        type="password"
    
        placeholder="Xác nhận Mật khẩu"
         
      ></FastField>
     
    
        </div>
          <ErrorMessage name="confirmPassword" />
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          Đăng Ký
        </Button>
        <div className="form-links">
        <Link to="/dang-nhap">Đăng Nhập</Link>
        <Link to="/ResetPassword">Quên Mật Khẩu</Link>
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
                Bạn cần xác nhận tài khoản
              </ModalHeader>
              <ModalBody className="text-center m-3">
                <p className="mb-0">
                Chúng tôi đã gửi email tới {email}.
                Bạn hãy vào để kích hoạt tài khoản
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={resenEmailToActive} disabled={isDisableButtonResend}>
                  Gửi lại
                </Button>
                <Button color="primary" onClick={handleModalClose}>
                 Đã hiểu
                </Button>
              </ModalFooter>
            </Modal>
  </>

)};
export default Signup;