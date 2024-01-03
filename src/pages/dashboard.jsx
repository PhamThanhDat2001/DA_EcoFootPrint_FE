
import { connect } from 'react-redux';
import '../css/dashboard.css'
import { selectRole, selectUsername } from '../redux/selectors/todoSelector';

import { useState,useEffect } from 'react';
import { Modal } from 'antd';
import FormPostInfoMain from '../components/formAddInfoMain';
import { ExclamationCircleFilled } from '@ant-design/icons';
import axios from 'axios';
import FormUpdateInfoMain from '../components/formUpdateInfoMain';


const Dashboard = (props) => {
  const { confirm } = Modal;
    const { role } = props;
    const isAdmin = () => role === 'USER';
    // const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    // const showAdd = () => {
    //     setIsModalOpenAdd(true);
    //   };
    const [dynamicContent, setDynamicContent] = useState([]);
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
    const [selectedItem,setSelectedItem] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);
  const showAddForm = () => {
    // setSelectedItem(item);
    setIsModalOpenAdd(true);
    setIsModalOpenUpdate(false);
  };
  const showUpdateForm = (item) => {
    setSelectedItem(item);
    setIsModalOpenUpdate(true);
    setIsModalOpenAdd(false);
  };
  const apiCallInfoMain = () => {
    console.log('đã vào')
    axios
      .get('http://localhost:8080/api/v1/infomationmain')
      .then((response) => {
        console.log(response, 'res =====');
        setDynamicContent(response.data);  // Use response.data instead of data
        setShowAddButton(true);
      })
      .catch((err) => 'da co loi: ' + err);
  };
  const openmodaldilit = (echxep) => {
    console.log(echxep.id)
    confirm({
      title: 'XÓA ThÔNG TIN CHÍNH?',
      icon: <ExclamationCircleFilled />,
      content: 'Xác nhận xóa  ' ,
      onOk() {
        dilit(echxep);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const dilit = (cc) => {
    console.log(cc.id)
    if (cc?.id) {
      axios
        .delete('http://localhost:8080/api/v1/infomationmain' + `/${cc.id}`)
        .then((res) => {
          apiCallInfoMain();
        })
        .catch((err) => {
          console.log(err, 'sss');
        });
    }

    console.log(cc);
  };
  //  useEffect(() => {
  //   // Fetch data from the API
  //   fetch('http://localhost:8080/api/v1/infomationmain')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Update state with the fetched data
  //       setDynamicContent(data);
  //       setShowAddButton(true); // Set showAddButton to true after fetching data
  //     })
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);

  useEffect(() => {
    apiCallInfoMain();
  }, []);
  const handleAddClick = () => {
    return (
      <FormPostInfoMain
        isModalOpenAdd={isModalOpenAdd}
        setIsModalOpenAdd={setIsModalOpenAdd}
        handleAddClick={handleAddClick}
      />
      
    );
  };
  const handleUpdateClick = () => {
    return (
      <FormUpdateInfoMain
        isModalOpenUpdate={isModalOpenUpdate}
        setIsModalOpenUpdate={setIsModalOpenUpdate}
        handleUpdateClick={handleUpdateClick}
        selectedItem={selectedItem}
      />
    );
  };
    return (<>
        <div>
            <div className="environment-info">
                <h1>Thông tin về môi trường</h1>
               
            </div>
            {/* <div className="info1">
                <a target="_blank" href="https://baotainguyenmoitruong.vn/giai-thuong-chinh-cua-vinfuture-2023-phat-minh-ve-pin-mat-troi-va-luu-tru-bang-pin-lithium-ion-368234.html">
                    <img className="anh1info1" src="https://btnmt.1cdn.vn/2023/12/20/cdnmedia.baotintuc.vn-upload-dmdnzyela7xudtdlsa19w-files-2023-12-2012-_vinfuture3-201223.jpg" alt="ảnh trao giải" />
                    <h4>                  Giải thưởng Chính của VinFuture 2023: Phát minh về pin mặt trời và lưu trữ bằng pin Lithium-ion
                    </h4>                    <h6>Tối 20/12, tại Hà Nội, Giải thưởng Chính của Giải thưởng Khoa học, công nghệ thường niên toàn cầu VinFuture năm 2023 trị giá 3 triệu USD đã được trao cho 4 nhà khoa học với phát minh đột phá kiến tạo nền tảng bền vững cho năng lượng xanh thông qua việc sản xuất bằng pin mặt trời và lưu trữ bằng pin Lithium-ion.</h6>
                </a>
              
                {isAdmin() && (
                <div>
                    <button onClick={handleAddClick}>Thêm</button>
                    <button>Chỉnh sửa</button>
                </div>
            )}
            </div> */}
              
              <button onClick={() => showAddForm()}>Thêm</button>
             <div className="info1">
             <h2>Thông tin chính</h2>
          {isModalOpenAdd && (
          <FormPostInfoMain
            isModalOpenAdd={isModalOpenAdd}
            setIsModalOpenAdd={setIsModalOpenAdd}
            handleAddClick={handleAddClick}
          
          />
        )} {isModalOpenUpdate && (
          <FormUpdateInfoMain
            isModalOpenUpdate={isModalOpenUpdate}
            setIsModalOpenUpdate={setIsModalOpenUpdate}
            handleUpdateClick={handleUpdateClick}
            selectedItem={selectedItem}
          />
        )}
        
{dynamicContent.map((item, index) => (
  <div key={index} className="info">
    <a target="_blank" href={item.link_url}>
    <img className="anh1info1" src={item.image_url} alt="example" />
      <h4>{item.title}</h4>
      <h6>{item.description}</h6>
    </a>
    {isAdmin() && showAddButton && (
      <div>
        <button style={{ marginBottom: '20px' }} onClick={() => showUpdateForm(item)}>Chỉnh sửa</button>
        <button style={{ marginLeft: '20px' }} onClick={() => openmodaldilit(item)}>Xóa</button>
      </div>
    )}
  </div>
))}
        </div>

       
            <div className="info2">
                <div>

                    <a target="_blank" href="https://baotainguyenmoitruong.vn/giai-thuong-chinh-cua-vinfuture-2023-phat-minh-ve-pin-mat-troi-va-luu-tru-bang-pin-lithium-ion-368234.html">
                        <img className="anh1info2" src="https://btnmt.1cdn.vn/2023/12/14/3.jpg" alt="ảnh lỗi" />
                        <h4>                        Bắc Yên (Sơn La): Chủ động thích ứng BĐKH, tăng cường quản lý tài nguyên, môi trường
                        </h4>                        <h6>(TN&MT) - Thực hiện Nghị quyết số 24-NQ/TW và Kết luận số 56-KL/TW của Ban Chấp hành Trung ương Đảng khóa XI, những năm qua, công tác ứng phó biến đổi khí hậu, quản lý tài nguyên và bảo vệ môi trường đã được cấp ủy, chính quyền huyện Bắc Yên, tỉnh Sơn La quan tâm chỉ đạo thực hiện trên các lĩnh vực. Bước đầu, ghi nhận một số kết quả tích cực.</h6>
                    </a>

                </div>
                <div>
                    <a target="_blank" href="https://baotainguyenmoitruong.vn/kich-hoat-phong-trao-phong-chong-rac-thai-nhua-o-ha-tinh-bai-4-khong-de-nong-tren-nguoi-duoi-362919.html">
                        <img className="anh2info2" src="https://btnmt.1cdn.vn/2023/09/07/anh-3.-mt.jpg" alt="" />
                        <h4>                        “Kích hoạt” phong trào phòng chống rác thải nhựa ở Hà Tĩnh:
                        </h4>
                        <h6>Giải quyết ô nhiễm rác thải nhựa từ lâu luôn là vấn đề cấp bách không chỉ ở Việt Nam mà trên toàn thế giới. Ngoài việc nâng cao ý thức cộng đồng, trách nhiệm của mỗi cá nhân hạn chế sử dụng các sản phẩm nhựa một lần và túi nilon, tìm sản phẩm thay thế vẫn được đánh giá là “điểm chốt” để hướng đến mục tiêu bền vững.</h6>
                    </a>
                </div>
                {isAdmin() && (
                        <div>
                            <button>Thêm</button>
                            <button>Chỉnh sửa</button>
                        </div>
                    )}
            </div>
            <div className="info3">
                <div className="div1info3">
                    <a target="_blank" href="https://baotainguyenmoitruong.vn/ung-dung-cong-nghe-hieu-qua-trong-xu-ly-chat-thai-ran-368227.html">
                    <img className="anh1info3" src="https://btnmt.1cdn.vn/2023/12/20/img_9346.jpg" alt="" />
                       
                       <div>
                        <h4> Ứng dụng công nghệ hiệu quả trong xử lý chất thải rắn</h4>
                        <h6>(TN&MT) - Chiều 20/12, tại Hà Nội, Liên hiệp các Hội Khoa học và Kỹ thuật Việt Nam phối hợp với Viện Nghiên cứu quy hoạch và phát triển và Công ty DO Green tổ chức Hội thảo “Ứng dụng công nghệ xử lý chất thải rắn góp phần phát triển kinh tế tuần hoàn, bảo vệ môi trường và phát triển bền vững”.</h6>
                 
                       </div>
                    </a>

                </div>
                <div className="div2info3">
                    <a target="_blank" href="https://baotainguyenmoitruong.vn/thuc-day-giai-phap-thay-the-nhua-dung-mot-lan-368171.html">
                        <img className="anh2info3" src="https://btnmt.1cdn.vn/2023/12/19/60f926dc6cfac4a49deb.jpg" alt="" />
                        <div>
                        <h4>
                            Thúc đẩy giải pháp thay thế nhựa dùng một lần
                        </h4>                <h6>(TN&MT) - Sáng 19/12, tại Hà Nội, Viện Chiến lược, Chính sách tài nguyên và môi trường tổ chức Hội thảo “Thúc đẩy giải pháp thay thế cho sản phẩm nhựa dùng một lần tại Việt Nam”.</h6>
                  
                        </div>
                    </a>
                </div>
                <div className="div3info3">
                <a target="_blank" href="https://baotainguyenmoitruong.vn/thuc-day-doi-moi-cong-nghe-sach-theo-huong-kinh-te-tuan-hoan-cac-bon-thap-368214.html">
                        <img className="anh3info3" src="https://btnmt.1cdn.vn/2023/12/20/anh-2.jpg" alt="" />
                      <div>
                      <h4>
                            Thúc đẩy đổi mới công nghệ sạch theo hướng kinh tế tuần hoàn, các-bon thấp
                        </h4>                <h6>(TN&MT) - Ngày 20/12, tại Hà Nội, Viện Chiến lược, Chính sách tài nguyên và môi trường (Bộ TN&MT) phối hợp cùng Tổ chức Phát triển công nghiệp Liên hợp quốc (UNIDO) tổ chức hội thảo thúc đẩy kinh tế tuần hoàn các-bon thấp thông qua đổi mới công nghệ sạch hướng tới phát triển bền vững tại Việt Nam.</h6>
                
                      </div>
                    </a>
                </div>
                <div className="div4info3">
                    <a target="_blank" href="https://baotainguyenmoitruong.vn/son-la-de-ra-nhiem-vu-trong-tam-ve-bao-ve-moi-truong-nam-2024-368187.html">
                        <img className="anh4info3" src="https://btnmt.1cdn.vn/2023/12/19/1(2).jpg" alt="" />
                       <div>
                       <h4>
                        Sơn La: Đề ra nhiệm vụ trọng tâm về bảo vệ môi trường năm 2024
                        </h4>
                        <h6>(TN&MT) - Năm 2023, Sở Tài nguyên và Môi trường đã triển khai kịp thời các nội dung theo quy định của Luật Bảo vệ môi trường 2020, tạo chuyển biến căn bản, hiệu quả trong công tác quản lý và bảo vệ môi trường trên toàn tỉnh.</h6>
                    
                       </div>
                    </a>
                </div>
                <div className="div5info3">
                    <a target="_blank" href="https://baotainguyenmoitruong.vn/xay-dung-nong-thon-moi-o-son-la-nang-cao-chat-luong-thuc-hien-tieu-chi-moi-truong-368164.html">
                    <img className="anh5info3" src="https://btnmt.1cdn.vn/2023/12/18/13a.jpg" alt="" />
                  <div>
                  <h4>
                    Xây dựng nông thôn mới ở Sơn La: Nâng cao chất lượng thực hiện tiêu chí môi trường
                    </h4>
                    <h6>(TN&MT) - Với 188/204 xã khu vực nông thôn, xác định tiêu chí môi trường là một trong những tiêu chí khó trong hành trình xây dựng nông thôn mới (NTM), thời gian qua, ngành Tài nguyên và Môi trường Sơn La đã thường xuyên hướng dẫn, đôn đốc các địa phương triển khai hoàn thiện, duy trì và nâng cao chất lượng các chỉ tiêu thuộc tiêu chí môi trường.</h6>
                  
                  </div>
                    </a>
                </div>
                {isAdmin() && (
                        <div>
                            <button>Thêm</button>
                            <button>Chỉnh sửa</button>
                        </div>
                    )}
            </div>
        </div>
       
    </>)
}
const mapGlobalStateToProps = state => {
    return {
      app: state.app,
      role: selectRole(state)
    };
  };
//   const mapGlobalStateToProps = state => {
//     return {
//       app: state.app,
//       username: selectUsername(state)
//     };
//   };
  
  
  export default connect(mapGlobalStateToProps)(Dashboard);
// export default Dashboard;