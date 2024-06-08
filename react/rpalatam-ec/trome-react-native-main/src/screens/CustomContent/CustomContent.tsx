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
import type { NavCategory } from '../../utils/categories'

const { SafeAreaView, View } = Box
const { Paragraph } = Typography

const CustomContentScreen: React.FC = () => {
  const insets = useSafeAreaInsets()
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

  return (
    <View flex={1} bg="background">
      <Ribbon title="Mi Contenido" />
      <DraggableFlatList
        data={items}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        containerStyle={{ height: window.height - 58 }}
        initialNumToRender={items.length}
        onDragEnd={onDragEnd}
        testID="draggable-list"
        ItemSeparatorComponent={() => <View bg="separator" height={1} />}
        ListFooterComponent={
          <SafeAreaView edges={['bottom']} height={insets.bottom + 16} />
        }
        ListHeaderComponent={
          <View
            px="1.5"
            py="1"
            borderBottomColor="separator"
            borderBottomWidth={1}>
            <Paragraph color="coolGray-700" fontWeight="bold" fontSize="sm">
              Seleccionar y reordenar las secciones del Inicio
            </Paragraph>
          </View>
        }
      />
    </View>
  )
}

export default CustomContentScreen
