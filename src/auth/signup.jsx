import React,{useState} from 'react';
import ReactDOM from "react-dom";
import { ErrorMessage, FastField, Formik, Form  } from 'formik';
import { Button, Checkbox, Input} from 'antd';
import * as Yup from 'yup';
import Api from '../api/userApi';
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
const Signup = () => {
  const [isopenModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isDisableButtonResend, setDisableButtonResend] = useState(false); 
  const resenEmailToActive = async() =>{
    setDisableButtonResend(true)
    await Api.ResentEmailToActive(email);
    setDisableButtonResend(false)
  }
  return(
  <>
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
    <Form>
        <div>
          <label htmlFor="">Tài khoản</label>
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
        <ErrorMessage  name="username"  />
        </div>
    
        
        <div>
          <label htmlFor="">Email</label>
        <FastField
        name="email"
        type="text"
      
        placeholder="Hãy nhập Email"
         
      ></FastField>
    
      <ErrorMessage name="email" />
        </div>
        
       <div>
        <label htmlFor="">Mật khẩu</label>
       <FastField
        label="Password"
        name="password"
        type="password"
     
        placeholder="Hãy nhập Mật khẩu"
         
      ></FastField>
    
      <ErrorMessage name="password" />
       </div>
        <div>
        <label htmlFor="">Nhập lại Mật khẩu</label>
        <FastField
        name="confirmPassword"
        type="password"
    
        placeholder="Xác nhận Mật khẩu"
         
      ></FastField>
     
      <ErrorMessage name="confirmPassword" />
        </div>
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          Submit
        </Button>
      
    </Form>
    )}
  </Formik>
  {/* <ModalSignup/> */}
  <Modal
              isOpen={isopenModal}
            >
              <ModalHeader>
                Bạn cần xác nhận tài khoản
              </ModalHeader>
              <ModalBody className="text-center m-3">
                <p className="mb-0">
                Chúng tôi đã gửi email tới <p>{email}</p>
               <p>Bạn hãy vào để kích hoạt tài khoản</p> 
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={resenEmailToActive} disabled={isDisableButtonResend}>
                  Gửi lại
                </Button>
                <Button    color="primary"
              
                 
                >
                 Đã hiểu
                </Button>
              </ModalFooter>
            </Modal>
  </>

)};
export default Signup;