import { connect } from 'react-redux';
import { selectRole } from '../redux/selectors/todoSelector';
import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import axios from 'axios';
import FormPostInfoSecond from '../components/formAddInfoSecond';
import FormUpdateInfoMain from '../components/formUpdateInfoMain';
import FormUpdateInfoSecond from './formUpdateInfoSecond';

const InfoSecond = (props) => {
  const { confirm } = Modal;
  const { role } = props;
  const isAdmin = () => role === 'USER';

  const [dynamicContent, setDynamicContent] = useState([]);
  const [isModalOpenAddSecond, setIsModalOpenAddSecond] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);

  const apiCallInfoSecond = () => {
    axios
      .get('http://localhost:8080/api/v1/infomationsecond')
      .then((response) => {
        setDynamicContent(response.data);
        setShowAddButton(true);
      })
      .catch((err) => 'da co loi: ' + err);
  };

  const openModalDelete = (item) => {
    confirm({
      title: 'XÓA ThÔNG TIN PHỤ?',
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
        .delete('http://localhost:8080/api/v1/infomationsecond' + `/${item.id}`)
        .then((res) => {
          apiCallInfoSecond();
        })
        .catch((err) => {
          console.log(err, 'sss');
        });
    }
  };

  const showAddSecondForm = () => {
    setIsModalOpenAddSecond(true);
    setIsModalOpenUpdate(false);
  };

  const showUpdateSecondForm = (item) => {
    setSelectedItem(item);
    setIsModalOpenUpdate(true);
    setIsModalOpenAddSecond(false);
  };

  useEffect(() => {
    apiCallInfoSecond();
  }, []);

  return (
    <>
      <button style={{marginTop:'40px'}} onClick={() => showAddSecondForm()}>Thêm thông tin phụ</button>
      <h2>Thông tin phụ</h2>
      {isModalOpenAddSecond && (
          <FormPostInfoSecond
            isModalOpenAddSecond={isModalOpenAddSecond}
            setIsModalOpenAddSecond={setIsModalOpenAddSecond}
            handleAddClick={showAddSecondForm}
          />
        )}
        {isModalOpenUpdate && (
          <FormUpdateInfoSecond 
            isModalOpenUpdate={isModalOpenUpdate}
            setIsModalOpenUpdate={setIsModalOpenUpdate}
            handleUpdateClick={showUpdateSecondForm}
            selectedItem={selectedItem}
          />
        )}
      <div className="info2">
        
        

        {dynamicContent.map((item, index) => (
          <div   key={index} className="infosecond">
            <a target="_blank" href={item.link_url}>
              <img  className="anh1info2" src={item.image_url} alt="example" />
              <h4>{item.title}</h4>
              <h6>{item.description}</h6>
            </a>
            {isAdmin() && showAddButton && (
              <div>
                <button style={{ marginBottom: '20px' }} onClick={() => showUpdateSecondForm(item)}>
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

export default connect(mapGlobalStateToProps)(InfoSecond);
