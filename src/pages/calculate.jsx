
import React, { useState } from 'react';
import WaterConsumption from '../components/waterConsumption';
import Transportation from '../components/transportation';
import EnergyConsumption from '../components/EnergyConsumption';
import FoodConsumption from '../components/FoodConsumption';
import GreenEnergyUsage from '../components/GreenEnergyUsage';
import Waste from '../components/Waste';

import '../css/calculate.css'
const Calculate = () => {
  const [currentComponent, setCurrentComponent] = useState(null);

  const renderComponent = (componentNumber) => {
    switch (componentNumber) {
      case 1:
        return <WaterConsumption />;
      case 2:
        return <Transportation />;
      case 3:
        return <GreenEnergyUsage />;
      case 4:
        return <FoodConsumption />;
      case 5:
        return <EnergyConsumption />;
      case 6:
        return <Waste />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className='divbutton'>
      <div className='divbutton1'>
        <button className='buttonn' onClick={() => setCurrentComponent(1)}>Tiêu thụ nước</button>
        <button className='buttonn' onClick={() => setCurrentComponent(2)}>Phương tiện di chuyển</button>
        <button className='buttonn' onClick={() => setCurrentComponent(3)}>Năng lượng xanh</button>
      </div>
      <div className='divbutton2'>
      <button className='buttonn' onClick={() => setCurrentComponent(4)}>Tiêu thụ thực phẩm</button>
        <button className='buttonn' onClick={() => setCurrentComponent(5)}>Tiêu thụ năng lương</button>
        <button className='buttonn' onClick={() => setCurrentComponent(6)}>Chất thải</button>
      </div>

      
      <div className='divtable'>
        {currentComponent && renderComponent(currentComponent)}
      </div>
      </div>

    </>
  );
};

export default Calculate;
