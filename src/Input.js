import React, { Component } from 'react';
import Cursor from './Cursor';

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFocused: false
    }
  }

  onClick = () => {
    this.props.onFocus()
    this.setState({isFocused: true})
  }

  onBlur = () => {
    this.props.onBlur()
    this.setState({isFocused: false})
  }

  render() {
    const {
      setRef,
      onInput,
      onFocus,
      onBlur,
      value,
      focused,
    } = this.props;


    return this.state.isFocused
      ? (
        <input
          autoFocus
          ref={(ref) => {
            this.ref = ref;
            setRef(ref)
          }}
          onChange={onInput}
          onFocus={onFocus}
          onBlur={this.onBlur}
          value={value}
        />
      ) : (
        <div
          onClick={this.onClick}
        >
          mrdat
        </div>
      )
  }
}

export default Input;
