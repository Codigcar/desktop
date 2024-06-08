import CreateCard from "./controllers/CreateCard";
import GetCards from "./controllers/GetCards";
import GetSpecificCard from "./controllers/GetSpecificCard";
import UpdateCard from "./controllers/UpdateCard";
import DeleteCard from "./controllers/DeleteCard";

const CardController =  {
  CreateCard: CreateCard,
  GetCards: GetCards,
  GetSpecificCard: GetSpecificCard,
  UpdateCard: UpdateCard,
  DeleteCard: DeleteCard
}

export default CardController;
