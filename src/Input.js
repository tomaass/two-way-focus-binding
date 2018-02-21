import React, { Component } from 'react';
import Cursor from './Cursor';
let widths = new Map();

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFocused: false,
      offsetLeft: null
    }
  }

  componentWillReceiveProps({ value }) {
    this.updateOffsetLeft()
    if (this.props.value !== value) {
      widths = new Map()
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
  updateOffsetLeft = () => this.overallRef &&
    this.setState({ offsetLeft: this.overallRef.offsetLeft })

  render() {
    const {
      setRef,
      onInput,
      onFocus,
      onBlur,
      value,
      focused,
      start,
      end
    } = this.props;

    const text = value
      .split('')
      .map((ch, i) =>
        <span
          key={ch + i}
          ref={ref => {
            if(ref) { widths.set(i, ref.offsetWidth); }
          }}
        >
          {ch}
        </span>
      )


    return this.state.isFocused
      ? (
        <input
          autoFocus
          ref={(ref) => {
            this.ref = ref;
            setRef(ref)
          }}
          style={{
            font: 'inherit',
            width: '173px',
          }}
          onChange={onInput}
          onFocus={onFocus}
          onBlur={this.onBlur}
          value={value}
        />
      ) : (
        <div
          style={{
            outlineColor: '#4D90FE',
            outlineOffset: '-2px',
            outlineStyle: 'auto',
            outlineWidth: '5px',
            width: '173px',
            margin: '0 auto',
            textAlign: focused && 'left',
          }}
          onClick={this.onClick}
        >
          {
            (start === end)
              ? <span ref={ref => {if (ref) { this.overallRef = ref }}}>
                  <span>{text.slice(0, start)}</span>
                  <span>
                    {focused && <Cursor
                      left={this.state.offsetLeft || 0}
                      offsetLeft={text
                        .slice(0, start)
                        .reduce((a, _, i) => a + widths.get(i), (0)) || 0}
                    />}
                  </span>
                  <span>{text.slice(start, text.length)}</span>
                </span>
              : <span>
                  <span>{value.slice(0, start)}</span>
                  <span style={{ backgroundColor: '#6666D1', color: 'white'}}>{value.slice(start, end)}</span>
                  <span>{value.slice(end, value.length)}</span>
                </span>
          }
        </div>
      )
  }
}

export default Input;
