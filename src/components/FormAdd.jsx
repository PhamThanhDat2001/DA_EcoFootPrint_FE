import React, { useEffect, useState } from 'react';
import { Modal } from 'antd'
import { DatePicker } from 'antd';
const FormPost = ({isModalOpenAdd,setIsModalOpenAdd,callBackAdd}) =>{

  
    const [footprintType, setfootprintType] = useState('');
    const [logTime, setlogTime] = useState('');
    const [logDescription, setlogDescription] = useState('');
    const handleDateChange = (date) => {
      // The 'date' parameter will be a Moment object, so you may need to format it or convert it to a string as needed.
      setlogTime(date);
    };
    
    const handleOk = () => {
        const result = {
           
          footprintType,
          logTime,
          logDescription
           }
           console.log(result)
           callBackAdd(result);
        // setIsModalOpenAdd(false);
      };
      const handleCancel = () => {
        setIsModalOpenAdd(false);
      };
    return(
        <>
        
        <Modal title="Thêm hoạt động" open={isModalOpenAdd} onOk={handleOk} onCancel={handleCancel}>
        <label htmlFor="">Loại dấu chân</label>
       <input type="text"  name='footprintType'  onChange={(e) => setfootprintType(e.target.value)}/>
       {/* <br />
       <label htmlFor="">Thời gian</label>
       <input type="text"  name='logTime' onChange={(e) => setlogTime(e.target.value)} />
       <br /> */}
       <br />
      <label htmlFor="logTime">Thời gian</label>
      <DatePicker
        name="logTime"
        onChange={handleDateChange}
        value={logTime}
        style={{ width: '100%' }} // Adjust the width as needed
      />
      <br />
       <label htmlFor="">Mô tả</label>
       <input type="text"  name='logDescription' onChange={(e) => setlogDescription(e.target.value)} />
       
        </Modal>
      </>
    )
}
export default FormPost