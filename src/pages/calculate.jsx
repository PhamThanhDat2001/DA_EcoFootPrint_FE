
import React, { useEffect, useRef, useState } from 'react';
import WaterConsumption from '../components/waterConsumption';
import Transportation from '../components/transportation';
import EnergyConsumption from '../components/EnergyConsumption';
import FoodConsumption from '../components/FoodConsumption';
import GreenEnergyUsage from '../components/GreenEnergyUsage';
import Waste from '../components/Waste';
import '../css/calculate.css'
import { Chart } from './charts';


const Calculate = () => {
  const [currentComponent, setCurrentComponent] = useState(null);
  const [waterConsumptionData, setWaterConsumptionData] = useState(null);
  const [transportationData, setTransportationData] = useState(null);
  const [greenEnergyUsageData, setGreenEnergyUsageData] = useState(null);
  const [foodConsumptionData, setFoodConsumptionData] = useState(null);
  const [energyConsumptionData, setEnergyConsumptionData] = useState(null);
  const [wasteData, setWasteData] = useState(null);

  const [showChart, setShowChart] = useState(false); // State to control the visibility of the Chart component

  const renderComponent = (componentNumber) => {
    switch (componentNumber) {
      case 1:
        return <WaterConsumption onWaterConsumptionDataChange={(data) => setWaterConsumptionData(data)}/>;
      case 2:
        return <Transportation onTransportationDataChange={(data) => setTransportationData(data)}/>;
      case 3:
        return <GreenEnergyUsage onGreenEnergyUsageDataChange={(data) => setGreenEnergyUsageData(data)}/>;
      case 4:
        return <FoodConsumption onFoodConsumptionDataChange={(data) => setFoodConsumptionData(data)}/>;
      case 5:
        return <EnergyConsumption onEnergyConsumptionDataChange={(data) => setEnergyConsumptionData(data)}/>;
      case 6:
        return <Waste onWasteDataChange={(data) =>setWasteData(data)}/>;
      default:
        return null;
    }
  };
  

  const handleCalculate = () => {
    // Check for null or undefined values and handle them
    const ketqua =
        0.3522 * (waterConsumptionData?.consumption ?? 0) +
        0.1159 * (transportationData?.distance ?? 0) +
        0.3382 * (greenEnergyUsageData?.usageAmount ?? 0) +
        0.1449 * (foodConsumptionData?.quantity ?? 0) +
        0.3382 * (energyConsumptionData?.consumption ?? 0) +
        0.1932 * (wasteData?.amount ?? 0);

    console.log('Result:', ketqua);
    setShowChart(true);
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
        <div>
          <button onClick={handleCalculate}>Tính toán</button>
        </div>
         <div>
          {showChart && <Chart />} {/* Render Chart component if showChart is true */}
        </div>
      </div>
      </div>

    </>
  );
};

export default Calculate;
