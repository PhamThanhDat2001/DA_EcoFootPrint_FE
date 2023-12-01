import { Formik,FastField,ErrorMessage,Form  } from "formik";
import React,{useState} from "react";
import { Link, useParams } from "react-router-dom";
import * as Yup from 'yup';
import { Button } from "antd";
// import { toastr } from "react-redux-toastr";

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
  const ShowNotification = (title,message) =>{
    const options = {
      timeOut: 4000,
      showCloseButton:true,
      progressBar: true,
      position: "top-right"
    };
    // toastr.success(title,message,options)
  }
  const {token} = useParams();
  console.log(token)

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
      <h1 className="h2">Đổi mật khẩu</h1>

    </div>
    <Formik
    initialValues={
      {
   
        password: '',
        confirmPassword: ''
      }
    } validationSchema={Yup.object({
     
        
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
            await Api.resetPassword(token, values.password);
            // message
            // setOpenModal(true);
            // setEmail(values.email);
            // ShowNotification("cc","cc");
            // reset form
            resetForm({});
        } catch (error) {
            console.log(error);
        }
    }
    }
    // khong check tren sever nên cmt lại
    // validateOnBlur={false}
    // validateOnChange={false}
  >
    {({ isSubmitting }) => (
    <Form>
    
    <div className="m-sm-4">
   
      <div>
      <label htmlFor="">Nhập Mật khẩu Mới</label>
      <FastField
    name="password"
    type="password"
  
    placeholder="Hãy nhập Mật khẩu"
     
  >
    
  </FastField>
      </div>
  <ErrorMessage name="password" />
  <div>
  <label htmlFor="">Nhập lại Mật khẩu</label>
  <FastField
    name="confirmPassword"
    type="password"
    placeholder="Xác nhận mật khẩu"
     
  >
    
  </FastField>
  </div>
  <ErrorMessage name="confirmPassword" />

        <div className="text-center mt-3">
            <Button type="primary" htmlType="submit"  disabled={isSubmitting}>
              Reset password
            </Button>
        </div>
    
    </div>
  
</Form>
    )}
    </Formik>
    {/* <Modal
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
            </Modal> */}
  </React.Fragment>
)};

export default ResetPassword;
