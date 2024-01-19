import { connect } from 'react-redux';
import { selectRole } from '../redux/selectors/todoSelector';
import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import axios from 'axios';
import FormPostInfoMain from '../components/formAddInfoMain';
import FormUpdateInfoMain from '../components/formUpdateInfoMain';
import FormPostStatistics from './formAddStatistics';
import FormUpdateStatistics from './formUpdateStatistics';

const Statistics = (props) => {
  const { confirm } = Modal;
  const { role } = props;
  const isAdmin = () => role === 'ADMIN';

  const [dynamicContent, setDynamicContent] = useState([]);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);

  const apiCallInfoMain = () => {
    axios
      .get('http://localhost:8080/api/v1/statistics')
      .then((response) => {
        setDynamicContent(response.data);
        setShowAddButton(true);
      })
      .catch((err) => 'da co loi: ' + err);
  };

  const openModalDelete = (item) => {
    confirm({
      title: 'XÓA THỐNG KÊ, KẾT QUẢ?',
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
        .delete('http://localhost:8080/api/v1/statistics' + `/${item.id}`)
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
    {isAdmin() && showAddButton && (
              <div>
    <button onClick={() => showAddForm()}>Thêm thông kế</button>

              </div>
            )}
    <h2>Số liệu thống kê & kết quả nghiên cứu</h2>

      <div className='solieuthongkeall'>
        {isModalOpenAdd && (
          <FormPostStatistics
            isModalOpenAdd={isModalOpenAdd}
            setIsModalOpenAdd={setIsModalOpenAdd}
            handleAddClick={showAddForm}
          />
        )}
        {isModalOpenUpdate && (
          <FormUpdateStatistics
            isModalOpenUpdate={isModalOpenUpdate}
            setIsModalOpenUpdate={setIsModalOpenUpdate}
            handleUpdateClick={showUpdateForm}
            selectedItem={selectedItem}
          />
        )}

        {dynamicContent.map((item, index) => (
          <div key={index} className='solieuthongke'>
            {/* <a target="_blank" href={item.link_url}> */}
              <img className="anh1thongke1" src={item.image_url} alt="example" />
              <h4>{item.title}</h4>
              <h6>{item.description}</h6>
            {/* </a> */}
            {isAdmin() && showAddButton && (
              <div>
                <button style={{ marginBottom: '20px' }} onClick={() => showUpdateForm(item)}>
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

export default connect(mapGlobalStateToProps)(Statistics);
