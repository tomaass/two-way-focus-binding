import './App.css';
import logo from './logo.svg';
import React, { Component } from 'react';
import Input from './Input';
import Cursor from './Cursor'

let x = true;
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'foo',
      isFocused: false,
      start: 0,
      end: 0
    };
  }

  componentDidUpdate() {
    if (x && this.ref1) {
      x = false
      for (var p in this.ref1) {
        if (p.slice(0, 2) === 'on') {
          this.ref1.addEventListener(
            p.slice(2, p.length),
            event =>
              setTimeout(() => {
                this.setState({
                  start: event.target.selectionStart,
                  end: event.target.selectionEnd
                })

              }, 2)
              )}
            }
        }
      }

  onInput = (event) => {
    this.setState({ value: event.target.value });
  }

  onFocus = () => this.setState({isFocused: true})

  onBlur = () => this.setState({isFocused: false})

  render() {
    const { value, end, start } = this.state

    return (
      <div className="App">
        <div style={{border:'1px solid black'}}>
          <Input
            setRef={(ref) => { this.ref1 = ref; }}
            onInput={this.onInput}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            start={start}
            end={end}
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
            start={start}
            end={end}
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
