import { Formik,FastField,ErrorMessage,Form  } from "formik";
import React,{useState} from "react";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { Button} from 'antd';
import '../css/resetpasswoRd.css'
import {
 
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import Api from "../api/userApi";
const ResetPassword = () => {
  const [isopenModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isDisableButtonResend, setDisableButtonResend] = useState(false); 
  const handleModalClose = () => {
    setOpenModal(false);
    // Thực hiện các xử lý khác khi modal đóng
  };
  const resenEmailToResetPassword = async() =>{
    setDisableButtonResend(true)
    await Api.resendresetPasswordRequest(email);
    setDisableButtonResend(false)
  }
  return(
    
  <>
   <div className="mainrspass">
   <div>
      <img src="https://ecofootprint.vn/images/config/logo-01_1473319995.png" alt="Description of the imassge" />
      <h1 className='slogan'>ECOFOOTPRINT - DẤU CHÂN SINH THÁI</h1>
    </div>
    <div>
    <div className="text-center mt-4">
      <h2 className="quenmatkhau">Quên Mật Khẩu</h2>
      <p className="lead">Nhập Email của bạn để lấy lại mật khẩu</p>
    </div>
    <Formik
    initialValues={
      {
   
        email: '',
        
      }
    } validationSchema={Yup.object({
     
        
      email: Yup.string()
        .email('Email không hợp lệ')
        .required('Hãy nhập Email')
        .test('checkUniqueEmail', 'Email này chưa được đăng ký', async email => {
          // call api
          const isExists = await Api.existsByEmail(email);
          return isExists;
      })
      
    })}
    onSubmit={
      
      async (values, { resetForm }) => {
        try {
            // call api
            await Api.resetPasswordRequest(values.email);
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
    <Form className='form-resetpassword'>
    
        <div className="m-sm-4">
       
          <FastField
        name="email"
        type="text"
      
        placeholder="Hãy nhập Email"
         
      >
        
      </FastField>
      <ErrorMessage name="email" />
    
            <div className="text-center mt-3">
                <Button type="primary" htmlType="submit"  disabled={isSubmitting}>
                  Gửi Email
                </Button>
            </div>
        
        </div>
      
    </Form>
    )}
    </Formik>
    <Modal className='modalresetpassword'
              isOpen={isopenModal}
              // isOpen={true}
            >
              <ModalHeader>
                Bạn cần xác nhận tài khoản
              </ModalHeader>
              <ModalBody className="text-center m-3">
              <p className="mb-0">
                Chúng tôi đã gửi email tới {email}
              Bạn hãy vào để lấy lại mật khẩu
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={resenEmailToResetPassword} disabled={isDisableButtonResend}>
                  Gửi lại
                </Button>
                <Button    color="primary" onClick={handleModalClose}
                >
                 Đã hiểu
                </Button>
              </ModalFooter>
            </Modal>
    </div>
   </div>
  </>
)};

export default ResetPassword;
