import React, { useCallback, useRef } from 'react'
import { Button, StyleSheet, TouchableOpacity } from 'react-native'

import Recaptcha, { RecaptchaRef } from 'react-native-recaptcha-that-works'
import { Paragraph } from '../typhografic'
import View from '../box/View'
import { IconCheck, IconRecaptcha } from '../../assets/icons'

type Props = {
  isChecked: boolean
  onVerify: (token: string) => void
}
const RecaptchaV22: React.FC<Props> = ({ isChecked, onVerify }) => {
  const $recaptcha = useRef<RecaptchaRef | null>(null)

  const handleOpenPress = useCallback(() => {
    $recaptcha.current?.open()
  }, [])

  const handleClosePress = useCallback(() => {
    $recaptcha.current?.close()
  }, [])

  return (
    <View justifyContent="center" flexDirection="row">
      <TouchableOpacity onPress={handleOpenPress}>
        <View
          width={265}
          height={66}
          bg="trueGray-800"
          borderColor="trueGray-300"
          borderWidth={1}
          borderRadius="sm"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-around">
          <View
            width={24}
            height={24}
            borderWidth={1}
            borderRadius="sm"
            borderColor="trueGray-300"
            justifyContent="center"
            alignItems="center">
            {isChecked ? <IconCheck /> : null}
          </View>
          <Paragraph textAlign="left" fontWeight="500" color="black">
            No soy un robot
          </Paragraph>
          <IconRecaptcha />
        </View>
      </TouchableOpacity>
      <Recaptcha
        ref={$recaptcha}
        lang="es-419"
        headerComponent={
          <Button title="Close modal" onPress={handleClosePress} />
        }
        footerComponent={<Paragraph>Footer here</Paragraph>}
        siteKey="6LfRdncpAAAAAPgz0S4JqFxzd7n7X54wW1QVSCR_"
        baseUrl="http://127.0.0.1"
        size="normal"
        theme="dark"
        // onLoad={() => Alert.alert('onLoad event')}
        // onClose={() => Alert.alert('onClose event')}
        onError={(err) => {
          console.warn(err)
        }}
        // onExpire={() => Alert.alert('onExpire event')}
        onVerify={onVerify}
        enterprise={false}
        hideBadge={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})

export default RecaptchaV22
