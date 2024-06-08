import React, { useRef, useState } from 'react'
import Slider from 'rc-slider'
import './FontSizeModal.css'

import Config from '../../config/web-config'
import Icon from '../../system/icon'
import IconWrapper from '../../system/icon/icon-wrapper'
import Modal from '../../system/modal'
import { WEB_PROJECT_EC_APP } from '../../tools/flags'

enum FontSize {
  s = 1,
  m = 2,
  l = 3,
  xl = 4,
  xxl = 5,
}

const FontSizeModal: React.FC = () => {
  const [sliderFontSize, setSliderFontSize] = useState<boolean>(false)
  const sliderValue = useRef(Config.get('fontSize') || FontSize.l)

  const changeFontSize = (size: number) => {
    const fontSizes = ['s', 'm', 'l', 'xl', 'xxl']
    const index = fontSizes.findIndex(n => n === Config.get('fontSize'))
    let newIndex = index + size
    if (newIndex >= 0 && newIndex < fontSizes.length) {
      Config.set('fontSize', fontSizes[newIndex])
    }
    sliderValue.current = fontSizes[newIndex]
  }

  const showModalFontSize = () => {
    Modal.open({
      content: () => (
        <div className="is-modal">
          <div className="is-modal__content">
            <div className="wrapper__userConfig">
              <div className="wrapper__fontSize">
                <h3>Tamaño de texto</h3>
                <div className="wrapper__fontSize-change">
                  <button onClick={() => changeFontSize(-1)}>T</button>
                  <hr />
                  <button onClick={() => changeFontSize(+1)}>T</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      myClass: 'is-modal-bottom is-modal__userConfig',
      animation: 'bottomFade',
    })
  }

  const showSliderFontSize = () => {
    return (
      <React.Fragment>
        <div className="sliderFontSize__pointer" />
        <div className="sliderFontSize__window">
          <Icon
            type="format-letter"
            view="0 0 11 12"
            style={{ fontSize: 12 }}
          />
          <div className="sliderFontSize__rc-slider">
            <Slider
              defaultValue={FontSize[sliderValue.current]}
              max={5}
              min={1}
              step={1}
              onChange={nextValue => {
                const newValue =
                  nextValue - Number(FontSize[sliderValue.current])
                changeFontSize(newValue)
              }}
            />
          </div>
          <IconWrapper size="medium">
            <Icon
              type="format-letter"
              view="0 0 11 12"
              style={{ paddingBottom: 8 }}
            />
          </IconWrapper>
        </div>
      </React.Fragment>
    )
  }

  if (WEB_PROJECT_EC_APP) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setSliderFontSize(current => !current)}
        >
          <IconWrapper size="medium">
            <Icon type="ec-share" view="0 0 1420 896" />
          </IconWrapper>
        </button>

        {sliderFontSize ? showSliderFontSize() : null}
      </div>
    )
  }

  return (
    <button type="button" onClick={showModalFontSize}>
      <IconWrapper size="medium">
        <Icon type="md-format_size" style={{ fontSize: 20 }} />
      </IconWrapper>
    </button>
  )
}

export default FontSizeModal
