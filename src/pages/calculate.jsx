
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
  
  const EQFdattrongtrot = 2.497090463;
  const EQFdatrung = 1.267398781;
  const EQFdatchantha = 0.461027;
  const EQFbaidanhcabien = 0.370849786;
  const EQFcosohatang = 2.497090463;
  const EQFbaidanhcanoidia = 0.370849786;
  const EQFcarbon = 1.267398781;
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

  
    const rawConsumption = waterConsumptionData?.consumption ?? 0;

const waterConsumption = (() => {
  if (waterConsumptionData?.usageType === 'nước sinh hoạt' && waterConsumptionData?.unit === 'Lít (l)') {
    return  ((rawConsumption / 1000) / 9.1) * EQFcosohatang
  } else if (waterConsumptionData?.usageType === 'nước sản xuất'&& waterConsumptionData?.unit === 'Lít (l)') {
    return  ((rawConsumption / 1000) / 7) * EQFcosohatang  
  } 
   else if (waterConsumptionData?.usageType === 'nước sinh hoạt'&& waterConsumptionData?.unit === 'Mét khối (m3)') {
    return  (rawConsumption/ 9.1) * EQFcosohatang
  } 
  else if (waterConsumptionData?.usageType === 'nước sản xuất'&& waterConsumptionData?.unit === 'Mét khối (m3)') {
    return   (rawConsumption/ 7) * EQFcosohatang
  } 
  return  0;
})();
// const transportation= 0.01159 * (transportationData?.distance ?? 0)
const rawTransportation= transportationData?.distance ?? 0;
const transportation = (() => {
  if (transportationData?.transportMode === 'Xe máy' && transportationData?.unit === 'Kilometre (km)') {
    return  (((rawTransportation / 80)*0.74) / 2.2456) * EQFcarbon
  } else if (transportationData?.transportMode === 'Xe máy'&& transportationData?.unit === 'Metre (m)') {
    return  ((((rawTransportation / 80)/1000)*0.74) / 2.2456) * EQFcarbon
  } 
   else if (transportationData?.transportMode === 'Ô tô'&& transportationData?.unit === 'Kilometre (km)') {
    return  (((rawTransportation / 15)*0.74) / 2.2456) * EQFcarbon
  } 
  else if (transportationData?.transportMode === 'Ô tô'&& transportationData?.unit === 'Metre (m)') {
    return  ((((rawTransportation / 15)/1000)*0.74) / 2.2456) * EQFcarbon
  } 
  return  0;
})();
    // const greenEnergyUsage= 0.03382 * (greenEnergyUsageData?.usageAmount ?? 0)
    const rawGreenEnergyUsage= greenEnergyUsageData?.usageAmount ?? 0;
