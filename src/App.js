import './App.css';
import logo from './logo.svg';
import React, { Component } from 'react';
import Input from './Input';
import Cursor from './Cursor'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'foo',
      isFocused: false,
      cursorPosition: 0,
    };
  }

  componentDidMount() {
    for (var property in this.ref1) {
      if (property.slice(0, 2) === 'on') {
        this.ref1.addEventListener(
          property.slice(2, property.length),
          (event) => {
            if (event.target && event.target.selectionStart) {
              console.log('start', event.target.selectionStart);
            }
            if (event.target && event.target.selectionEnd) {
              console.log('end', event.target.selectionEnd);
            }
          }
        )
      }
    }
  }

  onInput = (event) => {
    this.setState({ value: event.target.value });
  }

  onFocus = () => this.setState({isFocused: true})

  onBlur = () => this.setState({isFocused: false})

  render() {
    const { value } = this.state

    return (
      <div className="App">
        <div style={{border:'1px solid black'}}>
          <Input
            setRef={(ref) => { this.ref1 = ref; }}
            onInput={this.onInput}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            value={value}
            focused={this.state.isFocused}
          />
        </div>
        <div style={{border:'1px solid black'}}>
          <Input
            setRef={(ref) => { this.ref2 = ref; }}
            onInput={this.onInput}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            value={value}
            focused={this.state.isFocused}
          />
        </div>
        <p>FOCUSED: {this.state.isFocused.toString()}</p>
      </div>
    );
  }
}

export default App;
