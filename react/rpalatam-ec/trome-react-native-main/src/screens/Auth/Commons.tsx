import React from 'react'

import Typography from '../../components/typography'
import { LEGAL_URLS } from '../../utils/constants'

const { Link, Paragraph } = Typography

export const DataPrivacy: React.FC = () => (
  <Paragraph color="coolGray-500" fontSize="sm">
    Al registrarme autorizo el uso de mis datos para{' '}
    <Link fontSize="sm" fontWeight="semibold" to={LEGAL_URLS.data}>
      fines adicionales
    </Link>
  </Paragraph>
)

export const TermsAndConditions: React.FC = () => (
  <Paragraph color="coolGray-500" fontSize="sm">
    Al crear la cuenta acepto los{' '}
    <Link to={LEGAL_URLS.terms} fontSize="sm" fontWeight="semibold">
      Términos y Condiciones
    </Link>{' '}
    y las{' '}
    <Link to={LEGAL_URLS.policies} fontSize="sm" fontWeight="semibold">
      Políticas de Privacidad
    </Link>
  </Paragraph>
)
