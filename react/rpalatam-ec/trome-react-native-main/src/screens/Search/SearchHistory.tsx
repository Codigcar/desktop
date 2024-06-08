import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  Dimensions,
  FlatList,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  ViewProps,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Box from '../../components/box'
import Paragraph from '../../components/typography/Paragraph'
import useSearchHistory from '../../hooks/useSearchHistory'
import { AllProps } from '../../theme'
import type { MainStackScreenProps } from '../../routes/types'

const { View } = Box

const { height, width } = Dimensions.get('screen')

const listItemStyle: AllProps & ViewProps = {
  height: 44,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  style: {
    borderBottomColor: '#DAD0C9',
    borderBottomWidth: 1,
  },
}

const boxShadow: AllProps = {
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.16,
  shadowRadius: 2.22,
  shadowColor: 'black',
}

const SearchHistory: React.FC<{
  termList: string[]
  handleShippingOfSelectedTerm: (term: string) => void
}> = ({ termList, handleShippingOfSelectedTerm }) => {
  const navigation =
    useNavigation<MainStackScreenProps<'Search'>['navigation']>()
  const insets = useSafeAreaInsets()
  const { removeTermFromHistory } = useSearchHistory()

  const closeColor = '#7E7E7E80'

  const Item: React.FC<{ term: string }> = ({ term }) => (
    <View {...listItemStyle}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss()
          handleShippingOfSelectedTerm(term)
        }}>
        <View width="90%">
          <Paragraph color="coolGray-500" numberOfLines={1}>
            {term}
          </Paragraph>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        hitSlop={{ bottom: 4, top: 4, left: 4, right: 4 }}
        onPress={() => {
          removeTermFromHistory(term)
        }}>
        <Icon
          name="close"
          accessibilityLabel="remove"
          color={closeColor}
          size={24}
        />
      </TouchableWithoutFeedback>
    </View>
  )

  const commonStyles: AllProps = {
    width,
    position: 'absolute',
    elevation: 1,
    top: Math.max(insets.top, 0) + 48,
    zIndex: 1,
  }

  const maxHeightContainer = height - (Platform.OS === 'android' ? 164 : 160)

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss()
          navigation.goBack()
        }}>
        <View
          testID="bg-search-history"
          backgroundColor="black"
          opacity={0.32}
          height={height}
          {...commonStyles}
        />
      </TouchableWithoutFeedback>

      {termList.length > 0 ? (
        <View
          paddingStart="1"
          paddingEnd="1.25"
          paddingBottom="1"
          bg="background"
          {...boxShadow}
          {...commonStyles}>
          <View height={50} justifyContent="center">
            <Paragraph fontSize="sm" color="coolGray-500" fontWeight="bold">
              Últimas búsquedas
            </Paragraph>
          </View>

          <FlatList
            disableScrollViewPanResponder
            keyboardDismissMode="on-drag"
            data={termList}
            renderItem={({ item }) => <Item term={item} />}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            bounces={false}
            style={{
              maxHeight: maxHeightContainer,
            }}
          />
        </View>
      ) : null}
    </>
  )
}

export default SearchHistory
