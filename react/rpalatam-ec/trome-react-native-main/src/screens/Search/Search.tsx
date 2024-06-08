import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import React, { useEffect, useRef } from 'react'

import SearchAdvanced from './SearchAdvanced'
import SearchHeader from './SearchHeader'
import CommonTemplate from './common/CommonTemplate'
import Box from '../../components/box'
import Typography from '../../components/typography'
import { useNotification } from '../../context/notification'
import { useSearchContext } from '../../context/search'
import useSearch from '../../hooks/useSearch'

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
  const { status, hasError } = useSearchContext()
  const { hasResults, handleSubmitSearch } = useSearch()

  const formRef = useRef<FormHandles>(null)

  const notification = useNotification()

  useEffect(() => {
    if (hasError && hasResults) {
      notification.show({
        message: 'Ocurrió un error inesperado',
        type: 'error',
      })
    }
  }, [hasError, hasResults, notification])

  return (
    <Box.View bg="background" flex={1}>
      <Form ref={formRef} onSubmit={handleSubmitSearch}>
        <SearchHeader ref={formRef} />
        {status === 'idle' ? <SearchAdvanced ref={formRef} /> : null}
      </Form>
      <Box.View flex={1}>
        {hasError && !hasResults ? (
          <TemplateMessage message="Ocurrió un error inesperado" />
        ) : null}
        <CommonTemplate />
      </Box.View>
    </Box.View>
  )
}

export default SearchScreen
