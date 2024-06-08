import GetBuilding from './Controllers/GetBuilding';
import CreateBuilding from './Controllers/CreateBuilding';
import UpdateBuilding from './Controllers/UpdateBuilding';
import GetSpecificBuilding from './Controllers/GetSpecificBuilding';

const buildingController = {
    GetBuilding: GetBuilding,
    CreateBuilding: CreateBuilding,
    UpdateBuilding: UpdateBuilding,
    GetSpecificBuilding: GetSpecificBuilding
}

export default buildingController;