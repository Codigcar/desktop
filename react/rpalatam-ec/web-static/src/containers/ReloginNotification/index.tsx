import React, { useContext } from 'react'

import { AppContext } from '../../context/app'
import NativeAPI from '../../tools/nativeApi'
import { getBrand, pianoIdAvailable } from '../../tools/tools'
import './index.css'

const BRAND = getBrand()
const PIANO_ID_AVAILABLE = pianoIdAvailable()

const userStorage = localStorage.getItem('ArcId.USER_PROFILE') || '{}'
const user = JSON.parse(userStorage)

const ReloginNotification = () => {
  const { profile } = useContext(AppContext)

  if (BRAND !== 'elcomercio') return null
  if (!user?.email || !PIANO_ID_AVAILABLE) return null
  if (profile?.email && PIANO_ID_AVAILABLE) return null

  return (
    <div className="notification-relogin text-sm">
      <p className="text">{`Por favor vuelve a iniciar sesión con tu correo  ${user.email}`}</p>
      <button
        onClick={() => NativeAPI.navigate('Auth', { screen: 'InitialScreen' })}
      >
        Iniciar sesión
      </button>
    </div>
  )
}

export default ReloginNotification
