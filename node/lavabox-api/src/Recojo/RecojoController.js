import CreateRecojo from './Controllers/CreateRecojo';
import GetUserRecojos from './Controllers/GetRecojos';
import GetSpecificRecojo from './Controllers/GetSpecificRecojo';
import UpdateRecojo from './Controllers/UpdateRecojo'
import GetRecojoId from './Controllers/GetRecojoId';

const RecojoController = {
    CreateRecojo: CreateRecojo,
    GetRecojos: GetUserRecojos,
    GetSpecificRecojo: GetSpecificRecojo,
    UpdateRecojo: UpdateRecojo,
    GetRecojoId: GetRecojoId
}

export default RecojoController;