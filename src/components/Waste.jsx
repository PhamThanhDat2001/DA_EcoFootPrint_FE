


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

const Waste = ({onWasteDataChange}) => {
    const [energyConsumption, setConsumption] = useState("");
    const [energyConsumptionAdd, setEnergyConsumption] = useState({
      date: null,
      wasteType: '',
      amount: '',
      unit: '',
      description: '',
    });
    const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState("");
  useEffect(() => {
   
    const fetchProfile = async (date) => {
      try {
     
        const result = await FootprintApi.getWasteByDate(date);
        setConsumption(result);
        onWasteDataChange(result);
      } catch (error) {
        console.error("Error in try block:", error);
        // Handle the error as needed
      }
    };
    fetchProfile(selectedDate);
  }, [selectedDate]);
  
  const [updateInfo, setUpdateInfo] = useState();
  const [isOpenModalUpdate, setOpenModalUpdate] = useState(false);
  
 // update
 const update = async (date) => {
  setOpenModalUpdate(true);

  const Info = await FootprintApi.getWasteByDate(date);
  setUpdateInfo(Info);

}
const add = async (date,wasteType,amount,unit,description) => {
  const isDuplicate = await FootprintApi.existsBydateWaste(date);

  if (isDuplicate) {
    console.log("Duplicated date! Cannot add duplicate entry.");
    return;
  }
  const Info = await FootprintApi.createWaste(date,wasteType,amount,unit,description);
  setUpdateInfo(Info);

}
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
    setEnergyConsumption({
      ...energyConsumptionAdd,
      date: dateString,
    });
  }}
  format="YYYY-MM-DD"
/>

    <Label>Loại chất thải </Label>
    <Input value={energyConsumption.wasteType}   onChange={(e) =>
    setEnergyConsumption({
      ...energyConsumptionAdd,
      wasteType: e.target.value,
    })
  } />
    <Label>Số lượng chất thải</Label>
    <Input value={energyConsumption.amount}  onChange={(e) =>
    setEnergyConsumption({
      ...energyConsumptionAdd,
      amount: e.target.value,
    })
  }/>
    <Label>Đơn vị đo lường</Label>
    <Input value={energyConsumption.unit}  onChange={(e) =>
    setEnergyConsumption({
      ...energyConsumptionAdd,
      unit: e.target.value,
    })
  }/>
    <Label>Mô tả</Label>
<    Input value={energyConsumption.description}  onChange={(e) =>
    setEnergyConsumption({
      ...energyConsumptionAdd,
      description: e.target.value,
    })
  }/>
    <Button type="primary" onClick={() => console.log('userInfo:', energyConsumption) || update(energyConsumption.date)}>Chỉnh sửa</Button>
    <Button type="primary" onClick={() => console.log('userInfo:', energyConsumptionAdd) || add(energyConsumptionAdd.date,energyConsumptionAdd.wasteType,energyConsumptionAdd.amount,energyConsumptionAdd.unit,energyConsumptionAdd.description) } > 
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
