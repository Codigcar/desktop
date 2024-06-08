import { useTheme } from '@shopify/restyle'
import { FormHandles } from '@unform/core'
import React, { useCallback, useMemo, useState } from 'react'
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { timeFrames } from './utils'
import Button from '../../components/Button'
import { FormItem } from '../../components/Form'
import Box from '../../components/box'
import { DateInput, SelectInput } from '../../components/input'
import Typography from '../../components/typography'
import { useMainNavigation } from '../../context/navigation'
import { Theme } from '../../theme'
import type { PickerOption } from '../../components/picker'

const today = new Date()

const SearchAdvanced: React.ForwardRefRenderFunction<FormHandles> = (
  _,
  ref,
) => {
  const { colors } = useTheme<Theme>()
  const { categories } = useMainNavigation()

  const formRef = ref as React.RefObject<FormHandles>

  const [collapsedAdvancedSearch, setCollapsedAdvancedSearch] = useState(true)
  const [collapsedCustomDates, setCollapsedCustomDates] = useState(true)

  const sectionOptions: PickerOption[] = useMemo(() => {
    type Category = typeof categories[0]
    const blacklist = ['portada', 'ultimo', 'plusg']
    // Remove categories from blacklist
    const clean = (category: Category) => !blacklist.includes(category.key)
    // Transform to an Option for the Select component
    const transform = (category: Category) => ({
      label: category.label,
      value: category.path.replace(/\//g, '').replace('category', ''),
      testID: `${category.label}-option`,
    })
    return [
      { label: 'Todas las categorías', value: '' },
      ...categories.filter(clean).map(transform),
    ]
  }, [categories])

  const toogleCollapsedAdvancedSearch = useCallback(() => {
    setCollapsedAdvancedSearch((collapsed) => !collapsed)
  }, [])

  const handleChangeDateFrom = useCallback(
    (date: Date) => {
      const dateTo = formRef.current?.getFieldValue('dateTo')
      if (date > dateTo) formRef.current?.setFieldValue('dateTo', date)
    },
    [formRef],
  )

  const handleChangeDateTo = useCallback(
    (date: Date) => {
      const dateFrom = formRef.current?.getFieldValue('dateFrom')
      if (date < dateFrom) formRef.current?.setFieldValue('dateFrom', date)
    },
    [formRef],
  )

  const handleSubmit = () => {
    Keyboard.dismiss()
    formRef.current?.submitForm()
  }

  return (
    <Box.View px="0.75" pt="0.25">
      <Box.View mb="1" borderColor="separator" borderBottomWidth={1}>
        <TouchableWithoutFeedback
          testID="collapse-button"
          onPress={toogleCollapsedAdvancedSearch}>
          <Box.View
            py={Platform.OS === 'ios' ? '0.75' : '0.5'}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between">
            <Typography.Paragraph color="coolGray-800">
              Búsqueda avanzada
            </Typography.Paragraph>
            <Icon
              name={collapsedAdvancedSearch ? 'chevron-down' : 'chevron-up'}
              size={22}
              color={colors['coolGray-500']}
            />
          </Box.View>
        </TouchableWithoutFeedback>
      </Box.View>
      {collapsedAdvancedSearch ? null : (
        <Box.View testID="search-advanced-options">
          <FormItem label="Categoria">
            <SelectInput
              name="section"
              defaultValue=""
              options={sectionOptions}
            />
          </FormItem>
          <FormItem label="Fecha">
            <SelectInput
              testID="select-search-date"
              name="searchDate"
              defaultValue=""
              onValueChange={(value) => {
                setCollapsedCustomDates(value !== 'custom')
              }}
              options={timeFrames}
            />
          </FormItem>
          {collapsedCustomDates ? null : (
            <Box.View
              testID="search-advanced-dates"
              flexDirection="row"
              justifyContent="space-between">
              <Box.View flex={1}>
                <FormItem label="Desde">
                  <DateInput
                    testID="date-input-from"
                    name="dateFrom"
                    maximumDate={today}
                    onChangeDate={handleChangeDateFrom}
                  />
                </FormItem>
              </Box.View>
              <Box.View width={16} />
              <Box.View flex={1}>
                <FormItem label="Hasta">
                  <DateInput
                    testID="date-input-to"
                    name="dateTo"
                    maximumDate={today}
                    onChangeDate={handleChangeDateTo}
                  />
                </FormItem>
              </Box.View>
            </Box.View>
          )}
        </Box.View>
      )}
      <Box.View>
        <Button
          title="Buscar"
          type="primary"
          onPress={handleSubmit}
          testID="submit-search-button"
        />
      </Box.View>
    </Box.View>
  )
}

export default React.forwardRef(SearchAdvanced)
