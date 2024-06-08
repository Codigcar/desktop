import React from 'react'
import Observer from '@researchgate/react-intersection-observer'

interface Props {
  children: (boolean) => React.ReactNode
  disabled?: boolean
  root?: string
  rootMargin?: string
  tag?: any
}

export default class ViewableMonitor extends React.Component<
  Props,
  { isIntersecting: boolean }
> {
  static defaultProps = {
    tag: 'div',
  }

  state = {
    isIntersecting: false,
  }

  handleChange = ({ isIntersecting }) => {
    this.setState({ isIntersecting })
  }

  render() {
    const { isIntersecting } = this.state
    const { tag: Tag, children, ...rest } = this.props
    return (
      <Observer
        {...rest}
        disabled={isIntersecting}
        onChange={this.handleChange}
      >
        <Tag>{children(isIntersecting)}</Tag>
      </Observer>
    )
  }
}
