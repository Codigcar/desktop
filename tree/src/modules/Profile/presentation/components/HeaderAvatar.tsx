import { View } from '../../../../components/box'
import { AvatarImage } from '../../../../components/image'
import { Paragraph } from '../../../../components/typhografic'

const HeaderAvatar: React.FC = () => {
  return (
    <View>
      <View flexDirection="row" alignItems="center">
        <View>
          <AvatarImage
            size={78}
            imageURL="https://turkeyanaclinic.com/wp-content/uploads/2023/05/Baby-Face-02.jpg"
          />
        </View>
        <View>
          <Paragraph fontWeight="600" color="black" fontSize={16}>
            Carolina Salas Iñato
          </Paragraph>
          <Paragraph>Nro. de Matrícula: 02920392</Paragraph>
          <Paragraph>Carolina.s@usmp.pe</Paragraph>
        </View>
      </View>

      <View height={20} />

      <Paragraph color="primary" fontWeight="600" fontSize={16}>
        Datos personales
      </Paragraph>
      <Paragraph fontWeight="500">
        Mantén siempre tus datos actualizados
      </Paragraph>
    </View>
  )
}

export default HeaderAvatar
