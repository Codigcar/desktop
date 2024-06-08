import analytics from '@react-native-firebase/analytics'
import { useTheme } from '@shopify/restyle'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native'
import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
} from 'react-native-draggable-flatlist'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import DragCategoryItem, { CategoryItem } from './CategoryItem.gestion'
import Box from '../../components/box'
import Ribbon from '../../components/ribbon'
import Typography from '../../components/typography'
import { useMainNavigation } from '../../context/navigation'
import type { Theme } from '../../theme'
import type { NavCategory } from '../../utils/categories'

const { SafeAreaView, View } = Box
const { Paragraph } = Typography

const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <View p="1" borderBottomColor="separator" borderBottomWidth={1}>
      <View top={5}>
        <Paragraph color="coolGray-500" fontSize="sm">
          {title}
        </Paragraph>
      </View>
    </View>
  )
}

const CustomContentScreen: React.FC = () => {
  const { colors } = useTheme<Theme>()

  const { categories, setListOfCategory, mainNavigation } = useMainNavigation()
  const [items, setItems] = useState(() => categories)
  const portrait = useRef(categories.find(({ key }) => key === 'portada'))

  useEffect(() => {
    setListOfCategory(items)
  }, [items, setListOfCategory])

  const initCategories = () => {
    const categoryList = mainNavigation
      .filter((item) => item.type === 'category')
      .map((item, index) => ({
        active: index < 7,
        ...item,
      }))
    setItems(categoryList)
  }

  const toggleCategory = useCallback(
    (itemSelected) => {
      itemSelected = { ...itemSelected, active: !itemSelected.active }
      const list = items.filter((category) => category.key !== itemSelected.key)
      setItems([...list, itemSelected])
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

  const renderItem = (props: RenderItemParams<NavCategory>) => {
    if (!props.item.active) return null
    return <DragCategoryItem toggle={toggleCategory} {...props} />
  }

  return (
    <View flex={1} bg="background">
      <Ribbon
        title="Mi Contenido"
        RigthComponent={() => (
          <TouchableWithoutFeedback onPress={initCategories}>
            <Paragraph color="link" fontSize="sm">
              Restablecer
            </Paragraph>
          </TouchableWithoutFeedback>
        )}
      />

      <View flex={1}>
        <DraggableFlatList
          bounces={false}
          data={items}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
          initialNumToRender={items.length}
          onDragEnd={onDragEnd}
          testID="draggable-list"
          ItemSeparatorComponent={({ leadingItem }) => {
            if (!leadingItem.active) return null
            return <View bg="separator" height={1} />
          }}
          ListHeaderComponent={
            <React.Fragment>
              <View
                alignItems="center"
                bg="backgroundSecondary"
                flexDirection="row"
                justifyContent="center"
                py="0.5">
                <Paragraph
                  color="coolGray-700"
                  fontSize="sm"
                  fontWeight="medium"
                  textAlign="center">
                  Mantener presionada la sección {'\n'} y arrastrar para moverla
                </Paragraph>
                <Icon name="gesture-tap-hold" size={26} color={colors.text} />
              </View>
              <Header title="Secciones dentro de Inicio" />
            </React.Fragment>
          }
          ListFooterComponent={
            <React.Fragment>
              <View height={10} bg="backgroundSecondary" />
              <FlatList
                ListHeaderComponent={
                  <Header title="Secciones fuera de Inicio" />
                }
                data={items.filter((item) => !item.active).reverse()}
                renderItem={({ item }) => {
                  if (item.active) return null
                  return <CategoryItem item={item} toggle={toggleCategory} />
                }}
                ItemSeparatorComponent={() => (
                  <View bg="separator" height={1} />
                )}
              />
              <SafeAreaView edges={['bottom']} />
            </React.Fragment>
          }
        />
      </View>
    </View>
  )
}

export default CustomContentScreen
