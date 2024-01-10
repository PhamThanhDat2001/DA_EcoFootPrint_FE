
import React, { useEffect, useRef, useState } from 'react';
import WaterConsumption from '../components/waterConsumption';
import Transportation from '../components/transportation';
import EnergyConsumption from '../components/EnergyConsumption';
import FoodConsumption from '../components/FoodConsumption';
import GreenEnergyUsage from '../components/GreenEnergyUsage';
import Waste from '../components/Waste';
import '../css/calculate.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { selectId } from '../redux/selectors/todoSelector';
import { connect } from 'react-redux';
const Calculate = (props) => {
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
  

  const handleCalculate = async () => {
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

    const waterConsumption= 0.03522 * (waterConsumptionData?.consumption ?? 0)
    const transportation= 0.01159 * (transportationData?.distance ?? 0)
    const greenEnergyUsage= 0.03382 * (greenEnergyUsageData?.usageAmount ?? 0)
    const  foodConsumption= 0.1449 * (foodConsumptionData?.quantity ?? 0)
    const energyConsumption= 0.03382 * (energyConsumptionData?.consumption ?? 0)
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
        0.03522 * (waterConsumptionData?.consumption ?? 0) +
        0.01159 * (transportationData?.distance ?? 0) +
        0.03382 * (greenEnergyUsageData?.usageAmount ?? 0) +
        0.1449 * (foodConsumptionData?.quantity ?? 0) +
        0.03382 * (energyConsumptionData?.consumption ?? 0) +
        0.1932 * (wasteData?.amount ?? 0);

    console.log('tong1:', resulttong);
    setResulttong(resulttong);
    setKetquabieudo(ketquabieudo);
    console.log('aidi:', props.Id);

    // http://localhost:8080/api/v1/resultecofootprint

    const dataToSave = {  
      user_id: props.Id,
      username: localStorage.getItem('username'),
      result: resulttong,
      // total_results: total_results,
    };

    // try {
    //   // Check if the username exists
    //   const userExistsResponse = await axios.get(`http://localhost:8080/api/v1/resultecofootprint/username/${localStorage.getItem('username')}`);
    //   if (userExistsResponse.data) {
    //     // If the user exists, perform a PUT request
    //     console.log('Data PUT');
    //     await axios.put(`http://localhost:8080/api/v1/resultecofootprint/user/${props.Id}`, dataToSave);
    //   } 
    //   else {
    //     // If the user does not exist, perform a POST request
    //     console.log('Data POST');
    //     await axios.post('http://localhost:8080/api/v1/resultecofootprint', dataToSave);
    //   }

    //   // Do something with the response if needed
    //   console.log('Data saved successfully');
    // } catch (error) {
    //   console.error('Error saving data to the server:', error);
    // }
    try {
      console.log('Data POST');
      // Always perform a POST request
      await axios.post('http://localhost:8080/api/v1/resultecofootprint', dataToSave);
    
      // Do something with the response if needed
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data to the server:', error);
    }
    navigate('/charts', { state: { ketquabieudo, resulttong } });
  
    // Pass the calculated results as part of the state object in navigate
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
const mapGlobalStateToProps = (state) => {
  return {
    Id: selectId(state),
  };
};

export default connect(mapGlobalStateToProps)(Calculate);
// export default Calculate;
