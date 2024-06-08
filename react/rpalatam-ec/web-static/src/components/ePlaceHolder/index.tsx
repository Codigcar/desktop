import classNames from 'classnames'
import React from 'react'

import Icon from '../../system/icon'
// import './EPlaceHolder.css';

interface Placeholder {
  className?: string
  repeat?: number
}

const CardMagazine = () => (
  <div className="placeholder-card">
    <div className="wrap-list__notice">
      <div className="wrap-list__notice-text">
        <div className="animated-background line mini-line mid-line" />
        <div className="animated-background line mini-line" />
        <div className="animated-background line mini-line" />
        <div className="animated-background line mini-line last-line" />
      </div>
      <div className="animated-background media wrap-list__notice-media" />
    </div>
    <div className="animated-background line mini-line sub-line" />
  </div>
)

export const CardMagazinePlaceHolder: React.FC<Placeholder> = ({
  repeat = 1,
}) => {
  const cards = Array.from({ length: repeat }, (_, index) => index)
  return (
    <div className="wrap-new-placeholder placeholder animate-inout">
      {cards.map(item => (
        <CardMagazine key={item} />
      ))}
    </div>
  )
}

export const CardInBox = () => (
  <div className="wrap-new-placeholder placeholder animate-inout">
    <div className="placeholder__card-box">
      <div className="animated-background media wrap-list__notice-media" />
      <div className="wrap-list__notice">
        <div className="wrap-list__notice-text">
          <div className="animated-background line mini-line" />
          <div className="animated-background line mini-line" />
          <div className="animated-background line mini-line last-line" />
        </div>
      </div>
      <footer className="animated-background mini-line sub-line" />
    </div>
  </div>
)

export const CardFullImage = () => {
  return (
    <div>
      <div className="animated-background media" />
      <div className="animated-background line" />
      <div className="animated-background line" />
      <div className="animated-background line mini-line mid-line" />
      <div className="background-space" />
    </div>
  )
}

export const CardFullPlaceHolder: React.FC<Placeholder> = ({
  className,
  repeat = 1,
}) => {
  const cards = Array.from({ length: repeat }, (_, index) => index)
  const classes = classNames('placeholder animate-inout', className)
  return (
    <div className={classes}>
      {cards.map(item => (
        <CardFullImage key={item} />
      ))}
    </div>
  )
}

export const LoadPage = () => (
  <div className="splash-screen">
    <Icon type="loading" style={{ fontSize: 24 }} />
  </div>
)
