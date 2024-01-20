
import React, { useEffect, useState } from 'react';
import { Button, DatePicker,Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Modal, ModalBody, ModalFooter, ModalHeader, Label } from "reactstrap";
import { FastField, Formik ,Form} from 'formik';
import * as Yup from 'yup';
import Api from "../api/userApi";
import { toastr } from 'react-redux-toastr';
import {  useNavigate } from 'react-router-dom';
import FootprintApi from '../api/footprint.js';
import moment from 'moment';

const Transportation = ({onTransportationDataChange}) => {
    const [transportation, setConsumption] = useState("");
    const [transportationAdd, setTransportation] = useState({
      date: null,
      transportMode: '',
      distance: '',
      unit: '',
      description: '',
    
    });
    const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState("");
  // useEffect(() => {
   
  //   const fetchProfile = async (date) => {
  //     try {
     
  //       const result = await FootprintApi.getTransportationByDate(date);
  //       setConsumption(result);
  //       onTransportationDataChange(result);
  //     } catch (error) {
  //       console.error("Error in try block:", error);
  //       // Handle the error as needed
  //     }
  //   };
  //   fetchProfile(selectedDate);
  // }, [selectedDate]);
  useEffect(() => {
    const fetchProfile = async (date, user_id) => {
      try {
        const result = await FootprintApi.getTransportationByDateAndUserId(date, user_id);
        setConsumption(result);
        // Send the fetched data to the parent component
        onTransportationDataChange(result);
      } catch (error) {
        console.error("Error in try block:", error);
        // Handle the error as needed
      }
    };
  
    // Assuming user_id is available in your component, replace 'user_id_value' with the actual user_id.
    const user_id = localStorage.getItem('id') || 'user_id_value';
  
    fetchProfile(selectedDate, user_id);
  }, [selectedDate]);
  const [updateInfo, setUpdateInfo] = useState();
  const [isOpenModalUpdate, setOpenModalUpdate] = useState(false);
  
 // update
 const update = async (date, user_id) => {
  setOpenModalUpdate(true);

  const Info = await FootprintApi.getTransportationByDateAndUserId(date, user_id);
  setUpdateInfo(Info);

}
// const add = async (date,transportMode,distance,unit,description) => {
//   const isDuplicate = await FootprintApi.existsBydateTransportation(date);

//   if (isDuplicate) {
//     console.log("Duplicated date! Cannot add duplicate entry.");
//     return;
//   }
//   const Info = await FootprintApi.createTransportation(date,transportMode,distance,unit,description);
//   setUpdateInfo(Info);

// }


const add = async (date,transportMode,distance,unit,description) => {
  const user_id = localStorage.getItem('id'); // Replace with the correct method to get the user_id
  console.log('res==',user_id)
  const isDuplicate = await FootprintApi.existsBydateanduseridTransport(date);

  if (isDuplicate) {
    console.log("Duplicated date! Cannot add duplicate entry.");
    return;
  }

  const Info = await FootprintApi.createTransportation(date,transportMode,distance,unit,description, user_id);
  setUpdateInfo(Info);
};
const validTransportModes = ['Xe máy', 'Ô tô'];
const validUnits = ['Kilometre (km)', 'Metre (m)'];
const handleSelectChange = (e) => {
  setTransportation({
    ...transportationAdd,
    transportMode: e.target.value,
  });
};
const handleSelectChange2 = (e) => {
  setTransportation({
    ...transportationAdd,
    unit: e.target.value,
  });
};
  return(
    
  <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>

    
<Label>Ngày</Label>
      {/* <DatePicker
        value={selectedDate ? moment(selectedDate) : null}
        onChange={(date, dateString) => setSelectedDate(dateString)}
        format="YYYY-MM-DD" // Specify the desired date format
      /> */}
     <DatePicker
  value={selectedDate ? moment(selectedDate) : null}
  onChange={(date, dateString) => {
    console.log('Selected Date:', dateString);
    setSelectedDate(dateString);
    setTransportation({
      ...transportationAdd,
      date: dateString,
    });
  }}
  format="YYYY-MM-DD"
/>

    <Label>Loại phương tiện </Label>
    {/* <Input value={transportation.transportMode}   onChange={(e) =>
    setTransportation({
      ...transportationAdd,
      transportMode: e.target.value,
    })
  } /> */}
  <select
        value={transportation.transportMode}
        onChange={handleSelectChange}
      >
        <option value="">Chọn phương tiện vận chuyển</option>
        {validTransportModes.map((mode, index) => (
          <option key={index} value={mode}>
            {mode}
          </option>
        ))}
      </select>
    <Label>Khoảng cách đã đi</Label>
    <Input value={transportation.distance}  onChange={(e) =>
    setTransportation({
      ...transportationAdd,
      distance: e.target.value,
    })
  }/>
    <Label>Đơn vị đo lường</Label>
    {/* <Input value={transportation.unit}  onChange={(e) =>
    setTransportation({
      ...transportationAdd,
      unit: e.target.value,
    })
  }/> */}
  <select
        value={transportation.unit}
        onChange={handleSelectChange2}
      >
        <option value="">Chọn đơn vị</option>
        {validUnits.map((unit, index) => (
          <option key={index} value={unit}>
            {unit}
          </option>
        ))}
      </select>
    <Label>Mô tả</Label>
<    Input value={transportation.description}  onChange={(e) =>
    setTransportation({
      ...transportationAdd,
      description: e.target.value,
    })
  }/>
    <Button type="primary" onClick={() => console.log('userInfo:', transportation) || update(transportation.date,localStorage.getItem('id'))}>Chỉnh sửa</Button>
    <Button type="primary" onClick={() => console.log('userInfo:', transportationAdd) || add(transportationAdd.date,transportationAdd.transportMode,transportationAdd.distance,transportationAdd.unit,transportationAdd.description) } > 
  Thêm
</Button>
  {/* </div> */}



<Modal  
        isOpen={isOpenModalUpdate} centered style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}
      >
        <Formik 
        enableReinitialize
          initialValues={
            {
              date:updateInfo && updateInfo.date !==undefined && updateInfo.date !== null ? updateInfo.date : '1',
              transportMode:updateInfo && updateInfo.transportMode !==undefined && updateInfo.transportMode !== null? updateInfo.transportMode : '2',
              distance: updateInfo &&updateInfo.distance !==undefined && updateInfo.distance !== null? updateInfo.distance : '3',
              unit:updateInfo && updateInfo.unit !==undefined && updateInfo.unit !== null? updateInfo.unit : '4',  
              description: updateInfo &&updateInfo.description !==undefined && updateInfo.description !== null ? updateInfo.description : '6',
            }
          }
          validationSchema={
            Yup.object({
              date: Yup.string()
                .required('Required')
                .max(50, 'Tối đa 50 ký tự')
               
                ,
                transportMode: Yup.string()
            
                .required('Required')
                ,
                distance: Yup.string()
              
                .required('Required')
                ,
                unit: Yup.string()
              
                .required('Required'),

                description: Yup.string()
              
                .required('Required'),
            })
          }

    
          onSubmit={
            async (values ) => {
              // console.log('Submit values:', values);
              try {
                // call api
                await FootprintApi.updateTransportation(updateInfo.id, values.date, values.transportMode,values.distance, values.unit,values.description);
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
                Cập nhật dấu chân
              </h3>

         <div style={{ marginBottom: '10px' }}>
          <div>
          <label htmlFor="">Ngày </label>
          </div>
        <FastField
        label="sse"
        name="date"
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
        <div style={{ marginBottom: '10px' }}>
        <div>
          <label htmlFor="">Loại phương tiện: </label>
          </div>
        <FastField
        label="sse"
        name="transportMode"
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
        <div style={{ marginBottom: '10px' }}>
        <div>
          <label htmlFor="">Khoảng cách đã đi: </label>
          </div>
        <FastField
        label="sse"
        name="distance"
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
        <div style={{ marginBottom: '10px' }}>
        <div>
          <label htmlFor="">Đơn vị đo lường: </label>
          </div>
        <FastField
        label="sse"
        name="unit"
        type="text"
       
        placeholder="Hãy nhập tài khoản"
        rules={[
          {
            required: true,
            message: 'Hãy nhập tài khoản!',
          },
        ]}   
        
      ></FastField>
        
        </div><div style={{ marginBottom: '10px' }}>
        <div >
          <label htmlFor="">Mô tả: </label>
          </div>
        <FastField
        label="sse"
        name="description"
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


export default Transportation;
