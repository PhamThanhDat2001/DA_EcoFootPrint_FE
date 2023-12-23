import '../css/education.css'
import React from 'react';
const Education =() =>{
    const youtubeVideoUrl = "https://www.youtube.com/embed/fACkb2u1ULY";
    const youtubeVideoUrl2 = "https://www.youtube.com/embed/U6WZ98rzCI0";
    const youtubeVideoUrl3 = "    https://www.youtube.com/embed/DomVU98YKOo";
    return(<>
    <div>
    <h2>Video giáo dục</h2>

        <div>
        <div className="video-container">
      <div className="video-wrapper">
        <iframe
          width="220"
          height="110"
          src={youtubeVideoUrl}
          title="YouTube Video"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className="text-introduction">
        <h4>Giải thích dấu chân sinh thái</h4>
        <h6>Hoạt động của con người chúng ta tiêu thụ tài nguyên và tạo ra chất thải. 'Dấu chân sinh thái' là một cách để đo lường nhu cầu của con người đối với thiên nhiên.</h6>
      </div>
    </div>
        </div>

        <div>
        <div className="video-container">
      <div className="video-wrapper">
        <iframe
          width="220"
          height="110"
          src={youtubeVideoUrl2}
          title="YouTube Video"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className="text-introduction">
        <h4>Dấu chân sinh thái của mỗi người và thông điệp từ trái đất</h4>
        <h6>Lắng nghe để thấu hiểu cuộc sống hơn và thức tỉnh hành động vì một ngày mai tốt đẹp hơn!</h6>
      </div>
    </div>
        </div>


        <div>
        <div className="video-container">
      <div className="video-wrapper">
        <iframe
          width="220"
          height="110"
          src={youtubeVideoUrl3}
          title="YouTube Video"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className="text-introduction">
        <h4>4 cách giảm dấu chân sinh thái</h4>
        <h6>Lắng nghe để thấu hiểu cuộc sống hơn và thức tỉnh hành động vì một ngày mai tốt đẹp hơn!</h6>
      </div>
    </div>
        </div>

        <div className='cacbaibao'>
        <h2>Các bài báo , nghiên cứu về dấu chân sinh thái </h2>
       
       <div className='baibao1'> 
            <a target="_blank" href="https://tckhtm.tmu.edu.vn/bai-bao-tap-chi/chi-tiet/bui-hoang-ngoc-phan-thi-lieu-va-nguyen-huu-khoi-anh-huong-cua-chi-so-phuc-tap-kinh-te-len-dau-chan-sinh-thai-nghien-cuu-truong-hop-cua-viet-nam-21252">
            <h4>Ảnh hưởng của chỉ số phức tạp kinh tế lên dấu chân sinh thái</h4>
            </a>
            <h6>Điểm nổi bật của nghiên cứu này là phát hiện được chỉ số phức tạp kinh tế chỉ thực sự có lợi cho dấu chân sinh thái sau ngưỡng 67%. Do đó, ...</h6>
       
        </div>
        
       <div className='baibao2'>
       <a target="_blank" href="https://vjol.info.vn/index.php/jiem/article/view/68997">
            <h4>TÁC ĐỘNG CỦA CÁC BIẾN SỐ VĨ MÔ ĐẾN DẤU CHÂN SINH THÁI Ở CÁC NƯỚC ASEAN: THỰC NGHIỆM BẰNG PHƯƠNG PHÁP HỒI QUY KHÔNG GIAN</h4>
            </a>
            <h6> Đầu tư trực tiếp nước ngoài, Dấu chân sinh thái, Tăng trưởng kinh tế, Toàn cầu hóa, Các nước ASEAN. Tóm tắt. Tác động lan tỏa của đầu tư trực tiếp ..</h6>
       
        </div>  
            <div className='baibao3'>
            <a target="_blank" href="https://www.studocu.com/vn/document/truong-dai-hoc-kinh-te-dai-hoc-da-nang/kinh-te-dau-tu/bhn2020-dau-chan-sinh-thai-tang-truong-kinh-te-tieu-thu-nang-luong-ty-le-do-thi-hoa/61205682">
            <h4>Dấu chân sinh thái, Tăng trưởng kinh tế, tiêu thụ năng lượng, tỷ lệ đô thị hóa</h4>
            </a>
            <h6>Mục đích của nghiên cứu này là phân tích tác động của tăng trưởng kinh tế, tiêu thụ điện và tỷ lệ đô thị hóa đến dấu chân sinh thái ở các nước trong giai ...
</h6>
       
            </div>
        </div>

        <div className='solieuthongke'>
            <h2>Số liệu thống kê & kết quả nghiên cứu</h2>
            <div>
        <img src="https://redsvn.net/wp-content/uploads/2019/11/26.4.jpg" alt="" />
                <h4>Dấu chân sinh thái trong phát triển bền vững và trường hợp Việt Nam</h4>
            </div>
            <div>
                <img src="https://file.vnua.edu.vn/data/17/images/2022/10/24/btvqldd/a1.jpg?w=400" alt="" />
                <h4>xác định dấu chân carbon (carbon footprint) cho sản phẩm cá hồi</h4>
            </div>
        </div>
    </div>

    
    </>)
}
export default Education;