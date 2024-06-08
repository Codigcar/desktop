import GetUsers from "./controllers/GetUsers";
import GetSpecificUser from "./controllers/GetSpecificUser";
import UpdateUser from "./controllers/UpdateUser";
import DeleteUser from "./controllers/DeleteUser";

const UserController =  {
  GetUsers: GetUsers,
  GetSpecificUser: GetSpecificUser,
  UpdateUser: UpdateUser,
  DeleteUser: DeleteUser

}

export default UserController;