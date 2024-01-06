import { connect } from 'react-redux';
import { selectRole } from '../redux/selectors/todoSelector';
import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import axios from 'axios';
import FormPostInfoMain from '../components/formAddInfoMain';
import FormUpdateInfoMain from '../components/formUpdateInfoMain';
import FormPostNewSpaper from './formAddNewSpaper';
import FormUpdateNewSpaper from './formUpdateNewSpaper';

const InfoMain = (props) => {
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
      .get('http://localhost:8080/api/v1/newspaper')
      .then((response) => {
        setDynamicContent(response.data);
        setShowAddButton(true);
      })
      .catch((err) => 'da co loi: ' + err);
  };

  const openModalDelete = (item) => {
    confirm({
      title: 'XÓA BÀI BÁO NÀY?',
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
        .delete('http://localhost:8080/api/v1/newspaper' + `/${item.id}`)
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
    <button onClick={() => showAddForm()}>Thêm bài báo</button>
    <h2>Các bài báo, nghiên cứu về dấu chân sinh thái</h2>

      <div className='cacbaibao'>
        {isModalOpenAdd && (
          <FormPostNewSpaper
            isModalOpenAdd={isModalOpenAdd}
            setIsModalOpenAdd={setIsModalOpenAdd}
            handleAddClick={showAddForm}
          />
        )}
        {isModalOpenUpdate && (
          <FormUpdateNewSpaper
            isModalOpenUpdate={isModalOpenUpdate}
            setIsModalOpenUpdate={setIsModalOpenUpdate}
            handleUpdateClick={showUpdateForm}
            selectedItem={selectedItem}
          />
        )}

        {dynamicContent.map((item, index) => (
          <div key={index} className='baibao1'>
            <div >
            <a target="_blank" href={item.link_url}>
              <h4>{item.title}</h4>
            </a>
            </div>
            <h6>{item.description}</h6>
            
            {isAdmin() && showAddButton && (
              <div >
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

export default connect(mapGlobalStateToProps)(InfoMain);
