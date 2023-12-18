import { FacebookOutlined, InstagramOutlined, MailOutlined, PhoneOutlined, YoutubeOutlined } from '@ant-design/icons';
import '../css/footer.css'
const marginStyle = {
    margin: '10px',
  };
  const marginStyle2 = {
    margin: '20px',
    
  };const iconStyle = {
    fontSize: '40px', // Set the desired size
  };
  const mergedStyles = { ...marginStyle2, ...iconStyle };
const Footer = () => {
    return (
        <>
            <div className='div1footer'>
                <img src="https://thumbs.dreamstime.com/b/eco-footprint-7898138.jpg" alt="Description of the imassge" className="anhdiv1footer" />
                <h3>ECOFOOTPRINT - DẤU CHÂN SINH THÁI</h3>
            </div>

            <div className='div2footer'>
                <div><img src="https://ecofootprint.vn/images/config/logo-01_1473319995.png" alt="Description of the imassge" className="anhdiv2footer" />
                    <h3 className='veeco'>Về Eco Footprint</h3>
                    <h5>EcoFootprint là một ứng dụng web đột phá dành <><br /></> riêng cho việc nâng cao nhận thức về môi trường.</h5>
                </div>
                <div className='div22footer'><h3>Quy định điều khoản</h3>
                    <h5>Giới thiệu</h5>
                    <h5>Chính sách bảo mật</h5>
                    <h5>Quy định sử dụng</h5>
                    <h5>Thông báo</h5></div>
                    <div className='div23footer'>
            <h4>
                <PhoneOutlined style={marginStyle} /> Thông tin liên hệ:+84
            </h4>
            <h4>
                <MailOutlined style={marginStyle} /> Kết nối với chúng tôi.
                Email:..@..
            </h4>
            <a href="https://www.facebook.com/your-facebook-page" target="_blank" rel="noopener noreferrer">
                <FacebookOutlined style={mergedStyles} className='face' />
            </a>
            {/* Add other social media icons with links as needed */}
            <a href="https://www.youtube.com/your-youtube-channel" target="_blank" rel="noopener noreferrer">
                <YoutubeOutlined style={iconStyle} className='you' />
            </a>
            <a href="https://www.youtube.com/your-youtube-channel" target="_blank" rel="noopener noreferrer">
                <InstagramOutlined style={iconStyle} className='in' />
            </a>
        </div>
            </div>

            <div className='div3footer'><h3>copyright ©</h3></div>
        </>
    )
}
export default Footer;