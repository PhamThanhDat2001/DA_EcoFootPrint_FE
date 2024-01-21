

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

const WaterConsumption = ({ onWaterConsumptionDataChange}) => {
    const [WaterConsumption, setWaterConsumption] = useState("");
    const [WaterConsumptionAdd, setWaterConsumptionAdd] = useState({
      date: null,
      usageType: '',
      consumption: '',
      unit: '',
      description: '',
      // user_id:'',
    });
    const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState("");
  // useEffect(() => {
   
  //   const fetchProfile = async (date) => {
  //     try {
     
  //       const result = await FootprintApi.getWaterConsumptionByDate(date);
  //       setWaterConsumption(result);
  //       // Send the fetched data to the parent component
  //       onWaterConsumptionDataChange(result);
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
      const result = await FootprintApi.getWaterConsumptionByDateAndUserId(date, user_id);
      setWaterConsumption(result);
      // Send the fetched data to the parent component
      onWaterConsumptionDataChange(result);
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

  const Info = await FootprintApi.getWaterConsumptionByDateAndUserId(date, user_id);
  setUpdateInfo(Info);

}
// const add = async (date,usageType,consumption,unit,description) => {
//   const isDuplicate = await FootprintApi.existsBydateWater(date);

//   if (isDuplicate) {
//     console.log("Duplicated date! Cannot add duplicate entry.");
//     return;
//   }

//   const Info = await FootprintApi.createWaterConsumption(date,usageType,consumption,unit,description);
//   setUpdateInfo(Info);
  
// }

const add = async (date, usageType, consumption, unit, description) => {
  const user_id = localStorage.getItem('id'); // Replace with the correct method to get the user_id
  console.log('res==',user_id)
  const isDuplicate = await FootprintApi.existsBydateanduseridWater(date);

  if (isDuplicate) {
    console.log("Duplicated date! Cannot add duplicate entry.");
    return;
  }

  const Info = await FootprintApi.createWaterConsumption(date, usageType, consumption, unit, description, user_id);
  setUpdateInfo(Info);
};






// const handleInput = (e) => {
//   const { name, value } = e.target;
//   setWaterConsumptionAdd((prevValues) => ({
//     ...prevValues,
//     [name]: value,
//   }));
//   onInputChange(name, value);
// };


const validUsageTypes = ['nước sinh hoạt', 'nước sản xuất'];
const validUnits = ['Lít (l)', 'Mét khối (m3)'];
const handleSelectChange = (e) => {
  setWaterConsumptionAdd({
    ...WaterConsumptionAdd,
    usageType: e.target.value,
  });
};
const handleSelectChange2 = (e) => {
  setWaterConsumptionAdd({
    ...WaterConsumptionAdd,
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
    setWaterConsumptionAdd({
      ...WaterConsumptionAdd,
      date: dateString,
    });
    
  }}
  format="YYYY-MM-DD"
/>

    <Label>Loại nước thụ tiêu thụ</Label>
    <Select
  value={WaterConsumption.usageType}
  onChange={handleSelectChange}
  style={{ width: '100%' }}
>
  <option value="">Chọn loại sử dụng</option>
  {validUsageTypes.map((usageType, index) => (
    <option key={index} value={usageType}>
      {usageType}
    </option>
  ))}
</Select>

{/* <Label>Loại nước thụ tiêu thụ</Label>
<Select
  value={WaterConsumption.usageType}
  onChange={handleSelectChange}
  style={{ width: '100%' }}
>
  <Option value="">Chọn loại sử dụng</Option>
  {validUsageTypes.map((usageType, index) => (
    <Option key={index} value={usageType}>
      {usageType}
    </Option>
  ))}
</Select> */}
    <Label>Số lượng nước tiêu thụ</Label>
    <Input
        value={WaterConsumption.consumption}
        onChange={(e) => {
          setWaterConsumptionAdd({
            ...WaterConsumptionAdd,
            consumption: e.target.value,
          });

          // Send the updated consumption value to the parent component
    
        }}
      />
    <Label>Đơn vị đo lường</Label>
    {/* <Input value={WaterConsumption.unit}  onChange={(e) =>
    setWaterConsumptionAdd({
      ...WaterConsumptionAdd,
      unit: e.target.value,
    })
  }/> */}
  <Select
        value={WaterConsumption.unit}
        onChange={handleSelectChange2}
        style={{ width: '100%' }}
      >
        <option value="">Chọn đơn vị</option>
        {validUnits.map((unit, index) => (
          <option key={index} value={unit}>
            {unit}
          </option>
        ))}
      </Select>
    <Label>Mô tả</Label>
<    Input value={WaterConsumption.description}  onChange={(e) =>
    setWaterConsumptionAdd({
      ...WaterConsumptionAdd,
      description: e.target.value,
    })
  }/>
    <Button type="primary" onClick={() => console.log('userInfo:', WaterConsumption) || update(WaterConsumption.date,localStorage.getItem('id'))}>Chỉnh sửa</Button>
    <Button type="primary" onClick={() => console.log('userInfo:', WaterConsumptionAdd) || add(WaterConsumptionAdd.date,WaterConsumptionAdd.usageType,WaterConsumptionAdd.consumption,WaterConsumptionAdd.unit,WaterConsumptionAdd.description) } > 
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
              usageType:updateInfo && updateInfo.usageType !==undefined && updateInfo.usageType !== null? updateInfo.usageType : '2',
              consumption: updateInfo &&updateInfo.consumption !==undefined && updateInfo.consumption !== null? updateInfo.consumption : '3',
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
                usageType: Yup.string()
            
                .required('Required')
                ,
                consumption: Yup.string()
              
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
                await FootprintApi.updateWaterConsumption(updateInfo.id, values.date, values.usageType,values.consumption, values.unit,values.description);
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
          <label htmlFor="">Loại tiêu thụ nước: </label>
          </div>
        <FastField
        label="sse"
        name="usageType"
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
          <label htmlFor="">Số lượng nước tiêu thụ: </label>
          </div>
        <FastField
        label="sse"
        name="consumption"
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


export default WaterConsumption;
