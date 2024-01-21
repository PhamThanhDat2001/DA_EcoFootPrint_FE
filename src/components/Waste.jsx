


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

const Waste = ({onWasteDataChange}) => {
    const [Waste, setWaste] = useState("");
    const [WasteAdd, setWasteAdd] = useState({
      date: null,
      wasteType: '',
      amount: '',
      unit: '',
      description: '',
    });
    const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState("");
  // useEffect(() => {
   
  //   const fetchProfile = async (date) => {
  //     try {
     
  //       const result = await FootprintApi.getWasteByDate(date);
  //       console.log('res==', result)
  //       setWaste(result);
  //       onWasteDataChange(result);
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
        const result = await FootprintApi.getWasteByDateAndUserId(date, user_id);
        setWaste(result);
        // Send the fetched data to the parent component
        onWasteDataChange(result);
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

  const Info = await FootprintApi.getWasteByDateAndUserId(date, user_id);
  setUpdateInfo(Info);

}
// const add = async (date,wasteType,amount,unit,description) => {
//   const isDuplicate = await FootprintApi.existsBydateWaste(date);

//   if (isDuplicate) {
//     console.log("Duplicated date! Cannot add duplicate entry.");
//     return;
//   }
//   const Info = await FootprintApi.createWaste(date,wasteType,amount,unit,description);
//   setUpdateInfo(Info);

// }

const add = async (date,wasteType,amount,unit,description) => {
  const user_id = localStorage.getItem('id'); // Replace with the correct method to get the user_id
  console.log('res==',user_id)
  const isDuplicate = await FootprintApi.existsBydateanduseridWaste(date, user_id);

  if (isDuplicate) {
    console.log("Duplicated date! Cannot add duplicate entry.");
    return;
  }

  const Info = await FootprintApi.createWaste(date,wasteType,amount,unit,description, user_id);
  setUpdateInfo(Info);
};
const validWasteTypes = ['Rác thải sinh hoạt', 'Rác thải công nghiệp', 'Rác thải xây dựng'];
const validUnits = ['Kilogram (kg)', 'Gram (g)', 'Tấn'];
const handleSelectChange = (e) => {
  setWasteAdd({
    ...WasteAdd,
    wasteType: e.target.value,
  });
};
const handleSelectChange2 = (e) => {
  setWasteAdd({
    ...WasteAdd,
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
    setWasteAdd({
      ...WasteAdd,
      date: dateString,
    });
  }}
  format="YYYY-MM-DD"
/>

    <Label>Loại chất thải </Label>
    {/* <Input value={Waste.wasteType}   onChange={(e) =>
    setWasteAdd({
      ...WasteAdd,
      wasteType: e.target.value,
    })
  } /> */}
  <select
        value={Waste.wasteType}
        onChange={handleSelectChange}
        style={{ width: '100%',height:'35px' }}
      >
        <option value="">Chọn loại chất thải</option>
        {validWasteTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
    <Label>Số lượng chất thải</Label>
    <Input value={Waste.amount}  onChange={(e) =>
    setWasteAdd({
      ...WasteAdd,
      amount: e.target.value,
    })
  }/>
    <Label>Đơn vị đo lường</Label>
    {/* <Input value={Waste.unit}  onChange={(e) =>
    setWasteAdd({
      ...WasteAdd,
      unit: e.target.value,
    })
  }/> */}
    <select
        value={Waste.unit}
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
<    Input value={Waste.description}  onChange={(e) =>
    setWasteAdd({
      ...WasteAdd,
      description: e.target.value,
    })
  }/>
    <Button type="primary" onClick={() => console.log('userInfo:', Waste) || update(Waste.date,localStorage.getItem('id'))}>Chỉnh sửa</Button>
    <Button type="primary" onClick={() => console.log('userInfo:', WasteAdd) || add(WasteAdd.date,WasteAdd.wasteType,WasteAdd.amount,WasteAdd.unit,WasteAdd.description) } > 
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
              wasteType:updateInfo && updateInfo.wasteType !==undefined && updateInfo.wasteType !== null? updateInfo.wasteType : '2',
              amount: updateInfo &&updateInfo.amount !==undefined && updateInfo.amount !== null? updateInfo.amount : '3',
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
                wasteType: Yup.string()
            
                .required('Required')
                ,
                amount: Yup.string()
              
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
                await FootprintApi.updateWaste(updateInfo.id, values.date, values.wasteType,values.amount, values.unit,values.description);
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
          <label htmlFor="">Loại chất thải: </label>
          </div>
        <FastField
        label="sse"
        name="wasteType"
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
          <label htmlFor="">Số lượng chất thải: </label>
          </div>
        <FastField
        label="sse"
        name="amount"
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




export default Waste;
