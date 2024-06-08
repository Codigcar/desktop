import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import { FormHandles } from '@unform/core'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TouchableWithoutFeedback, useWindowDimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import SearchHistory from './SearchHistory'
import Box from '../../components/box'
import InputBase from '../../components/input/Base'
import Ribbon from '../../components/ribbon'
import { useSearchContext } from '../../context/search'
import { formatedTerm } from '../../hooks/useSearchHistory'
import { Theme } from '../../theme'
import { ENABLE_SEARCH_HISTORY } from '../../utils/flags'
import type { MainStackScreenProps } from '../../routes/types'

const SearchHeader: React.ForwardRefRenderFunction<FormHandles> = (_, ref) => {
  const navigation =
    useNavigation<MainStackScreenProps<'Search'>['navigation']>()
  const { colors } = useTheme<Theme>()
  const window = useWindowDimensions()
  const {
    clearFilters,
    filters,
    orderInverse,
    resetSearch,
    results,
    status,
    toggleOrder,
    cancelSearch,
    termListHistory,
  } = useSearchContext()

  const formRef = ref as React.RefObject<FormHandles>

  const [isInputEmpty, setIsInputEmpty] = useState(!filters.get('term'))
  const [isInputFocus, setIsInputFocus] = useState(false)
  const [enableSearchHistory, setEnableSearchHistory] = useState(false)
  const [filterTerm, setFilterTerm] = useState<string>('')

  const hasResults = results.length > 0
  const showOptions = status === 'done' && hasResults
  const isFilterActive = filters.has('dateFrom') || filters.has('section')

  const history = useMemo(() => {
    const termFormate = formatedTerm(filterTerm)
    return termListHistory.filter((t) => t.startsWith(termFormate))
  }, [filterTerm, termListHistory])

  const handleChangeText = useCallback(
    (text: string) => {
      setIsInputEmpty(text === '')
      if ((hasResults || status === 'done') && text === '') resetSearch()

      if (termListHistory.length > 0) setFilterTerm(text)
    },
    [hasResults, resetSearch, status, termListHistory],
  )

  const handleClearButton = useCallback(() => {
    formRef.current?.reset()
    setIsInputEmpty(true)
    if (hasResults || status === 'done') resetSearch()
    if (status === 'started') cancelSearch()
  }, [hasResults, resetSearch, formRef, cancelSearch, status])

  const handleShippingOfSelectedTerm = (term: string) => {
    formRef.current?.setData({
      term,
    })
    formRef.current?.submitForm()
    setEnableSearchHistory(false)
  }

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        e.preventDefault()
        if (enableSearchHistory) {
          setEnableSearchHistory(false)
          return
        }
        navigation.dispatch(e.data.action)
      }),
    [enableSearchHistory, navigation],
  )

  const termList = isInputEmpty ? termListHistory : history

  return (
    <>
      <Ribbon
        RigthComponent={() => {
          if (!showOptions) return null
          return (
            <Box.View testID="options" flexDirection="row">
              <TouchableWithoutFeedback
                testID="button-order"
                onPress={toggleOrder}>
                <Box.View
                  width={32}
                  height={32}
                  alignItems="center"
                  justifyContent="center">
                  <Icon
                    testID="icon-order"
                    name="swap-vertical"
                    size={24}
                    color={
                      orderInverse ? colors['blue-400'] : colors['coolGray-700']
                    }
                  />
                </Box.View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                testID="button-filter"
                onPress={clearFilters}>
                <Box.View
                  width={32}
                  height={32}
                  alignItems="center"
                  justifyContent="center">
                  <Icon
                    testID="icon-filter"
                    name="filter"
                    color={
                      isFilterActive
                        ? colors['blue-400']
                        : colors['coolGray-700']
                    }
                    size={24}
                  />
                </Box.View>
              </TouchableWithoutFeedback>
            </Box.View>
          )
        }}>
        <Box.View maxWidth={showOptions ? window.width - 128 : window.width}>
          <InputBase
            testID="search-input"
            name="term"
            defaultValue={filters.get('term')}
            numberOfLines={1}
            onChangeText={handleChangeText}
            onSubmitEditing={() => {
              setEnableSearchHistory(false)
              formRef.current?.submitForm()
            }}
            onBlur={() => setIsInputFocus(false)}
            onFocus={() => {
              setIsInputFocus(true)
              setEnableSearchHistory(true)
            }}
            placeholder="Buscar noticias"
            placeholderTextColor={colors['coolGray-400']}
            returnKeyType="search"
            selectionColor={colors['blue-400']}
            style={{ color: colors['coolGray-800'] }}
            SuffixComponent={() => {
              if (isInputEmpty || !isInputFocus) return null
              return (
                <TouchableWithoutFeedback
                  testID="button-clean"
                  hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
                  onPress={handleClearButton}>
                  <Icon
                    name="close-circle"
                    color={colors['coolGray-700']}
                    size={18}
                  />
                </TouchableWithoutFeedback>
              )
            }}
          />
        </Box.View>
      </Ribbon>
      {enableSearchHistory && ENABLE_SEARCH_HISTORY ? (
        <SearchHistory
          termList={termList}
          handleShippingOfSelectedTerm={handleShippingOfSelectedTerm}
        />
      ) : null}
    </>
  )
}

export default React.forwardRef(SearchHeader)
