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

const WaterConsumption = () => {
    const [energyConsumption, setConsumption] = useState("");
    const [energyConsumptionAdd, setEnergyConsumption] = useState({
      date: null,
      usageType: '',
      consumption: '',
      unit: '',
      description: '',
    });
    const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState("");
  useEffect(() => {
   
    const fetchProfile = async (date) => {
      try {
     
        const result = await FootprintApi.getWaterConsumptionByDate(date);
        setConsumption(result);
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

  const Info = await FootprintApi.getWaterConsumptionByDate(date);
  setUpdateInfo(Info);

}
const add = async (date,usageType,consumption,unit,description) => {
  const Info = await FootprintApi.createWaterConsumption(date,usageType,consumption,unit,description);
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

    <Label>Loại tiêu thụ nước</Label>
    <Input value={energyConsumption.usageType}   onChange={(e) =>
    setEnergyConsumption({
      ...energyConsumptionAdd,
      usageType: e.target.value,
    })
  } />
    <Label>Số lượng nước tiêu thụ</Label>
    <Input value={energyConsumption.consumption}  onChange={(e) =>
    setEnergyConsumption({
      ...energyConsumptionAdd,
      consumption: e.target.value,
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
    <Button type="primary" onClick={() => console.log('userInfo:', energyConsumptionAdd) || add(energyConsumptionAdd.date,energyConsumptionAdd.usageType,energyConsumptionAdd.consumption,energyConsumptionAdd.unit,energyConsumptionAdd.description) } > 
  Lưu
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