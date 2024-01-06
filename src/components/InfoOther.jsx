import { connect } from 'react-redux';
import { selectRole } from '../redux/selectors/todoSelector';
import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import axios from 'axios';
import FormPostInfoSecond from '../components/formAddInfoMain';
import FormUpdateInfoMain from '../components/formUpdateInfoMain';
import FormPostInfoOther from './formAddInfoOther';
import FormUpdateInfoOther from './formUpdateInfoOther';

const InfoOther = (props) => {
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
      .get('http://localhost:8080/api/v1/infomationother')
      .then((response) => {
        setDynamicContent(response.data);
        setShowAddButton(true);
      })
      .catch((err) => 'da co loi: ' + err);
  };

  const openModalDelete = (item) => {
    confirm({
      title: 'XÓA ThÔNG TIN CHÍNH?',
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
        .delete('http://localhost:8080/api/v1/infomationother' + `/${item.id}`)
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
    <button onClick={() => showAddForm()}>Thêm thông tin khác</button>
    <h2>Thông tin khác</h2>
      <div className="info3">
        {isModalOpenAdd && (
          <FormPostInfoOther
            isModalOpenAdd={isModalOpenAdd}
            setIsModalOpenAdd={setIsModalOpenAdd}
            handleAddClick={showAddForm}
          />
        )}
        {isModalOpenUpdate && (
          <FormUpdateInfoOther
            isModalOpenUpdate={isModalOpenUpdate}
            setIsModalOpenUpdate={setIsModalOpenUpdate}
            handleUpdateClick={showUpdateForm}
            selectedItem={selectedItem}
          />
        )}

        {dynamicContent.map((item, index) => (
          <div key={index} className="infoother">
            <a target="_blank" href={item.link_url}>
              <img className="anh1info3" src={item.image_url} alt="example" />
              <div>
              <h4>{item.title}</h4>
              <h6>{item.description}</h6>
              </div>
            </a>
            {isAdmin() && showAddButton && (
              <div className="button-container">
                <button  onClick={() => showUpdateForm(item)}>
                  Chỉnh sửa
                </button>
                <button  onClick={() => openModalDelete(item)}>
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

export default connect(mapGlobalStateToProps)(InfoOther);
