import GetListPrices from './controllers/GetListPrices';
import CreateListPrice from './controllers/CreateListPrice';
import UpdatedListPrice from './controllers/UpdateListPrice';
import GetSpecificListPrice from './controllers/GetSpecificListPrice';

const ListPriceController = {
    GetListPrice: GetListPrices,
    CreateListPrice: CreateListPrice,
    UpdatedListPrice: UpdatedListPrice,
    GetSpecificListPrice: GetSpecificListPrice
}

export default ListPriceController;

