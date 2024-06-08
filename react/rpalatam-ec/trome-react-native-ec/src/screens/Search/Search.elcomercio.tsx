import { useNavigation, useRoute } from '@react-navigation/native'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Platform } from 'react-native'

import SearchHeader from './SearchHeader.elcomercio'
import Box from '../../components/box'
import Card from '../../components/card'
import Ribbon from '../../components/ribbon'
import Typography from '../../components/typography'
import {
  BottomSheetCustomModal,
  BottomSheetModalProvider,
} from '../../containers/bottomSheet'
import InfiniteScrollList, {
  ItemAdvertising,
} from '../../containers/infiniteScrollList'
import { useAuth } from '../../context/auth'
import { useSearchContext } from '../../context/search'
import { useThemeContext } from '../../context/theme'
import { Advertising } from '../../entities/Advertising'
import useOpenStory from '../../hooks/useOpenStory'
import { useSearch } from '../../hooks/useSearch'
import { getAdNewsListConfig } from '../../utils/advertising'
import { insertIntoArray } from '../../utils/tools'
import type { Story } from '../../entities/Story'
import type { MainStackScreenProps } from '../../routes/types'

const { View, KeyboardAvoidingView } = Box
const { Paragraph, Title } = Typography

const TemplateMessage: React.FC<{ message: string }> = React.memo(
  ({ message }) => {
    const { currentTheme } = useThemeContext()
    const resultNotfoundColor = currentTheme === 'light' ? 'secondary' : 'white'
    return (
      <View pt="3" px="0.75">
        <Title color={resultNotfoundColor} fontSize="3xl" textAlign="center">
          Lo sentimos, pero no hemos encontrado ningún resultado para “{message}
          ”
        </Title>
      </View>
    )
  },
)

const CommonMessageError: React.FC = () => {
  const { currentTheme } = useThemeContext()
  const errorMessageColor = currentTheme === 'light' ? 'secondary' : 'danger'
  return (
    <View height={290} px="1.5" zIndex={5}>
      <View mt="1.5" mb="0.75">
        <Paragraph fontSize="6xl" color={errorMessageColor} textAlign="center">
          :(
        </Paragraph>
      </View>
      <Paragraph fontSize="xl" color={errorMessageColor} textAlign="center">
        En este momento no podemos procesar esta información.{'\n'}
        Vuelva a intentar en algunos segundos
      </Paragraph>
    </View>
  )
}

const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : 'height'

const Search: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const adConfig = useRef(getAdNewsListConfig())
  const { isSubscribed } = useAuth()
  const { results, status, page, hasError, hasMore } = useSearchContext()
  const { handleLoadMore, searchTerm, submitSearch, radioGroupRef } =
    useSearch()

  const resultsWithAds = useMemo(() => {
    const { free, premium } = adConfig.current
    const adSlots = isSubscribed ? premium : free
    return insertIntoArray<Story, Advertising>(results, adSlots)
  }, [results, isSubscribed])

  const openStory = useOpenStory('Buscador')

  const renderItem = useCallback(
    ({ item }: { item: Story | Advertising }) => {
      if (item instanceof Advertising) return <ItemAdvertising item={item} />
      return (
        <Card onPress={() => openStory(item)} story={item} variant="magazine" />
      )
    },
    [openStory],
  )

  const listIsNotEmpty = !searchTerm || hasError || status !== 'done'
  const data = status === 'done' ? resultsWithAds : []

  return (
    <KeyboardAvoidingView behavior={keyboardBehavior} flex={1}>
      <InfiniteScrollList
        testID="search-results"
        initialPage={page}
        ListHeaderComponent={
          <Form ref={formRef} onSubmit={submitSearch}>
            <SearchHeader ref={formRef} radioRef={radioGroupRef} />
          </Form>
        }
        data={data}
        keyExtractor={(item) => item.id}
        loadMore={handleLoadMore}
        hasMore={results.length < 50 && !!hasMore}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <Box.View px="1">
            <Box.View height={1} bg="separator" />
          </Box.View>
        )}
        ListEmptyComponent={() => {
          if (listIsNotEmpty) return null
          return <TemplateMessage message={searchTerm} />
        }}
      />
    </KeyboardAvoidingView>
  )
}

const SearchScreen: React.FC = () => {
  const { setParams } =
    useNavigation<MainStackScreenProps<'Search'>['navigation']>()
  const { params } = useRoute<MainStackScreenProps<'Search'>['route']>()
  const modalErrorRef = useRef<BottomSheetCustomModal>(null)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { status, hasError, restoreSearch } = useSearchContext()

  const [restoring, setRestoring] = useState<boolean>(
    !params?.preserve && status === 'done',
  )

  useEffect(() => {
    setParams({ preserve: true })
  }, [setParams])

  useEffect(() => {
    if (restoring) {
      restoreSearch()
      setRestoring(false)
    }
  }, [restoreSearch, restoring])

  useEffect(() => {
    if (hasError) {
      modalErrorRef.current?.present()
      timeout.current = setTimeout(() => {
        modalErrorRef.current?.close()
      }, 5000)
    }
  }, [hasError])

  const idleStatus = status === 'idle'
  const isLoading = restoring || status === 'started'

  return (
    <BottomSheetModalProvider>
      <View bg={!idleStatus ? 'background.2' : 'background.3'} flex={1}>
        <Ribbon title="Buscar" loading={isLoading} />
        {restoring ? null : <Search />}
        <BottomSheetCustomModal
          enableContentPanningGesture={false}
          onDismiss={() => {
            if (timeout.current) clearTimeout(timeout.current)
          }}
          ref={modalErrorRef}
          snapPoints={[303]}>
          <CommonMessageError />
        </BottomSheetCustomModal>
      </View>
    </BottomSheetModalProvider>
  )
}

export default SearchScreen
