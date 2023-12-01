import { Formik,FastField,ErrorMessage,Form  } from "formik";
import React,{useState} from "react";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { Button} from 'antd';
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
  const resenEmailToResetPassword = async() =>{
    setDisableButtonResend(true)
    await Api.resendresetPasswordRequest(email);
    setDisableButtonResend(false)
  }
  return(
  <React.Fragment>
    <div className="text-center mt-4">
      <h1 className="h2">Reset password</h1>
      <p className="lead">Enter your email to reset your password.</p>
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
    <Form>
    
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
                  Reset password
                </Button>
            </div>
        
        </div>
      
    </Form>
    )}
    </Formik>
    <Modal
              isOpen={isopenModal}
            >
              <ModalHeader>
                Bạn cần xác nhận tài khoản
              </ModalHeader>
              <ModalBody className="text-center m-3">
              <p className="mb-0">
                Chúng tôi đã gửi email tới {email}
              Bạn hãy vào để kích hoạt tài khoản
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={resenEmailToResetPassword} disabled={isDisableButtonResend}>
                  Gửi lại
                </Button>
                <Button    color="primary"
                >
                 Đã hiểu
                </Button>
              </ModalFooter>
            </Modal>
  </React.Fragment>
)};

export default ResetPassword;
