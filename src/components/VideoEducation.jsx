import { connect } from 'react-redux';
import { selectRole } from '../redux/selectors/todoSelector';
import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import axios from 'axios';

import FormPostVideo from './formAddVideo';
import FormUpdateVideo from './formUpdateVideo';

const VideoEducation = (props) => {
  const { confirm } = Modal;
  const { role } = props;
  const isAdmin = () => role === 'USER';

  const [dynamicContent, setDynamicContent] = useState([]);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);

  const apiCallInfoMain = () => {
    axios
      .get('http://localhost:8080/api/v1/videoeducation')
      .then((response) => {
        setDynamicContent(response.data);
        setShowAddButton(true);
      })
      .catch((err) => 'da co loi: ' + err);
  };

  const openModalDelete = (item) => {
    confirm({
      title: 'XÓA VIDEO?',
      icon: <ExclamationCircleFilled />,
      content: 'Xác nhận xóa ',
      onOk() {
        handleDelete(item);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleDelete = (item) => {
    if (item?.id) {
      axios
        .delete('http://localhost:8080/api/v1/videoeducation' + `/${item.id}`)
        .then((res) => {
          apiCallInfoMain();
        })
        .catch((err) => {
          console.log(err, 'sss');
        });
    }
  };

  const showAddForm = () => {
    setIsModalOpenAdd(true);
    setIsModalOpenUpdate(false);
  };

  const showUpdateForm = (item) => {
    setSelectedItem(item);
    setIsModalOpenUpdate(true);
    setIsModalOpenAdd(false);
  };

  useEffect(() => {
    apiCallInfoMain();
  }, []);

  return (
    <>
    <button onClick={() => showAddForm()}>Thêm video</button>
      <div >
       
        {isModalOpenAdd && (
          <FormPostVideo
            isModalOpenAdd={isModalOpenAdd}
            setIsModalOpenAdd={setIsModalOpenAdd}
            handleAddClick={showAddForm}
          />
        )}
        {isModalOpenUpdate && (
          <FormUpdateVideo
            isModalOpenUpdate={isModalOpenUpdate}
            setIsModalOpenUpdate={setIsModalOpenUpdate}
            handleUpdateClick={showUpdateForm}
            selectedItem={selectedItem}
          />
        )}

        {dynamicContent.map((item, index) => (
          <div key={index} className="video-container" >
                <div className="video-wrapper">
                <iframe
          width="220"
          height="110"
          src={item.video_url}
          title="YouTube Video"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          allowFullScreen
        ></iframe>
                </div>
              {/* <img className="anh1info1" src={item.video_url} alt="example" /> */}
              <div className="text-introduction">
              <h4>{item.title}</h4>
              <h6>{item.description}</h6>
              </div>
             
            
            {isAdmin() && showAddButton && (
              <div className="button-container">
                <button  onClick={() => showUpdateForm(item)}>
                  Chỉnh sửa
                </button>
                <button style={{ marginLeft: '20px' }} onClick={() => openModalDelete(item)}>
                  Xóa
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

const mapGlobalStateToProps = (state) => {
  return {
    role: selectRole(state),
  };
};

export default connect(mapGlobalStateToProps)(VideoEducation);
