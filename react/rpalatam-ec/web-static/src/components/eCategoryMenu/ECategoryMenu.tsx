/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Link } from 'react-router-dom'
// import './ECategoryMenu.css';

interface Props {
  categories: { key: string; path: string; label: string }[]
  index: number
  name: string
}

interface State {
  index: number
}

export default class ECategoryMenu extends React.PureComponent<Props, State> {
  x: number
  ease: (t: any, b: any, c: any, d: any) => any
  indicatorTime: number
  _onSelectCategory?: (e: any) => void
  _moved?: boolean
  listMenu: any
  _onMove?: (e: any) => void
  bounceid?: NodeJS.Timeout
  _resizeTimeId?: any
  listItem: any
  indicator: any
  brand: string

  constructor(props) {
    super(props)
    this.state = {
      index: props.index || 0,
    }
    this.x = 0
    this.ease = function ease(t, b, c, d) {
      t /= d / 2
      if (t < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b
      t--
      return (c / 2) * (-Math.pow(2, -10 * t) + 2) + b
    }
    this.indicatorTime = 600
    this.brand = props.name
  }

  componentDidMount() {
    this._onSelectCategory = e => {
      if (this._moved === true) {
        this._moved = false
        return
      }
      if (e.target.tagName === 'SPAN') {
        if (
          this.state.index ===
          Number(e.target.parentElement.parentElement.dataset.index)
        ) {
          const listActive = document.querySelector('.wrapper-newlist-active')
          if (listActive && listActive.scrollTop > 10) {
            listActive.scroll({ top: 0, left: 0, behavior: 'smooth' })
          }
        }
        // this.props.onChange(1 * e.target.parentElement.dataset.index);
      }
    }

    this._onMove = e => {
      this._moved = true
    }

    this.listMenu.addEventListener('touchmove', this._onMove, {
      passive: true,
    })
    this.listMenu.addEventListener('touchend', this._onSelectCategory, {
      passive: true,
    })

    this.bounceid = setTimeout(() => {
      this.moveToIndex(this.state.index)
      this.indicatorTime = 0
    }, this.indicatorTime)

    window.addEventListener('resize', this, false)
    /*this.listMenu.addEventListener('scroll', () => {
      clearTimeout(this.bounceid);
      this.bounceid = setTimeout(() => {
        this._updateIndicatorPosition();
      }, 50)
    }, false)*/
  }

  handleEvent(event) {
    if (event.type === 'resize') {
      clearTimeout(this._resizeTimeId)
      this._resizeTimeId = setTimeout(() => {
        this._resize()
      }, 25)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      index: nextProps.index,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    this.moveToIndex(this.state.index)
  }

  componentWillUnmount() {
    this.listMenu.removeEventListener('touchend', this._onSelectCategory, false)
    this.listMenu.removeEventListener('touchmove', this._onMove, false)
    window.removeEventListener('resize', this, false)
  }

  moveToIndex(index) {
    if (this.listItem) {
      this.listItem.classList.remove('active')
    }
    if (this.listMenu && this.listMenu.children) {
      this.listItem = this.listMenu.children[index]
    }

    if (this.listMenu) {
      this.listMenu.parentNode.scroll({
        left:
          this.listMenu.parentNode.scrollLeft +
          this.listItem.getBoundingClientRect().left +
          -window.innerWidth / 2 +
          this.listItem.offsetWidth / 2,
        behavior: 'smooth',
      })

      this._updateIndicatorPosition()

      this.listItem.classList.add('active')
    }
  }

  _resize() {
    this._updateIndicatorPosition()
  }

  _updateIndicatorPosition() {
    if (this.listItem) {
      const { width, left } = this.listItem.getBoundingClientRect()

      const rectWidthTrome = 32

      const configRect = {
        rectWidth: width,
        rectLeft: this.listMenu.parentNode.scrollLeft + left,
      }

      if (this.brand === 'trome') {
        configRect.rectWidth = rectWidthTrome
        configRect.rectLeft += (width - rectWidthTrome) / 2
      }

      //this._doTranslate()
      if (this.state.index === 0) {
        this.indicator.classList.add('indicator-accent')
      } else {
        this.indicator.classList.remove('indicator-accent')
      }

      this.indicator.style.width = configRect.rectWidth + 'px'
      this.indicator.style.transform = `translate3d(${configRect.rectLeft}px,0,0)`
    }
  }

  render() {
    const { categories } = this.props
    return (
      <div className="categories-menu">
        <ul
          className="categories-menu-inner"
          ref={ref => (this.listMenu = ref)}
        >
          {categories.map((category, index) => (
            <li
              className="categories-menu-item"
              data-index={index}
              key={category.key}
            >
              <Link to={category.path}>
                <span>{category.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div
          ref={ref => (this.indicator = ref)}
          className="categories-menu-indicator"
        />
      </div>
    )
  }
}
