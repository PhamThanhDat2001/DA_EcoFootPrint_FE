import React, { useEffect, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { Label } from 'reactstrap';
const EditTable =({isModalOpen,setIsModalOpen,itemDetail,callBackUpdate}) =>{
    const [footprintType, setfootprintType] = useState('');
    const [logTime, setlogTime] = useState('');
    const [logDescription, setlogDescription] = useState('');
    useEffect(()=>{
       if(itemDetail){
        setfootprintType(itemDetail?.footprintType),
        setlogTime(itemDetail?.logTime),
        setlogDescription(itemDetail?.logDescription)
       }
    },
    [itemDetail?.id])
    const handleOk = () => {
        const rs ={
            ...itemDetail,
            footprintType,
            logTime,
            logDescription
        }
        callBackUpdate(rs)
        console.log('rs', rs)
      setIsModalOpen(false);
    //   setCreatedAt(itemDetail?.createdAt),
    //     setName(itemDetail?.name),
    //     setAddress(itemDetail?.address)
    };
    const handleCancel = () => {
      setIsModalOpen(false);
      setfootprintType(itemDetail?.footprintType),
        setlogTime(itemDetail?.logTime),
        setlogDescription(itemDetail?.logDescription)
    };
   
    return (
        <>
      <Modal title="Cập nhật hoạt động" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Label>Loại dấu chân</Label>
      <Input value={footprintType} onChange={(e) => setfootprintType(e.target.value)}/>
      <Label>Thời gian</Label>
      <Input value={logTime} onChange={(e) => setlogTime(e.target.value)}/>
      <Label>Mô tả</Label>
      <Input value={logDescription} onChange={(e) => setlogDescription(e.target.value)}/>
   
      </Modal>
        </>
    )
}
export default EditTable;