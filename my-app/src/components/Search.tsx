import React, {Component} from "react";
import type { ChangeEvent } from "react";

interface Props {
  onSearch: (pocemonName: string) => void
}

interface State {
  inputValue: string;
}

export class Search extends Component<Props, State> {
  state: State = {inputValue: ''}

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  this.setState({ inputValue: e.target.value });
  }
  handleClick = () => {
    this.props.onSearch(this.state.inputValue.trim().toLowerCase());
  };

  render() {
    return (
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleChange}
          placeholder="Введите имя покемона"
          style={{ padding: '0.5rem', width: 200 }}
        />
        <button onClick={this.handleClick} style={{ marginLeft: 10, padding: '0.5rem 1rem' }}>
          Поиск
        </button>
      </div>
    );
  }
}
