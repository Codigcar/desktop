import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Platform } from 'react-native'

import SearchAdvanced from './SearchAdvanced'
import SearchHeader from './SearchHeader'
import CommonTemplate from './common/CommonTemplate'
import Box from '../../components/box'
import Card, { CardPlaceholder } from '../../components/card'
import Typography from '../../components/typography'
import Paragraph from '../../components/typography/Paragraph'

import { useSearchContext } from '../../context/search'
import { Story } from '../../entities/Story'
import useOpenStory from '../../hooks/useOpenStory'
import useSearch from '../../hooks/useSearch'
import Content, { queryInclude } from '../../services/arc/Content'
import { getStoryFormated } from '../../services/arc/utils'
import mostReadService from '../../services/mostRead'
import type { AllProps } from '../../theme/index'

const formContainerStyles = Platform.select<AllProps>({
  android: {},
  default: { zIndex: 1 },
})

export const TemplateMessage: React.FC<{ message: string }> = React.memo(
  ({ message }) => (
    <Box.View pt="3" px="2">
      <Typography.Paragraph
        color="coolGray-700"
        fontSize="3xl"
        fontWeight="light"
        textAlign="center">
        {message}
      </Typography.Paragraph>
    </Box.View>
  ),
)

const SearchScreen: React.FC = () => {
  const { filters, status, hasError } = useSearchContext()
  const formRef = useRef<FormHandles>(null)
  const [mostReadList, setMostReadList] = useState<Story[]>([])
  const { hasResults, handleSubmitSearch } = useSearch()

  const newsServiceByIds = useMemo(() => {
    return Content.ids({
      params: { sourceInclude: queryInclude('cards').join() },
    })
  }, [])

  const fetchStoriesMostRead = useCallback(async () => {
    const lastTenMostRead = (await mostReadService.get('premium')).slice(0, 10)
    newsServiceByIds.get(lastTenMostRead).then((data) => {
      const formatedNoticeToStory = data.content_elements.map(getStoryFormated)
      setMostReadList(formatedNoticeToStory)
    })
  }, [newsServiceByIds])

  const openStory = useOpenStory('Buscador')

  const renderItem = useCallback(
    ({ item }: { item: Story }) => {
      return (
        <Card onPress={() => openStory(item)} story={item} variant="magazine" />
      )
    },
    [openStory],
  )

  useEffect(() => {
    fetchStoriesMostRead()
  }, [fetchStoriesMostRead])

  const isNotStatusDoneAndStarted = status !== 'done' && status !== 'started'
  const searchTerm = useMemo(() => filters.get('term'), [filters])

  return (
    <Box.View bg="background" flex={1}>
      <Box.View {...formContainerStyles}>
        <Form ref={formRef} onSubmit={handleSubmitSearch}>
          <SearchHeader ref={formRef} />
          {status === 'idle' && searchTerm ? (
            <SearchAdvanced ref={formRef} />
          ) : null}
        </Form>
      </Box.View>

      <Box.View flex={isNotStatusDoneAndStarted ? 0 : 1}>
        {hasError && !hasResults ? (
          <TemplateMessage message="Ocurrió un error inesperado" />
        ) : null}
        <CommonTemplate />
      </Box.View>

      {isNotStatusDoneAndStarted && mostReadList.length > 0 ? (
        <Box.ScrollView flex={1} scrollIndicatorInsets={{ right: 1 }}>
          <Box.View
            justifyContent="center"
            marginStart="1"
            marginTop="2"
            marginBottom="0.5">
            <Paragraph fontSize="xxs" color="badgeFont" fontWeight="black">
              LO MÁS VISTO - PLUS G
            </Paragraph>
          </Box.View>

          {mostReadList.map((item, index) => {
            const lastStory = mostReadList.length - 1 === index
            return (
              <Box.View key={item.id}>
                {renderItem({ item })}
                {!lastStory ? (
                  <Box.View px="1">
                    <Box.View height={1} bg="separator" />
                  </Box.View>
                ) : null}
              </Box.View>
            )
          })}

          <Box.SafeAreaView edges={['bottom']} />
        </Box.ScrollView>
      ) : null}

      {mostReadList.length === 0 && status !== 'done' && !hasError ? (
        <Box.View testID="load-most-read" flex={1} px="0.75">
          <CardPlaceholder repeat={8} variant="magazine" />
        </Box.View>
      ) : null}
    </Box.View>
  )
}

export default SearchScreen
