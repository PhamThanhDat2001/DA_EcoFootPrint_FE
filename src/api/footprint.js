import axios from 'axios';
import Api from './Api';



const urlupdateEnegyConsumption = "/energyconsumption";
const urlgetEnegyConsumptionByDate = "/energyconsumption"
const urlgetEnegyConsumptionById = "/energyconsumption"

const urlupdateFoodConsumption = "/foodconsumption";
const urlgetFoodConsumptionByDate = "/foodconsumption"
const urlgetFoodConsumptionById = "/foodconsumption"

const urlupdateGreenEnergyUsage = "/greenenergyusage";
const urlgetGreenEnergyUsageByDate = "/greenenergyusage"
const urlgetGreenEnergyUsageById = "/greenenergyusage"

const urlTransportation = "/transportation"
const urlWaste = "/waste"
const urlWaterConsumption = "/water"

const urlcheckdateEnegy = "/energyconsumptiondate"
const urlcheckdateFood = "/foodconsumptiondate"
const urlcheckdateGreen = "/greenenergyusagedate"
const urlcheckdateTransportation = "/transportationdate"
const urlcheckdateWaste = "/wastedate"
const urlcheckdateWater = "/waterconsumptiondate"
const existsBydateEnegy = (date) => {
    return Api.get(`${urlcheckdateEnegy}/${date}`);
};
const existsBydateFood = (date) => {
    return Api.get(`${urlcheckdateFood}/${date}`);
};
const existsBydateGreen = (date) => {
    return Api.get(`${urlcheckdateGreen}/${date}`);
};
const existsBydateTransportation = (date) => {
    return Api.get(`${urlcheckdateTransportation}/${date}`);
};
const existsBydateWaste = (date) => {
    return Api.get(`${urlcheckdateWaste}/${date}`);
};
const existsBydateWater = (date) => {
    return Api.get(`${urlcheckdateWater}/${date}`);
};


const existsBydateanduseridWater = (date,user_id) => {
    return Api.get(`${urlcheckdateWater}/${date}/${user_id}`);
};
const existsBydateanduseridTransport = (date,user_id) => {
    return Api.get(`${urlcheckdateTransportation}/${date}/${user_id}`);
};
const existsBydateanduseridGreenEnergy = (date,user_id) => {
    return Api.get(`${urlcheckdateGreen}/${date}/${user_id}`);
};
const existsBydateanduseridFood = (date,user_id) => {
    return Api.get(`${urlcheckdateFood}/${date}/${user_id}`);
};
const existsBydateanduseridEnergyConsumption = (date,user_id) => {
    return Api.get(`${urlcheckdateEnegy}/${date}/${user_id}`);
};
const existsBydateanduseridWaste = (date,user_id) => {
    return Api.get(`${urlcheckdateWaste}/${date}/${user_id}`);
};
// EnegyConsumption

const getEnegyConsumptionByDate = (date) => {
 
    return Api.get(`${urlgetEnegyConsumptionByDate}/${date}`);
};
const getEnegyConsumptionById = (id) => {
 
    return Api.get(`${urlgetEnegyConsumptionById}/${id}`);
};

const updateEnegyConsumption = (id, date,energyType,consumption,unit,description) =>{
    const body ={
        date: date,
        energyType:energyType,
        consumption:consumption,
        unit:unit,
        description:description,
      
    }
    return Api.put(`${urlupdateEnegyConsumption}/${id}`,body);
}
const create = (date,energyType,consumption,unit,description) =>{
    const user_id = localStorage.getItem('id');
    const body ={
        date: date,
        energyType:energyType,
        consumption:consumption,
        unit: unit,
        description:description,
        userid: user_id,
    }
    return Api.post(urlupdateEnegyConsumption,body);
}

// EnegyConsumption

// FoodConsumption
const createFoodConsumption = (date,foodItem,quantity,unit,description) =>{
    const user_id = localStorage.getItem('id');
    const body ={
        date: date,
        foodItem:foodItem,
        quantity:quantity,
        unit: unit,
        description:description,
        userid: user_id,
    }
    return Api.post(urlgetFoodConsumptionByDate,body);
}

const getFoodConsumptionByDate = (date) => {
 
    return Api.get(`${urlgetFoodConsumptionByDate}/${date}`);
};
const getFoodConsumptionById = (id) => {
 
    return Api.get(`${urlgetFoodConsumptionById}/${id}`);
};


const updateFoodConsumption = (id, date,foodItem,quantity,unit,description) =>{
    const body ={
        date: date,
        foodItem:foodItem,
        quantity:quantity,
        unit:unit,
        description:description,
      
    }
    return Api.put(`${urlupdateFoodConsumption}/${id}`,body);
}

// FoodConsumption


// GreenEnẻgy
const createGreenEnergyUsage = (date,energySource,usageAmount,unit,description) =>{
    const user_id = localStorage.getItem('id');
    const body ={
        date: date,
        energySource:energySource,
        usageAmount:usageAmount,
        unit: unit,
        description:description,
        userid: user_id,
    }
    return Api.post(urlgetGreenEnergyUsageByDate,body);
}


const getGreenEnergyUsageByDate = (date) => {
 
    return Api.get(`${urlgetGreenEnergyUsageByDate}/${date}`);
};
const getGreenEnergyUsageById = (id) => {
 
    return Api.get(`${urlgetGreenEnergyUsageById}/${id}`);
};


