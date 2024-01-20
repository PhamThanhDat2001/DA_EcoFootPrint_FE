
ChartJS.register(ArcElement, Tooltip, Legend);
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';
import '../css/charts.css'
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

export const Res = () => {
  const navigate = useNavigate();
  // Use the useLocation hook to access the state
  const location = useLocation();
  const { state } = location;

  // Check if state is defined before accessing its properties
  const ketquabieudo = state?.ketquabieudo || [];
  const resulttong= state?.resulttong || [];
  console.log("tongkq",ketquabieudo)
  console.log("tong2",resulttong)
  // Access the properties from ketquabieudo
  const waterConsumption = ketquabieudo.waterConsumption || 0;
  const transportation = ketquabieudo.transportation || 0;
  const greenEnergyUsage = ketquabieudo.greenEnergyUsage || 0;
  const foodConsumption = ketquabieudo.foodConsumption || 0;
  const energyConsumption = ketquabieudo.energyConsumption || 0;
  const waste = ketquabieudo.waste || 0;

  // Update chartData based on the received results
  const chartData = {
    labels: ['Tiêu thụ nước', 'Phương tiện di chuyển', 'Nhà ở', 'Tiêu thụ thực phẩm', 'Tiêu thụ năng lượng', 'Chất thải'],
    datasets: [
      {
        label: 'Environmental Impact',
        data: [waterConsumption, transportation, greenEnergyUsage, foodConsumption, energyConsumption, waste],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],

    
  };
  const sosanh = (resulttong) => {
    if (resulttong > 0) {
      const difference = resulttong - 2.2;
      return (
        <div style={{ whiteSpace: 'pre-line' }}>
          Dựa vào kết quả tính toán dấu chân sinh thái cho thấy thói quen sống là: {resulttong} , 
          tuy nhiên dấu chân sinh thái của Trái đất là 2.2, so với dấu chân sinh thái Trái Đất thì 
          lớn hơn {difference}. Thói quen sống của em chưa thực sự phù hợp.
          {'\n'}
          1. Về mặt ăn uống: chế độ ăn chưa hợp lí, hằng ngày mua quá nhiều thức ăn mà không tính toán dẫn đến việc thừa thức ăn gây lãng phí
          {'\n'}
          2. Về mặt phương tiện: đi lại khá nhiều bằng xe máy, thỉnh thoảng có chạy bộ, đi bộ để giảm bớt lượng khí thải ra môi trường
          {'\n'}
          3. Biết tiết kiệm nước, không xài nước lãng phí
          {'\n'}
          4. Thường xuyên tái chế những vật dụng không dùng đến nữa: chai nhựa, giấy báo.
        </div>
      );
    } else {
      return 'Nếu mọi người đều sống như bạn, chúng tôi sẽ cần';
    }
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Custom Chart Title',
      },
    },
   
  };
  const nvgt = () => {
    navigate('/tinhtoan');
  }
  
  return (
    <>
    <Button onClick={nvgt} className="chuyentrang">
     Quay lại
    </Button>
      <div className="all">
      <div className="bieudo">
        <Pie data={chartData} options={chartOptions}style={{ width: '500px', height: '400px' }} />
        
      </div>
      <div className="ketqua">
      <div className="dauchan">Dấu chân sinh thái của bạn là {resulttong}</div>
      <div className="loikhuyen">{sosanh(resulttong)}</div>
      </div>
      </div>
      
    </>
  );
};