import {
    color,
    composeRestyleFunctions,
    createRestyleFunction,
    opacity,
    textShadow,
    typography,
    visible,
  } from '@shopify/restyle'
  
  const fontFamily = createRestyleFunction({
    property: 'fontFamily',
    themeKey: 'fontFamily',
  })
  const fontSize = createRestyleFunction({
    property: 'fontSize',
    themeKey: 'fontSize',
  })
  const fontWeight = createRestyleFunction({
    property: 'fontWeight',
    themeKey: 'fontWeight',
  })
  const letterSpacing = createRestyleFunction({
    property: 'letterSpacing',
    themeKey: 'letterSpacing',
  })
  const lineHeight = createRestyleFunction({
    property: 'lineHeight',
    themeKey: 'lineHeight',
  })
  
  export const text = composeRestyleFunctions([
    typography,
    color,
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight,
    opacity,
    textShadow,
    visible,
  ])
  