const updateGreenEnergyUsage = (id, date,energySource,usageAmount,unit,description) =>{
    const body ={
        date: date,
        energySource:energySource,
        usageAmount:usageAmount,
        unit:unit,
        description:description,
      
    }
    return Api.put(`${urlupdateGreenEnergyUsage}/${id}`,body);
}
// GreenEnẻgy

// Transportation
const createTransportation = (date,transportMode,distance,unit,description) =>{
    const user_id = localStorage.getItem('id');
    const body ={
        date: date,
        transportMode:transportMode,
        distance:distance,
        unit: unit,
        description:description,
        userid: user_id,
    }
    return Api.post(urlTransportation,body);
}


const getTransportationByDate = (date) => {
 
    return Api.get(`${urlTransportation}/${date}`);
};
const getTransportationById = (id) => {
 
    return Api.get(`${urlTransportation}/${id}`);
};


const updateTransportation = (id, date,transportMode,distance,unit,description) =>{
    const body ={
        date: date,
        transportMode:transportMode,
        distance:distance,
        unit:unit,
        description:description,
      
    }
    return Api.put(`${urlTransportation}/${id}`,body);
}
// Transportation

// Waste

const createWaste = (date,wasteType,amount,unit,description) =>{
    const user_id = localStorage.getItem('id');
    const body ={
        date: date,
        wasteType:wasteType,
        amount:amount,
        unit: unit,
        description:description,
        userid:user_id,
    }
    return Api.post(urlWaste,body);
}
const getWasteByDate = (date) => {
 
    return Api.get(`${urlWaste}/${date}`);
};
const getWasteById = (id) => {
 
    return Api.get(`${urlWaste}/${id}`);
};


const updateWaste = (id, date,wasteType,amount,unit,description) =>{
    const body ={
        date: date,
        wasteType:wasteType,
        amount:amount,
        unit:unit,
        description:description,
      
    }
    return Api.put(`${urlWaste}/${id}`,body);
}
// Waste

// WaterConsumption

// const createWaterConsumption = (date,usageType,consumption,unit,description) =>{
//     const body ={
//         date: date,
//         usageType:usageType,
//         consumption:consumption,
//         unit: unit,
//         description:description,
//     }
//     return Api.post(urlWaterConsumption,body);
// }
const createWaterConsumption = (date, usageType, consumption, unit, description) => {
    const user_id = localStorage.getItem('id'); // Replace with the correct method to get the user_id

    console.log('user_id:', user_id); // Add this line for debugging

    const body = {
      date: date,
      usageType: usageType,
      consumption: consumption,
      unit: unit,
      description: description,
      userid: user_id, // Add the user_id to the payload
    };

    return Api.post(urlWaterConsumption, body);
};

  
const getWaterConsumptionByDate = (date) => {
 
    return Api.get(`${urlWaterConsumption}r/${date}`);
};
const getWaterConsumptionById = (id) => {
 
    return Api.get(`${urlWaterConsumption}/${id}`);
};


const updateWaterConsumption = (id, date,usageType,consumption,unit,description) =>{
    const body ={
        date: date,
        usageType:usageType,
        consumption:consumption,
        unit:unit,
        description:description,
      
    }
    return Api.put(`${urlWaterConsumption}/${id}`,body);
}
// Waste

///
const getWaterConsumptionByDateAndUserId = async (date, user_id) => {
  
    return Api.get(`${urlWaterConsumption}/${user_id}/${date}`);
  };
  const getTransportationByDateAndUserId = async (date, user_id) => {
  
    return Api.get(`${urlTransportation}/${user_id}/${date}`);
  };
 const getGreenEnergyUsageByDateAndUserId = async (date, user_id) => {
  
    return Api.get(`${urlgetGreenEnergyUsageByDate}/${user_id}/${date}`);
  };
  const getFoodConsumptionByDateAndUserId = async (date, user_id) => {
  
    return Api.get(`${urlgetFoodConsumptionByDate}/${user_id}/${date}`);
  };
    const getEnergyConsumptionByDateAndUserId = async (date, user_id) => {
  
    return Api.get(`${urlgetEnegyConsumptionByDate}/${user_id}/${date}`);
  };
  const getWasteByDateAndUserId = async (date, user_id) => {
  
    return Api.get(`${urlWaste}/${user_id}/${date}`);
  };
//
// export
const FootprintApi = {updateEnegyConsumption,getEnegyConsumptionById,getEnegyConsumptionByDate,create,existsBydateEnegy,
                getFoodConsumptionByDate,getFoodConsumptionById,updateFoodConsumption,createFoodConsumption,existsBydateFood,
                getGreenEnergyUsageByDate,getGreenEnergyUsageById,updateGreenEnergyUsage,createGreenEnergyUsage,existsBydateGreen,
                getTransportationByDate,getTransportationById,updateTransportation,createTransportation,existsBydateTransportation,createWaste,
                getWasteByDate,getWasteById,updateWaste,existsBydateWaste,
                getWaterConsumptionByDate,getWaterConsumptionById,updateWaterConsumption,createWaterConsumption,existsBydateWater,
                getWaterConsumptionByDateAndUserId,existsBydateanduseridWater
                ,getTransportationByDateAndUserId,existsBydateanduseridTransport,
                getGreenEnergyUsageByDateAndUserId,existsBydateanduseridGreenEnergy,
            getFoodConsumptionByDateAndUserId,existsBydateanduseridFood,
            getEnergyConsumptionByDateAndUserId,existsBydateanduseridEnergyConsumption,
        getWasteByDateAndUserId,existsBydateanduseridWaste }
export default FootprintApi;
