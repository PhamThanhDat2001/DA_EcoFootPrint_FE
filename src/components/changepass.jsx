import React,{useState} from 'react';
import ReactDOM from "react-dom";
import { ErrorMessage, FastField, Formik, Form  } from 'formik';
import { Button, Checkbox, Input,Alert} from 'antd';
import * as Yup from 'yup';
import Api from '../api/userApi';

import '../css/signup.css';

import { connect } from 'react-redux';
// import {Redirect} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { redirect } from "react-router-dom";

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import ModalSignup from '../modal/modalsignup';
import { Link } from 'react-router-dom';
import Storage from '../storage/storage.js';
import { selectUsername} from '../redux/selectors/todoSelector.js';
// import Aler from './test.jsx';
const Changepass = (props) => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [isopenModal, setOpenModal] = useState(false);
  return(
  <>
 <div id='ptc'>


  <Formik
    initialValues={
      {
        oldPassword: '',
      
        newPassword: '',
      
      }
    } validationSchema={Yup.object({
      
    
      
        oldPassword: Yup.string()
        .min(6, 'Mật khẩu phải trên 6 kí tự và dưới 50 kí tự')
        .max(50, 'Mật khẩu phải trên 6 kí tự và dưới 50 kí tự')
        .required('Hãy nhập mật khẩu'),

        newPassword: Yup.string()
        .min(6, 'Mật khẩu phải trên 6 kí tự và dưới 50 kí tự')
        .max(50, 'Mật khẩu phải trên 6 kí tự và dưới 50 kí tự')
        .required('Hãy nhập mật khẩu'),
    })}
    
    onSubmit={
        async (values ) => {
          console.log('Submit values:', values);
          try {
            // call api 
            await Api.changepass(props.username, values.oldPassword,values.newPassword);
            // setOpenModalUpdate(false);
            setOpenModal(true);
            // show notification
            // showSuccessNotification(
            //   "Update Group",
            //   "Update Group Successfully!");
            // reload group page
            // resetForm({});
            // window.location.reload();
            console.log("ok")
          } catch (error) {
            console.log(error);
            // setOpenModalUpdate(false);
          }
        }
      }
    validateOnBlur={false}
    validateOnChange={false}
  >
    {({ isSubmitting }) => (
    // <div>
    
      <Form className='form-signup'>
        <h3>Đổi mật khẩu</h3>
        <div>
          {/* <label htmlFor="">Tài khoản</label> */}
        <FastField
        label="sse"
        name="oldPassword"
        type="password"
       
        placeholder="Hãy nhập mật khẩu hiện tại"
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
        name="newPassword"
        type="password"
     
        placeholder="Hãy nhập mật khẩu mới"
         
      ></FastField>
     {showAlert && (
  <Alert
  // message="Sai tài khoản hoặc mật khẩu"
  description="Bạn đã đổi mật khẩu thành công"
  type="success"
  showIcon
  style={{ fontSize: '12px', padding: '8px', borderRadius: '4px' }} 
/>
)}
    {/* Button to navigate to the sign-in page */}
    {showAlert && (
        <Button type="primary" onClick={() => {navigate('/signin')}}>
          Về trang đăng nhập
        </Button>
      )}
       </div>
       <ErrorMessage name="password" />
        <div>
        {/* <label htmlFor="">Nhập lại Mật khẩu</label> */}
     
      
        </div>
        
        <Button  type="primary" htmlType="submit" disabled={isSubmitting}  >
          Đổi mật khẩu
        </Button> 
        <div className="form-links">
        <Link to="/">Trang chủ</Link>
        
      </div>
    </Form>
    
    // </div>
    )}
  </Formik>
 
 </div>
<div>
<Modal className='modalrsnewpass' style={{  marginTop: '35px'}}
isOpen={isopenModal}
// isOpen={true} 
> 
<ModalHeader>
  Thông Báo
</ModalHeader>
<ModalBody className="text-center m-3">
<p className="mb-0">
  Chúc mùng bạn đã đổi mật khẩu thành công. Vui lòng đăng nhập lại
  </p>
</ModalBody>
<ModalFooter>
  <Link className="linh" color="secondary"  to="/signin" >
   Về trang đăng nhập
  </Link>
 
</ModalFooter>
</Modal>
</div>
  </>

)};

const mapGlobalStateToProps = state => {
  return {
    app: state.app,
    username: selectUsername(state)
  };
};


// export default Changepass;
// export default connect(null, { setUserLoginInfo, setTokenInfo})(Signin);
export default connect(mapGlobalStateToProps)(Changepass);