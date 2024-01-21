

import React, { useEffect, useState } from 'react';
import { Button, DatePicker,Input, Select } from 'antd';
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

const GreenEnergyUsage = ({onGreenEnergyUsageDataChange}) => {
    const [House, setHouse] = useState("");
    const [HouseAdd, setHouseAdd] = useState({
      date: null,
      energySource: '',
      usageAmount: '',
      unit: '',
      description: '',
    });
    const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState("");
  // useEffect(() => {
   
  //   const fetchProfile = async (date) => {
  //     try {
     
  //       const result = await FootprintApi.getGreenEnergyUsageByDate(date);
  //       setHouse(result);
  //       onGreenEnergyUsageDataChange(result);
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
        const result = await FootprintApi.getGreenEnergyUsageByDateAndUserId(date, user_id);
        setHouse(result);
        // Send the fetched data to the parent component
        onGreenEnergyUsageDataChange(result);
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

  const Info = await FootprintApi.getGreenEnergyUsageByDateAndUserId(date, user_id);
  setUpdateInfo(Info);

}
// const add = async (date,energySource,usageAmount,unit,description) => {
//   const isDuplicate = await FootprintApi.existsBydateGreen(date);

//   if (isDuplicate) {
//     console.log("Duplicated date! Cannot add duplicate entry.");
//     return;
//   }
//   const Info = await FootprintApi.createGreenEnergyUsage(date,energySource,usageAmount,unit,description);
//   setUpdateInfo(Info);

// }
const add = async (date,energySource,usageAmount,unit,description) => {
  const user_id = localStorage.getItem('id'); // Replace with the correct method to get the user_id
  console.log('res==',user_id)
  const isDuplicate = await FootprintApi.existsBydateanduseridGreenEnergy(date, user_id);

  if (isDuplicate) {
    console.log("Duplicated date! Cannot add duplicate entry.");
    return;
  }

  const Info = await FootprintApi.createGreenEnergyUsage(date,energySource,usageAmount,unit,description, user_id);
  setUpdateInfo(Info);
};

const validEnergySources = ['Nhà cấp 4', 'Nhà biệt thự', 'Nhà ống'];
const validUnits = ['m2', 'ha', 'km2'];
const handleSelectChange = (e) => {
  setHouseAdd({
    ...HouseAdd,
    energySource: e.target.value,
  });
};
const handleSelectChange2 = (e) => {
  setHouseAdd({
    ...HouseAdd,
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
    setHouseAdd({
      ...HouseAdd,
      date: dateString,
    });
  }}
  format="YYYY-MM-DD"
/>

    <Label>Loại nhà ở</Label>
    {/* <Input value={House.energySource}   onChange={(e) =>
    setHouseAdd({
      ...HouseAdd,
      energySource: e.target.value,
    })
  } /> */}
  <select
        value={House.energySource}
        onChange={handleSelectChange}
        style={{ width: '100%' ,height:'35px'}}
      >
        <option value="">Chọn loại nhà ở</option>
        {validEnergySources.map((source, index) => (
          <option key={index} value={source}>
            {source}
          </option>
        ))}
      </select>
    <Label>Diện tích</Label>
    <Input value={House.usageAmount}  onChange={(e) =>
    setHouseAdd({
      ...HouseAdd,
      usageAmount: e.target.value,
    })
  }/>
    <Label>Đơn vị đo lường</Label>
    {/* <Input value={House.unit}  onChange={(e) =>
    setHouseAdd({
      ...HouseAdd,
      unit: e.target.value,
    })
  }/> */}
   <select
        value={House.unit}
        onChange={handleSelectChange2}
        style={{ width: '100%',height:'35px' }}
      >
        <option value="">Chọn đơn vị</option>
        {validUnits.map((unit, index) => (
          <option key={index} value={unit}>
            {unit}
          </option>
        ))}
      </select>
    <Label>Mô tả</Label>
<    Input value={House.description}  onChange={(e) =>
    setHouseAdd({
      ...HouseAdd,
      description: e.target.value,
    })
  }/>
    <Button type="primary" onClick={() => console.log('userInfo:', House) || update(House.date,localStorage.getItem('id'))}>Chỉnh sửa</Button>
    <Button type="primary" onClick={() => console.log('userInfo:', HouseAdd) || add(HouseAdd.date,HouseAdd.energySource,HouseAdd.usageAmount,HouseAdd.unit,HouseAdd.description) } > 
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
              energySource:updateInfo && updateInfo.energySource !==undefined && updateInfo.energySource !== null? updateInfo.energySource : '2',
              usageAmount: updateInfo &&updateInfo.usageAmount !==undefined && updateInfo.usageAmount !== null? updateInfo.usageAmount : '3',
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
                energySource: Yup.string()
            
                .required('Required')
                ,
                usageAmount: Yup.string()
              
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
                await FootprintApi.updateGreenEnergyUsage(updateInfo.id, values.date, values.energySource,values.usageAmount, values.unit,values.description);
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
          <label htmlFor="">Loại thực phẩm: </label>
          </div>
        <FastField
        label="sse"
        name="energySource"
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
          <label htmlFor="">Số lượng tiêu thụ: </label>
          </div>
        <FastField
        label="sse"
        name="usageAmount"
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





export default GreenEnergyUsage;
