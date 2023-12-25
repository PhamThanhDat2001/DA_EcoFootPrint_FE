import Api from './Api';

const url = "/username";

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
// EnegyConsumption

// FoodConsumption
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

// Waste
const getWaterConsumptionByDate = (date) => {
 
    return Api.get(`${urlWaterConsumption}/${date}`);
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

// export
const FootprintApi = {updateEnegyConsumption,getEnegyConsumptionById,getEnegyConsumptionByDate,
                getFoodConsumptionByDate,getFoodConsumptionById,updateFoodConsumption,
                getGreenEnergyUsageByDate,getGreenEnergyUsageById,updateGreenEnergyUsage,
                getTransportationByDate,getTransportationById,updateTransportation,
                getWasteByDate,getWasteById,updateWaste,
                getWaterConsumptionByDate,getWaterConsumptionById,updateWaterConsumption }
export default FootprintApi;

