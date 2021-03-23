import {Component} from 'react'


class Header extends Component {

  render() {
    return(
      <div >
        <h3>Graphical Search</h3>
          <h5>Draw an "X" or an "O" with your mouse, and I will try to guess which one you drew:</h5>
          <h6>Note: the first use will take around 10 seconds</h6>
      </div>
    )
  }
}

export default Header