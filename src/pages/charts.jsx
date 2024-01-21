
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
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            // Add more colors as needed
          ],
          borderColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            // Add more colors as needed
          ],
          borderWidth: 1,
        },
      ],
    };
    const sosanh = (resulttong, adviceData) => {
      let advice = [];
    
      if (adviceData.waterConsumption > 0.9) {
        advice.push('Thói quen sử dụng nước cần được cải thiện để giảm lượng nước tiêu thụ.');
      }
    
      if (adviceData.transportation > 1.8) {
        advice.push('Hạn chế sử dụng phương tiện di chuyển cá nhân, thay vào đó hãy sử dụng các phương tiện công cộng hoặc phương tiện không gây ô nhiễm môi trường.');
      }
    
      if (adviceData.greenEnergyUsage > 1.4) {
        advice.push('Tìm kiếm các nguồn năng lượng sạch và tái tạo cho ngôi nhà của bạn để giảm lượng khí nhà kính.');
      }
    
      if (adviceData.foodConsumption > 2.2) {
        advice.push('Chúng ta có thể giảm lượng dấu chân sinh thái bằng cách thực hiện lựa chọn ăn uống bền vững và ít gây tác động đến môi trường.');
      }
    
      if (adviceData.energyConsumption > 1.2) {
        advice.push('Áp dụng biện pháp tiết kiệm năng lượng trong hoạt động hàng ngày để giảm tiêu thụ năng lượng và giảm lượng khí nhà kính.');
      }
    
      if (adviceData.waste > 0.8) {
        advice.push('Thực hiện tái chế và giảm lượng chất thải sinh hoạt để bảo vệ môi trường.');
      }
    
      if (resulttong > 2.2) {
        const difference = resulttong - 2.2;
        advice.push(
          <div key="boldAdvice" className="advice-box">
            <p>
            <strong> Dấu chân sinh thái của bạn là{' '}
              {resulttong}, lớn hơn {difference}. Thói quen sống của bạn chưa thực sự phù hợp.</strong>
            </p>
          </div>
        );
      }else{
        return <strong> Nếu mọi người đều sống như bạn, chúng tôi sẽ cần</strong>
      }
    
      return <div className="advice-container">{advice.map((item, index) => <div key={index} className="advice-box"><p>{item}</p></div>)}</div>;
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
        <div className="bieudo" style={{ width: '450px', height: '350px' }}>
          <Pie data={chartData} options={chartOptions} />
        </div>
        <div className="ketqua">
          <div className="dauchan">Dấu chân sinh thái của bạn là {resulttong}</div>
          <div className="loikhuyen">{sosanh(resulttong, ketquabieudo)}</div>
        </div>
      </div>
    </>
    );
  };