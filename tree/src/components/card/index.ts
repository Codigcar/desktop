import CardImage from "./CardImage"
import CardShadow from "./CardShadow"

type CardProps = {
  Shadow: typeof CardShadow
  Image: typeof CardImage
}

const Card: CardProps = () => null

Card.Shadow = CardShadow
Card.Image = CardImage


export default Card
