import React from 'react'
import './eList.css'

interface Props {
  className?: string
  component: any
  data: { nid: string }[]
  ckey: string
}

export default class EList extends React.Component<Props> {
  static defaultProps = {
    className: '',
    data: [],
  }
  el: any

  componentDidMount() {
    this.build()
  }

  addClassList(classname) {
    this.el.classList.add(classname)
  }

  removeClassList(classname) {
    this.el.classList.remove(classname)
  }

  build() {
    const { data, component, ckey } = this.props
    return data.map(item => {
      const _component =
        typeof component === 'function' ? component(item) : component
      return React.cloneElement(_component, {
        key: ckey.concat('-', item.nid),
      })
    })
  }

  render() {
    return (
      <div
        className={`e-list ${this.props.className}`}
        ref={ref => (this.el = ref)}
      >
        {this.build()}
      </div>
    )
  }
}