const greenEnergyUsage = (() => {
  if (greenEnergyUsageData?.energySource === 'Nhà cấp 4' && greenEnergyUsageData?.unit === 'm2') {
    return  ((rawGreenEnergyUsage * 0.4) / 121.2) * EQFcosohatang
  } else if (greenEnergyUsageData?.energySource === 'Nhà cấp 4'&& greenEnergyUsageData?.unit === 'ha') {
    return  (((rawGreenEnergyUsage * 10000) * 0.4) / 121.2) * EQFcosohatang
  } 
  else if (greenEnergyUsageData?.energySource === 'Nhà cấp 4'&& greenEnergyUsageData?.unit === 'km2') {
    return  (((rawGreenEnergyUsage * 1000000) * 0.4) / 121.2) * EQFcosohatang
  } 
  else if (greenEnergyUsageData?.energySource === 'Nhà biệt thự'&& greenEnergyUsageData?.unit === 'm2') {
    return  ((rawGreenEnergyUsage * 0.5) / 121.2) * EQFcosohatang
  } 
   else if (greenEnergyUsageData?.energySource === 'Nhà biệt thự'&& greenEnergyUsageData?.unit === 'ha') {
    return  (((rawGreenEnergyUsage * 10000) * 0.5) / 121.2) * EQFcosohatang
  } 
  else if (greenEnergyUsageData?.energySource === 'Nhà biệt thự'&& greenEnergyUsageData?.unit === 'km2') {
    return (((rawGreenEnergyUsage * 1000000) * 0.5) / 121.2) * EQFcosohatang
  } 
  else if (greenEnergyUsageData?.energySource === 'Nhà ống'&& greenEnergyUsageData?.unit === 'm2') {
    return  ((rawGreenEnergyUsage * 0.45) / 121.2) * EQFcosohatang
  } 
   else if (greenEnergyUsageData?.energySource === 'Nhà ống'&& greenEnergyUsageData?.unit === 'ha') {
    return  (((rawGreenEnergyUsage * 10000) * 0.45) / 121.2) * EQFcosohatang
  } 
  else if (greenEnergyUsageData?.energySource === 'Nhà ống'&& greenEnergyUsageData?.unit === 'km2') {
    return  (((rawGreenEnergyUsage * 1000000) * 0.45) / 121.2) * EQFcosohatang
  } 
  return  0;
})();

    // const  foodConsumption= 0.1449 * (foodConsumptionData?.quantity ?? 0)
    const rawFoodConsumption= foodConsumptionData?.quantity ?? 0;
    const foodConsumption = (() => {
      if (foodConsumptionData?.foodItem === 'Gia súc' && foodConsumptionData?.unit === 'Kilogram (kg)') {
        return  (rawFoodConsumption  / 3) * EQFdatchantha
      } else if (foodConsumptionData?.foodItem === 'Gia súc'&& foodConsumptionData?.unit === 'Gram (g)') {
        return  ((rawFoodConsumption / 1000) / 3) * EQFdatchantha
      } 
      else if (foodConsumptionData?.foodItem === 'Gia súc'&& foodConsumptionData?.unit === 'mililít (ml)') {
        return  ((rawFoodConsumption / 1000) / 3) * EQFdatchantha
      } 
      else if (foodConsumptionData?.foodItem === 'Gia súc'&& foodConsumptionData?.unit === 'Lít (l)') {
        return  (rawFoodConsumption / 3) * EQFdatchantha
      } 


      else if (foodConsumptionData?.foodItem === 'Gia cầm'&& foodConsumptionData?.unit === 'Kilogram (kg)') {
        return  (rawFoodConsumption  / 2) * EQFdatchantha
      } 
       else if (foodConsumptionData?.foodItem === 'Gia cầm'&& foodConsumptionData?.unit === 'Gram (g)') {
        return  ((rawFoodConsumption / 1000) / 2) * EQFdatchantha
      } 
      else if (foodConsumptionData?.foodItem === 'Gia cầm'&& foodConsumptionData?.unit === 'mililít (ml)') {
        return  ((rawFoodConsumption / 1000) / 2) * EQFdatchantha
      } 
      else if (foodConsumptionData?.foodItem === 'Gia cầm'&& foodConsumptionData?.unit === 'Lít (l)') {
        return  (rawFoodConsumption / 2) * EQFdatchantha
      } 


      else if (foodConsumptionData?.foodItem === 'Cá nước mặn'&& foodConsumptionData?.unit === 'Kilogram (kg)') {
        return (rawFoodConsumption  / 3.5) * EQFbaidanhcabien
      } 
       else if (foodConsumptionData?.foodItem === 'Cá nước mặn'&& foodConsumptionData?.unit === 'Gram (g)') {
        return  ((rawFoodConsumption / 1000) / 3.5) * EQFbaidanhcabien
      } 
      else if (foodConsumptionData?.foodItem === 'Cá nước mặn'&& foodConsumptionData?.unit === 'mililít (ml)') {
        return  ((rawFoodConsumption / 1000) / 3.5) * EQFbaidanhcabien
      } 
      else if (foodConsumptionData?.foodItem === 'Cá nước mặn'&& foodConsumptionData?.unit === 'Lít (l)') {
        return  (rawFoodConsumption / 3.5) * EQFbaidanhcabien
      } 


      else if (foodConsumptionData?.foodItem === 'Cá nước ngọt'&& foodConsumptionData?.unit === 'Kilogram (kg)') {
        return  (rawFoodConsumption  / 2.5) * EQFbaidanhcanoidia
      } 
       else if (foodConsumptionData?.foodItem === 'Cá nước ngọt'&& foodConsumptionData?.unit === 'Gram (g)') {
        return  ((rawFoodConsumption / 1000) / 2.5) * EQFbaidanhcanoidia
      } 
      else if (foodConsumptionData?.foodItem === 'Cá nước ngọt'&& foodConsumptionData?.unit === 'mililít (ml)') {
        return  ((rawFoodConsumption / 1000) / 2.5) * EQFbaidanhcanoidia
      } 
      else if (foodConsumptionData?.foodItem === 'Cá nước ngọt'&& foodConsumptionData?.unit === 'Lít (l)') {
        return  (rawFoodConsumption / 2.5) * EQFbaidanhcanoidia
      } 


      else if (foodConsumptionData?.foodItem === 'Rau củ'&& foodConsumptionData?.unit === 'Kilogram (kg)') {
        return  (rawFoodConsumption  / 40) * EQFdattrongtrot
      } 
       else if (foodConsumptionData?.foodItem === 'Rau củ'&& foodConsumptionData?.unit === 'Gram (g)') {
        return  ((rawFoodConsumption / 1000) / 40) * EQFdattrongtrot
      } 
      else if (foodConsumptionData?.foodItem === 'Rau củ'&& foodConsumptionData?.unit === 'mililít (ml)') {
        return  ((rawFoodConsumption / 1000) / 40) * EQFdattrongtrot
      } 
      else if (foodConsumptionData?.foodItem === 'Rau củ'&& foodConsumptionData?.unit === 'Lít (l)') {
        return  (rawFoodConsumption / 40) * EQFdattrongtrot
      } 


      else if (foodConsumptionData?.foodItem === 'Ngũ cốc'&& foodConsumptionData?.unit === 'Kilogram (kg)') {
        return  (rawFoodConsumption  / 3.5) * EQFdattrongtrot
      } 
       else if (foodConsumptionData?.foodItem === 'Ngũ cốc'&& foodConsumptionData?.unit === 'Gram (g)') {
        return  ((rawFoodConsumption / 1000) / 3.5) * EQFdattrongtrot
      } 
      else if (foodConsumptionData?.foodItem === 'Ngũ cốc'&& foodConsumptionData?.unit === 'mililít (ml)') {
        return  ((rawFoodConsumption / 1000) / 3.5) * EQFdattrongtrot
      } 
      else if (foodConsumptionData?.foodItem === 'Ngũ cốc'&& foodConsumptionData?.unit === 'Lít (l)') {
        return  (rawFoodConsumption / 3.5) * EQFdattrongtrot
      } 


      else if (foodConsumptionData?.foodItem === 'Sản phẩm từ sữa'&& foodConsumptionData?.unit === 'Kilogram (kg)') {
        return  (rawFoodConsumption  / 100) * EQFdatchantha
      } 
       else if (foodConsumptionData?.foodItem === 'Sản phẩm từ sữa'&& foodConsumptionData?.unit === 'Gram (g)') {
        return  ((rawFoodConsumption / 1000) / 100) * EQFdatchantha
      } 
      else if (foodConsumptionData?.foodItem === 'Sản phẩm từ sữa'&& foodConsumptionData?.unit === 'mililít (ml)') {
        return  ((rawFoodConsumption / 1000) / 100) * EQFdatchantha
      } 
      else if (foodConsumptionData?.foodItem === 'Sản phẩm từ sữa'&& foodConsumptionData?.unit === 'Lít (l)') {
        return   (rawFoodConsumption / 100) * EQFdatchantha
      } 


      else if (foodConsumptionData?.foodItem === 'Sản phẩm từ đậu nành'&& foodConsumptionData?.unit === 'Kilogram (kg)') {
        return  (rawFoodConsumption  / 3) * EQFdattrongtrot
      } 
       else if (foodConsumptionData?.foodItem === 'Sản phẩm từ đậu nành'&& foodConsumptionData?.unit === 'Gram (g)') {
        return  ((rawFoodConsumption / 1000) / 3) * EQFdattrongtrot
      } 
      else if (foodConsumptionData?.foodItem === 'Sản phẩm từ đậu nành'&& foodConsumptionData?.unit === 'mililít (ml)') {
        return  ((rawFoodConsumption / 1000) / 3) * EQFdattrongtrot
      } 
      else if (foodConsumptionData?.foodItem === 'Sản phẩm từ đậu nành'&& foodConsumptionData?.unit === 'Lít (l)') {
        return  (rawFoodConsumption / 3) * EQFdattrongtrot
      } 


      else if (foodConsumptionData?.foodItem === 'Thực phẩm chế biến'&& foodConsumptionData?.unit === 'Kilogram (kg)') {
        return  (rawFoodConsumption  / 20) * EQFdatchantha
      } 
       else if (foodConsumptionData?.foodItem === 'Thực phẩm chế biến'&& foodConsumptionData?.unit === 'Gram (g)') {
        return  ((rawFoodConsumption / 1000) / 20) * EQFdatchantha
      } 
      else if (foodConsumptionData?.foodItem === 'Thực phẩm chế biến'&& foodConsumptionData?.unit === 'mililít (ml)') {
        return  ((rawFoodConsumption / 1000) / 20) * EQFdatchantha
      } 
      else if (foodConsumptionData?.foodItem === 'Thực phẩm chế biến'&& foodConsumptionData?.unit === 'Lít (l)') {
        return  (rawFoodConsumption / 20) * EQFdatchantha
      } 


      else if (foodConsumptionData?.foodItem === 'Thực phẩm tươi sống'&& foodConsumptionData?.unit === 'Kilogram (kg)') {
        return   (rawFoodConsumption  / 40) * EQFdatchantha
      } 
       else if (foodConsumptionData?.foodItem === 'Thực phẩm tươi sống'&& foodConsumptionData?.unit === 'Gram (g)') {
        return  ((rawFoodConsumption / 1000) / 40) * EQFdatchantha
      } 
      else if (foodConsumptionData?.foodItem === 'Thực phẩm tươi sống'&& foodConsumptionData?.unit === 'mililít (ml)') {
        return  ((rawFoodConsumption / 1000) / 40) * EQFdatchantha
      } 
      else if (foodConsumptionData?.foodItem === 'Thực phẩm tươi sống'&& foodConsumptionData?.unit === 'Lít (l)') {
        return  (rawFoodConsumption / 40) * EQFdatchantha
      } 
      return  0;
    })();
    // const energyConsumption= 0.03382 * (energyConsumptionData?.consumption ?? 0)
    const rawEnergyConsumption= energyConsumptionData?.consumption ?? 0;
