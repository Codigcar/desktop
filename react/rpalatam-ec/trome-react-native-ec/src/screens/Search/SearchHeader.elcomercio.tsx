import { useTheme } from '@shopify/restyle'
import { FormHandles } from '@unform/core'
import React, { useState } from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'

import IconClose from '../../assets/icons/elcomercio/close.svg'
import IconSearch from '../../assets/icons/elcomercio/search.svg'
import Button from '../../components/Button'
import Box from '../../components/box'
import { SelectInput } from '../../components/input'
import InputBase from '../../components/input/Base'
import * as styles from '../../components/input/styles'
import Radio from '../../components/radio'
import Typography from '../../components/typography'
import { useSearchContext } from '../../context/search'
import type { Theme } from '../../theme'

const { View } = Box
const { Paragraph } = Typography

const sectionOptions: { label: string; value: string }[] = [
  { label: 'Sección', value: '' },
  { label: 'Videos', value: 'videos' },
  { label: 'Política', value: 'politica' },
  { label: 'Economía', value: 'economia' },
  { label: 'DT', value: 'deporte-total' },
  { label: 'Perú', value: 'peru' },
  { label: 'Mundo', value: 'mundo' },
  { label: 'Luces', value: 'luces' },
  { label: 'Fotogalerías', value: 'fotogalerias' },
]

const SearchHeader: React.ForwardRefRenderFunction<
  FormHandles,
  {
    radioRef: React.MutableRefObject<string | undefined>
  }
> = ({ radioRef }, ref) => {
  const { filters, status } = useSearchContext()
  const inputDefaultValue = filters.get('term') || ''
  const { colors } = useTheme<Theme>()
  const formRef = ref as React.RefObject<FormHandles>

  const [searchField, setSearchField] = useState<string>(inputDefaultValue)

  const inputIsEmpty = searchField.trim() === ''
  const selectDefaultValue = filters.get('section') || ''
  const radioDefaultValue = filters.get('order') || 'data_recent'
  const idleStatus = status === 'idle'

  return (
    <View
      px="1.5"
      pt="3"
      pb="2"
      bg="background.3"
      borderBottomColor="secondary"
      borderBottomWidth={!idleStatus ? 1 : 0}>
      <View
        borderRadius="sm"
        alignItems="center"
        flexDirection="row"
        borderWidth={1}
        borderColor="secondary"
        paddingLeft="0.5"
        paddingRight="0.75">
        <InputBase
          name="term"
          SuffixComponent={() =>
            inputIsEmpty ? (
              <View width={18} height={17}>
                <IconSearch fill={colors.secondary} />
              </View>
            ) : (
              <TouchableWithoutFeedback
                hitSlop={{
                  top: 4,
                  left: 4,
                  right: 4,
                  bottom: 4,
                }}
                onPress={() => {
                  setSearchField('')
                }}
                testID="icon-close">
                <View width={14} height={14}>
                  <IconClose fill={colors.secondary} />
                </View>
              </TouchableWithoutFeedback>
            )
          }
          defaultValue={filters.get('term')}
          value={searchField}
          autoCapitalize="none"
          autoFocus
          enablesReturnKeyAutomatically
          onChangeText={setSearchField}
          returnKeyType="search"
          onSubmitEditing={() => {
            if (!inputIsEmpty) {
              formRef.current?.submitForm()
            }
          }}
          accessibilityLabel="buscar"
          style={[styles.field.input, { color: colors['text.3'] }]}
        />
      </View>
      <View height={16} />
      <SelectInput
        labelContainerStyle={{
          borderColor: colors.secondary,
        }}
        selectedValue={selectDefaultValue}
        name="section"
        options={sectionOptions}
      />

      <Radio.Group
        defaultValue={radioDefaultValue}
        onChangeValue={(value) => {
          radioRef.current = value
        }}>
        <View mt="1.5" mb="2" flex={1} flexDirection="row">
          <Radio
            value="data_recent"
            color={colors.secondary}
            style={style.radio}>
            <Paragraph fontSize="sm" color="secondary">
              Más recientes
            </Paragraph>
          </Radio>
          <Radio
            value="data_leastRecent"
            color={colors.secondary}
            style={style.radio}>
            <Paragraph fontSize="sm" color="secondary">
              Menos recientes
            </Paragraph>
          </Radio>
        </View>
      </Radio.Group>

      <Button
        disabled={status === 'started' || inputIsEmpty}
        title="Buscar"
        testID="btn-buscar"
        size="small"
        type="secondary"
        onPress={() => {
          formRef.current?.submitForm()
        }}
      />
    </View>
  )
}
const style = StyleSheet.create({
  radio: {
    borderColor: '#B39004',
    width: 16,
    height: 16,
    borderWidth: 1,
  },
})

export default React.forwardRef(SearchHeader)
