
import React, { useEffect, useRef, useState } from 'react';
import WaterConsumption from '../components/waterConsumption';
import Transportation from '../components/transportation';
import EnergyConsumption from '../components/EnergyConsumption';
import FoodConsumption from '../components/FoodConsumption';
import GreenEnergyUsage from '../components/GreenEnergyUsage';
import Waste from '../components/Waste';
import '../css/calculate.css'
import { useNavigate } from 'react-router-dom';


const Calculate = () => {
  const [currentComponent, setCurrentComponent] = useState(null);
  const [waterConsumptionData, setWaterConsumptionData] = useState(null);
  const [transportationData, setTransportationData] = useState(null);
  const [greenEnergyUsageData, setGreenEnergyUsageData] = useState(null);
  const [foodConsumptionData, setFoodConsumptionData] = useState(null);
  const [energyConsumptionData, setEnergyConsumptionData] = useState(null);
  const [wasteData, setWasteData] = useState(null);
  const navigate = useNavigate();
  const [resulttong, setResulttong] = useState(null);
  const [ketquabieudo, setKetquabieudo] = useState(null);
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
  
    // const ketquabieudo = {
    //   waterConsumption: 0.3522 * (waterConsumptionData?.consumption ?? 0),
    //   transportation: 0.1159 * (transportationData?.distance ?? 0),
    //   greenEnergyUsage: 0.3382 * (greenEnergyUsageData?.usageAmount ?? 0),
    //   foodConsumption: 0.1449 * (foodConsumptionData?.quantity ?? 0),
    //   energyConsumption: 0.3382 * (energyConsumptionData?.consumption ?? 0),
    //   waste: 0.1932 * (wasteData?.amount ?? 0),
    // };
    // console.log('bieudo:', ketquabieudo);

    const waterConsumption= 0.3522 * (waterConsumptionData?.consumption ?? 0)
    const transportation= 0.1159 * (transportationData?.distance ?? 0)
    const greenEnergyUsage= 0.3382 * (greenEnergyUsageData?.usageAmount ?? 0)
    const  foodConsumption= 0.1449 * (foodConsumptionData?.quantity ?? 0)
    const energyConsumption= 0.3382 * (energyConsumptionData?.consumption ?? 0)
    const waste= 0.1932 * (wasteData?.amount ?? 0)
    // You can now use the 'result' object as needed
    const ketquabieudo = {
      waterConsumption,
      transportation,
      greenEnergyUsage,
      foodConsumption,
      energyConsumption,
      waste,
    };
    const resulttong =
        0.3522 * (waterConsumptionData?.consumption ?? 0) +
        0.1159 * (transportationData?.distance ?? 0) +
        0.3382 * (greenEnergyUsageData?.usageAmount ?? 0) +
        0.1449 * (foodConsumptionData?.quantity ?? 0) +
        0.3382 * (energyConsumptionData?.consumption ?? 0) +
        0.1932 * (wasteData?.amount ?? 0);

    console.log('tong1:', resulttong);
    setResulttong(resulttong);
    setKetquabieudo(ketquabieudo);

    // Pass the calculated results as part of the state object in navigate
    navigate('/charts', { state: { ketquabieudo, resulttong } });
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
          <button onClick={handleCalculate} ketquabieudo={ketquabieudo}>Tính toán</button>
        </div>
      
      </div>
      </div>

    </>
  );
};

export default Calculate;
