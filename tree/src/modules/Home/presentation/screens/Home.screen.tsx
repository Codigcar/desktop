import { useNavigation } from '@react-navigation/native'

import ScrollView from '../../../../components/box/ScrollView'
import View from '../../../../components/box/View'
import { TimeLineItem } from '../../../../components/time'
import {
  CourseSection,
  NextEventsSection,
  PendingPaySection,
  SectionTitle,
} from '../components'
import type { HomeStackScreenProps } from '../../../../routes/types'
import type { IStatusTimeCourse } from '../../../../components/time/types'
import { Modal } from 'react-native'
import { Paragraph } from '../../../../components/typhografic'
import Loading from '../../../../components/loading'
import Image from '../../../../components/image'
import Button from '../../../../components/button'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../../context/auth.provider'
import useHomeInteractor from './Home.interactor'
import { ICourseByStudyPlanId } from '../../domain/dtos/listCoursesByStudyPlanId.response'

const CURSOS_LIST = [
  {
    title: 'Biología',
    cod: '000023287565',
    icon: 'BI',
  },
  {
    title: 'Biología',
    cod: '000023287565',
    icon: 'BI',
  },
  {
    title: 'Biología',
    cod: '000023287565',
    icon: 'BI',
  },
]

type IHORARIO_LIST = {
  time: string
  name: string
  classroom: string
  section: string
  description: string
  status: IStatusTimeCourse
}[]

export const HORARIO_LIST: IHORARIO_LIST = [
  {
    time: '10:00 - 11:00',
    name: 'Biología',
    classroom: 'Aula 122',
    section: 'Sección 0001',
    description: 'Título de evento',
    status: 'finished',
  },
  {
    time: '10:00 - 11:00',
    name: 'Biología',
    classroom: 'Aula 122',
    section: 'Sección 0001',
    description: 'Título de evento',
    status: 'inprocess',
  },
  {
    time: '10:00 - 11:00',
    name: 'Biología',
    classroom: 'Aula 122',
    section: 'Sección 0001',
    description: 'Título de evento',
    status: 'pending',
  },
]

const EVENTOS_LIST = [
  {
    image: 'https://i.ytimg.com/vi/OCrRs77cevs/maxresdefault.jpg',
    title: 'Capacitación Docente USMP 2023 II',
    ubication: 'Salon de eventos USMP',
    date: '12 Oct 2023',
  },
  {
    image: 'https://i.ytimg.com/vi/OCrRs77cevs/maxresdefault.jpg',
    title: 'Capacitación Docente USMP 2023 II',
    ubication: 'Salon de eventos USMP',
    date: '12 Oct 2023',
  },
  {
    image: 'https://i.ytimg.com/vi/OCrRs77cevs/maxresdefault.jpg',
    title: 'Capacitación Docente USMP 2023 II',
    ubication: 'Salon de eventos USMP',
    date: '12 Oct 2023',
  },
  {
    image: 'https://i.ytimg.com/vi/OCrRs77cevs/maxresdefault.jpg',
    title: 'Capacitación Docente USMP 2023 II',
    ubication: 'Salon de eventos USMP',
    date: '12 Oct 2023',
  },
]

type IModal = {
  onPress: () => void
}

const ModalPopup: React.FC<IModal> = ({ onPress }) => {
  return (
    <Modal transparent visible>
      <View
        flex={1}
        justifyContent="center"
        alignItems="center"
        style={{ backgroundColor: 'rgba(52, 52, 52, 0.5)' }}>
        <View bg="white" borderRadius="xxl" width="90%">
          <View height={316}>
            <Image
              source={require('../../../../assets/images/image-mock1.png')}
              resizeMode="contain"
              style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
            />
          </View>
          <View py="2">
            <View px="1" alignItems="center">
              <Paragraph fontWeight="600" color="black" fontSize={16}>
                Forma parte de la capacitación Docente USMP 2023-2
              </Paragraph>
              <Paragraph>
                Participa de nuestros cursos virtuales y talleres de
                participación continúa como docente de la USMP
              </Paragraph>
            </View>
            <View height={20} />
            <View width="90%" pl="1">
              <Button title="Ver más" onPress={onPress} type="primary" />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const HomeScreen = () => {
  const [showPopup, setShowPopup] = useState(true)
  const { isLoading, coursesList } = useHomeInteractor()
  
  const navigation =
    useNavigation<HomeStackScreenProps<'HomeScreen'>['navigation']>()

  return (
    <ScrollView flex={1} bg="white">
      <View flex={1}>
        <View height={25} />

        <SectionTitle
          title={`Mis cursos (${coursesList.length})`}
          viewAllOnPress={() =>
            navigation.push('CoursessStackScreen', {
              screen: 'MyCoursesScreen',
            })
          }
          px="1"
        />

        <View height={15} />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
          }}>
          <View flexDirection="row">
            {coursesList.map((item, index) => (
              <CourseSection
                key={index}
                course={item}
                disableMarginRight={CURSOS_LIST.length - 1 === index}
              />
            ))}
          </View>
        </ScrollView>

        <View height={30} />

        <SectionTitle
          title="Hoy, Mar. 10 OCT"
          viewAllOnPress={() => navigation.push('CalendarScreen')}
          px="1"
        />

        <View height={15} />
        {HORARIO_LIST.map((item, index) => (
          <TimeLineItem
            key={index}
            status={item.status}
            disableLineTop={index === 0}
            disableLineBottom={index === HORARIO_LIST.length - 1}
          />
        ))}

        <View height={20} />

        <SectionTitle
          title="Pagos pendientes"
          viewAllOnPress={() => navigation.push('PaymentsScreen')}
          px="1"
        />

        <View height={10} />

        <View px="1">
          <PendingPaySection />
        </View>

        <View height={15} />

        <SectionTitle
          title="Próximo eventos"
          viewAllOnPress={() => {
            navigation.push('EventsStackScreen', { screen: 'EventsScreen' })
            // navigation.push('EventsScreen')
          }}
          px="1"
        />

        <View height={10} />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
          }}>
          <View flexDirection="row">
            {EVENTOS_LIST.map((item, index) => (
              <View key={index}>
                <NextEventsSection
                  imageUrl={item.image}
                  title={item.title}
                  ubication={item.ubication}
                  date={item.date}
                />
                <View width={10} />
              </View>
            ))}
          </View>
        </ScrollView>

        <View height={20} />
      </View>
      {showPopup ? <ModalPopup onPress={() => setShowPopup(false)} /> : null}
      {isLoading ? <Loading /> : null}
    </ScrollView>
  )
}

export default HomeScreen
