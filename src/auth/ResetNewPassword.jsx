import { Formik,FastField,ErrorMessage,Form  } from "formik";
import React,{useState} from "react";
import { Link, useParams } from "react-router-dom";
import * as Yup from 'yup';
import { Button } from "antd";
// import { toastr } from "react-redux-toastr";
import '../css/ResetNewPassword.css'
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
   <div className="mainrsnewpass">
   <div>
      <img src="https://ecofootprint.vn/images/config/logo-01_1473319995.png" alt="Description of the imassge" />
      <h1 className='slogan'>ECOFOOTPRINT - DẤU CHÂN SINH THÁI</h1>
    </div>
    <div>
    <div className="text-center mt-4">
      <h2 className="h2">Đổi mật khẩu</h2>
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
            setOpenModal(true);
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
    <Form className="formrsnewpassword">
    
    <div className="m-sm-4">
   
      <div>
      
      <FastField
    name="password"
    type="password"
    placeholder="Hãy nhập mật khẩu mới"
  >
    
  </FastField><ErrorMessage name="password" />
      </div>
  
  <div>

  <FastField
    name="confirmPassword"
    type="password"
    placeholder="Xác nhận mật khẩu"
     
  >
    
  </FastField> <ErrorMessage className="errm" name="confirmPassword" />
  </div>
 

        <div className="text-center mt-3">
            <Button type="primary" htmlType="submit"  disabled={isSubmitting}>
              Reset password
            </Button>
        </div>
    
    </div>
  
</Form>
    )}
    </Formik>
    <Modal className='modalrsnewpass'
              isOpen={isopenModal}
              // isOpen={true}
            > 
              <ModalHeader>
                Thông Báo
              </ModalHeader>
              <ModalBody className="text-center m-3">
              <p className="mb-0">
                Chúc mùng bạn đã đổi mật khẩu thành công. Vui lòng đăng nhập 
                </p>
              </ModalBody>
              <ModalFooter>
                <Link className="linh" color="secondary"  to="/dang-nhap" disabled={isDisableButtonResend}>
                 Đăng nhập
                </Link>
                <Button    color="primary"
                >
                 Đã hiểu
                </Button>
              </ModalFooter>
            </Modal>
    </div>
   </div>
  </React.Fragment>
)};

export default ResetPassword;
