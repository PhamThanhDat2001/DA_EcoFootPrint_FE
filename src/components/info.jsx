import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Modal, ModalBody, ModalFooter, ModalHeader, Label } from "reactstrap";
import { FastField, Formik ,Form} from 'formik';
import * as Yup from 'yup';
import Api from "../api/userApi";
import { toastr } from 'react-redux-toastr';
import {  useNavigate } from 'react-router-dom';


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

// const onFinish = (values) => {
//   console.log(values);
// };
const Info = () => {
    const [userInfo, setUserInfo] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const result = await Api.getProfile();
          setUserInfo(result);
        } catch (error) {
          // Handle the error as needed
        }
      };
      fetchProfile();
    }, []);
  const [updateInfo, setUpdateInfo] = useState();
  const [isOpenModalUpdate, setOpenModalUpdate] = useState(false);
  
 // update
 const update = async (id) => {
  const Info = await Api.getById(id);
  setUpdateInfo(Info);
  setOpenModalUpdate(true);

}

const showSuccessNotification = (title, message) => {
  const options = {
    timeOut: 2500,
    showCloseButton: false,
    progressBar: false,
    position: "top-right"
  };

  // show notification
  toastr.success(title, message, options);
}

  return(
    
  <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
    {/* <div
    // {...layout}
    // name="nest-messages"
    // onFinish={onFinish}
    // style={{
    //   maxWidth: 600,
    // }}
    // validateMessages={validateMessages}
  > */
  }
     <Col md="4">
            <div className="text-center">
              <img
                alt="Chris Wood"
                src='https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg'
                className="rounded-circle img-responsive mt-2"
                width="128"
                height="128"
              />
              <div className="mt-2">
                <Button color="primary">
                  <FontAwesomeIcon icon={faUpload} /> Upload
                </Button>
              </div>
              <small>
                For best results, use an image at least 128px by 128px in .jpg
                format 
              </small>
            </div>
          </Col>
         
    <Label>Tên đăng nhập</Label>
    <Input value={userInfo.username }  />
    <Label>Email</Label>
    <Input value={userInfo.email }  />
    <Label>Địa chỉ</Label>
    <Input value={userInfo.address } />
    <Label>Ngày Sinh</Label>
    <Input value={userInfo.birthday } />
    <Label>Số điện thoại</Label>
    <Input value={userInfo.phone } />
    <Label>Họ và tên</Label>
    <Input value={userInfo.fullname } />
    <Label>Giới tính</Label>
    <Input value={userInfo.gender } />
    <Label>Tình trạng</Label>
    <Input value={userInfo.status }  />
    <Label>Quyền</Label>
    <Input value={userInfo.role }  />
    <Button type="primary" onClick={() => navigate('/')}>Về trang chủ</Button>
    <Button type="primary" onClick={() => console.log('userInfo:', userInfo) || update(userInfo.id)}>
  Chỉnh sửa
</Button>
  {/* </div> */}



<Modal  
        isOpen={isOpenModalUpdate} centered style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}
      >
        <Formik 
        enableReinitialize
          initialValues={
            {
              fullname:updateInfo && updateInfo.fullname !==undefined && updateInfo.fullname !== null ? updateInfo.fullname : "Chưa cập nhật",
              gender:updateInfo && updateInfo.gender !==undefined && updateInfo.gender !== null? updateInfo.gender : "Chưa cập nhật",
              address: updateInfo &&updateInfo.address !==undefined && updateInfo.address !== null? updateInfo.address : "Chưa cập nhật",
              birthday:updateInfo && updateInfo.birthday !==undefined && updateInfo.birthday !== null? updateInfo.birthday : "Chưa cập nhật",  
              phone: updateInfo &&updateInfo.phone !==undefined && updateInfo.phone !== null ? updateInfo.phone : "Chưa cập nhật",
              avatarUrl:updateInfo && updateInfo.avatarUrl !==undefined && updateInfo.avatarUrl !== null? updateInfo.avatarUrl : "Chưa cập nhật"
            }
          }
          validationSchema={
            Yup.object({
              fullname: Yup.string()
                .required('Required')
                .max(50, 'Tối đa 50 ký tự')
                .min(6, 'Phải ít nhất 6 ký tự')
                ,
                gender: Yup.string()
            
                .required('Required')
                ,
                address: Yup.string()
              
                .required('Required')
                ,
                birthday: Yup.string()
              
                .required('Required'),
  //               phone: Yup.number()
  // .min(0, "Must be a positive integer")
  // .integer("Must be a positive integer")
  // .required('Required'),
                avatarUrl: Yup.string()
              
                .required('Required'),
            })
          }

    
          onSubmit={
            async (values ) => {
              // console.log('Submit values:', values);
              try {
                // call api
                await Api.update(updateInfo.id, values.fullname, values.gender,values.address, values.birthday,values.phone);
                setOpenModalUpdate(false);
                
                // show notification
                // showSuccessNotification(
                //   "Update Group",
                //   "Update Group Successfully!");
                // reload group page
                // resetForm({});
                window.location.reload();
              } catch (error) {
                console.log(error);
                // setOpenModalUpdate(false);
              }
            }
          }
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isSubmitting }) => (
            <Form>
          
              <h3>
                Cập nhật thông tin
              </h3>

         <div style={{ marginBottom: '10px' }}>
          <div>
          <label htmlFor="">Họ và tên: </label>
          </div>
        <FastField
        label="sse"
        name="fullname"
        type="text"
       
        placeholder="Hãy nhập họ và tên"
        rules={[
          {
            required: true,
            message: 'Hãy nhập họ và tên!',
          },
        ]}   
        
      ></FastField>
        
        </div>
        <div style={{ marginBottom: '10px' }}>
        <div>
          <label htmlFor="">Giới tính: </label>
          </div>
        <FastField
        label="sse"
        name="gender"
        type="text"
       
        placeholder="Hãy nhập giới tính"
        rules={[
          {
            required: true,
            message: 'Hãy nhập giới tính!',
          },
        ]}   
        
      ></FastField>
        
        </div>
        <div style={{ marginBottom: '10px' }}>
        <div>
          <label htmlFor="">Địa chỉ: </label>
          </div>
        <FastField
        label="sse"
        name="address"
        type="text"
       
        placeholder="Hãy nhập địa chỉ"
        rules={[
          {
            required: true,
            message: 'Hãy nhập địa chỉ!',
          },
        ]}   
        
      ></FastField>
        
        </div>
        <div style={{ marginBottom: '10px' }}>
        <div>
          <label htmlFor="">Ngày sinh: </label>
          </div>
        <FastField
        label="sse"
        name="birthday"
        type="text"
       
        placeholder="Hãy nhập ngày sinh"
        rules={[
          {
            required: true,
            message: 'Hãy nhập ngày sinh!',
          },
        ]}   
        
      ></FastField>
        
        </div><div style={{ marginBottom: '10px' }}>
        <div >
          <label htmlFor="">Số điện thoại: </label>
          </div>
        <FastField
        label="sse"
        name="phone"
        type="text"
       
        placeholder="Hãy nhập số điện thoại"
        rules={[
          {
            required: true,
            message: 'Hãy nhập số điện thoại!',
          },
        ]}   
        
      ></FastField>
        
        </div>
    
      
             

       
              <ModalFooter>
                <Button
                  color="primary"
                  style={{ marginLeft: 10 }}
                  disabled={isSubmitting}
                  type="submit"
                  htmlType="submit"
                  // onClick={() => updateProfile()}
                >
                  Save
                </Button>

              
                <Button
                  color="primary"
                  onClick={() => setOpenModalUpdate(false)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>
  </div>
  
)};
export default Info;