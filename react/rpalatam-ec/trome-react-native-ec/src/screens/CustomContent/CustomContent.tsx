import analytics from '@react-native-firebase/analytics'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
} from 'react-native-draggable-flatlist'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import CategoryItem from './CategoryItem'
import Box from '../../components/box'
import Ribbon from '../../components/ribbon'
import Typography from '../../components/typography'
import { useMainNavigation } from '../../context/navigation'
import { App } from '../../utils/config'
import type { NavCategory } from '../../utils/categories'

const { View } = Box
const { Paragraph } = Typography

const HeaderComponent: React.FC = () =>
  App.select({
    elcomercio: (
      <>
        <View paddingBottom="1.5" paddingTop="1.5">
          <Paragraph
            textAlign="center"
            fontSize="xl"
            fontWeight="bold"
            color="secondary">
            Selecciona y reordena las{'\n'} secciones del inicio
          </Paragraph>
        </View>
        <View
          bg="stroke.1"
          height={1}
          marginTop="0.25"
          marginHorizontal="1.5"
        />
      </>
    ),
    default: (
      <View px="1.5" py="1" borderBottomColor="separator" borderBottomWidth={1}>
        <Paragraph color="coolGray-700" fontWeight="bold" fontSize="sm">
          Seleccionar y reordenar las secciones del Inicio
        </Paragraph>
      </View>
    ),
  })

const FooterComponent: React.FC = () => {
  const insets = useSafeAreaInsets()
  return App.select({
    elcomercio: (
      <>
        <View bg="stroke.1" height={1} marginHorizontal="1.5" />
        <View height={insets.bottom + 50} />
      </>
    ),
    default: <View height={insets.bottom + 16} />,
  })
}
const CustomContentScreen: React.FC = () => {
  const window = useWindowDimensions()

  const { categories, setListOfCategory } = useMainNavigation()
  const [items, setItems] = useState(() => categories)
  const portrait = useRef(categories.find(({ key }) => key === 'portada'))

  useEffect(() => {
    setListOfCategory(items)
  }, [items, setListOfCategory])

  const toggleCategory = useCallback(
    (key) => {
      const list = items.map((category) => {
        if (category.key !== key) return category
        return { ...category, active: !category.active }
      })
      setItems(list)
    },
    [items],
  )

  const onDragEnd = useCallback((params: DragEndParams<NavCategory>) => {
    const { data, from, to } = params
    const category = data[to]
    if (!!portrait.current && (from === 0 || to === 0)) return
    if (from === to) return
    const id = category.key
    analytics().logEvent('reorder_home', { id, from, to, type: 'section' })
    setItems(params.data)
  }, [])

  const renderItem = (props: RenderItemParams<NavCategory>) => (
    <CategoryItem toggle={toggleCategory} {...props} />
  )

  const backgroundContainer =
    App.key === 'elcomercio' ? 'background.2' : 'background'

  const sectionTitle =
    App.key === 'elcomercio' ? 'Ordenar secciones' : 'Mi Contenido'

  return (
    <View flex={1} bg={backgroundContainer}>
      <Ribbon title={sectionTitle} />

      <DraggableFlatList
        data={items}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        containerStyle={{ height: window.height - 58 }}
        initialNumToRender={items.length}
        onDragEnd={onDragEnd}
        testID="draggable-list"
        ItemSeparatorComponent={() => (
          <View
            marginHorizontal={App.key === 'elcomercio' ? '1.5' : '0'}
            bg={App.key === 'elcomercio' ? 'stroke.1' : 'separator'}
            height={1}
          />
        )}
        ListFooterComponent={<FooterComponent />}
        ListHeaderComponent={<HeaderComponent />}
      />
    </View>
  )
}

export default CustomContentScreen
