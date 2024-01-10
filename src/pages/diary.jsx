import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import axios from 'axios';
import { Button, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleFilled, ReloadOutlined } from '@ant-design/icons';
import EditTable from '../components/edittable';
import { NavLink } from 'react-router-dom';
import { Tag as AntTag } from 'antd'; // Importing Tag from Ant Design
import FormPost from '../components/FormAdd';
import '../css/diary.css';

const Diary = () => {
  const { confirm } = Modal;

  const api = 'http://localhost:8080/api/v1';
  const apieco = 'http://localhost:8080/api/v1/resultecofootprint';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemDetail, setItemDetail] = useState('');
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);


  // const [datatb, setDatatb] = useState([]);
  const [datatbEco, setDatatbEco] = useState([]);
  const openmodaldilit = (echxep) => {
    confirm({
      title: 'XÓA HOẠT ĐỘNG CỦA BẠN?',
      icon: <ExclamationCircleFilled />,
      content: 'Xác nhận xóa  ' + echxep?.footprintType,
      onOk() {
        dilit(echxep);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const dilit = (cc) => {
    if (cc?.id) {
      axios
        .delete(api + `/${cc.id}`)
        .then((res) => {
          apiCall();
        })
        .catch((err) => {
          console.log(err, 'sss');
        });
    }

    console.log(cc);
  };

  const openmodaledit = (echxep) => {
    setIsModalOpen(true);
    setItemDetail(echxep);
    console.log('avc', echxep);
  };

  const callBackUpdate = (rs) => {
    const { id, footprintType, logTime, logDescription } = rs;
    axios
      .put(api + `/${rs?.id}`, {
        id,
        footprintType,
        logTime,
        logDescription,
      })
      .then(setIsModalOpen(false))
      .then((res) => apiCall())
      .catch((err) => console.log('err', err));
  };

  const showAdd = () => {
    setIsModalOpenAdd(true);
  };

  const addTableApi = (item) => {
    console.log(item);
    //destructuring
    const { id, footprintType, logTime, logDescription } = item;
    // call api
    axios
      .post('http://localhost:8080/api/v1', {
        // tên kh trung nhau thì phải viết name: name
        footprintType,
        logTime,
        logDescription,
      })
      .then((response) => {
        setIsModalOpenAdd(false);
      })
      .then((response) => apiCall())
      .catch(function (error) {
        console.log(error);
      });
  };

  const columns = [
    {
      title: 'Loại dấu chân',
      dataIndex: 'footprintType',
      key: 'footprintType',
      width: 300,
      render: (text) => <a>{text}</a>,
    
    },
    {
      title: 'Thời gian',
      dataIndex: 'logTime',
      key: 'logTime',
      width: 200,
      sorter: (a, b) => new Date(a.logTime) - new Date(b.logTime),
    },
    {
      title: 'Mô tả',
      dataIndex: 'logDescription',
      key: 'logDescription',
      width: 800,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => openmodaledit(record)}>
            <ReloadOutlined />
          </a>
          <a onClick={() => openmodaldilit(record)}>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];
  const columnseco = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      width: 300,
      render: (text) => <a>{text}</a>,
    
    },
    {
      title: 'Thời gian',
      dataIndex: 'date',
      key: 'date',
      width: 200,
      sorter: (a, b) => new Date(a.logTime) - new Date(b.logTime),
    },
    {
      title: 'Kết quả dấu chân sinh thái',
      dataIndex: 'result',
      key: 'result',
      width: 800,
    },
    
  ];
  const data = [
    {
      key: '1',
      footprintType: 'John Brown',
      logTime: '2023-01-01',
      logDescription: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
  ];

  const [datatb, setDatatb] = useState([]);

  const apiCall = () => {
    axios
      .get(api)
      .then((response) => {
        console.log(response, 'res =====');
        setDatatb(response?.data);
      })
      .catch((err) => 'da co loi: ' + err);
  };
  const apiCallEco = () => {
    axios
      .get(apieco)
      .then((response) => {
        console.log(response, 'res =====');
        setDatatbEco(response?.data);
      })
      .catch((err) => 'da co loi: ' + err);
  };
  useEffect(() => {
    apiCall();
   
  }, []);
  useEffect(() => {
    apiCallEco();
  }, []); 

  return (
    <>
      <div className="container">
        <h2>Nhật ký hoạt động</h2>

        <div className="tag-add-new" onClick={() => showAdd()}>
          <Tag color={'blue'}>Thêm mới</Tag>
        </div>
        <Table
          columns={columns}
          setIsModalOpen={setIsModalOpen}
          dataSource={datatb.map((record, index) => ({ ...record, key: index }))}
          // scroll={{ y: 240 }}
        />
        <h2>Kết quả dấu chân sinh thái</h2>
       <Table
  columns={columnseco}
  dataSource={datatbEco.map((record, index) => ({ ...record, key: index }))}
  // scroll={{ y: 240 }}
/>
        <EditTable
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          itemDetail={itemDetail}
          callBackUpdate={callBackUpdate}
        />
        <FormPost isModalOpenAdd={isModalOpenAdd} setIsModalOpenAdd={setIsModalOpenAdd} callBackAdd={addTableApi} />
      </div>
    </>
  );
};

export default Diary;
