import React, { PureComponent } from 'react'

import HeaderView from './view'

class Header extends PureComponent {
  render() {
    return <HeaderView {...this.props} />
  }
}

export default Header