const energyConsumption = (() => {
  if (energyConsumptionData?.energyType === 'Điện' && energyConsumptionData?.unit === 'kWh') {
    return  (rawEnergyConsumption  / 27.16) * EQFbaidanhcabien
  } else if (energyConsumptionData?.energyType === 'Năng lượng gió'&& energyConsumptionData?.unit === 'kWh') {
    return  (rawEnergyConsumption / 125.9) * EQFcosohatang
  } 
   else if (energyConsumptionData?.energyType === 'Năng lượng mặt trời'&& energyConsumptionData?.unit === 'kWh') {
    return  (rawEnergyConsumption / 444.44) * EQFcosohatang
  } 
 
  return  0;
})();
    // const waste= 0.1932 * (wasteData?.amount ?? 0)
    const rawWaste= wasteData?.amount ?? 0;
const waste = (() => {
  if (wasteData?.wasteType === 'Rác thải sinh hoạt' && wasteData?.unit === 'Kilogram (kg)') {
    return  ((rawWaste / 1000) / 4.3) * EQFcarbon
  } else if (wasteData?.wasteType === 'Rác thải sinh hoạt'&& wasteData?.unit === 'Gram (g)') {
    return  ((rawWaste /  1000000) / 4.3) * EQFcarbon
  } 
  else if (wasteData?.wasteType === 'Rác thải sinh hoạt'&& wasteData?.unit === 'Tấn') {
    return  (rawWaste / 4.3) * EQFcarbon
  } 
  else if (wasteData?.wasteType === 'Rác thải công nghiệp'&& wasteData?.unit === 'Kilogram (kg)') {
    return  ((rawWaste / 1000) / 4.3) * EQFcarbon
  } 
   else if (wasteData?.wasteType === 'Rác thải công nghiệp'&& wasteData?.unit === 'Gram (g)') {
    return  ((rawWaste /  1000000) / 4.3) * EQFcarbon
  } 
  else if (wasteData?.wasteType === 'Rác thải công nghiệp'&& wasteData?.unit === 'Tấn') {
    return  (rawWaste / 4.3) * EQFcarbon
  } 
  else if (wasteData?.wasteType === 'Rác thải xây dựng'&& wasteData?.unit === 'Kilogram (kg)') {
    return ((rawWaste / 1000) / 4.3) * EQFcarbon
  } 
   else if (wasteData?.wasteType === 'Rác thải xây dựng'&& wasteData?.unit === 'Gram (g)') {
    return ((rawWaste /  1000000) / 4.3) * EQFcarbon
  } 
  else if (wasteData?.wasteType === 'Rác thải xây dựng'&& wasteData?.unit === 'Tấn') {
    return  (rawWaste / 4.3) * EQFcarbon
  } 
  return  0;
})();
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
    waterConsumption  +
    transportation  +
    greenEnergyUsage  +
    foodConsumption  +
    energyConsumption  +
    waste ;
   
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
        <button className='buttonn' onClick={() => setCurrentComponent(3)}>Nhà ở</button>
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
