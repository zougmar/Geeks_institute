import React, { Component } from "react";
import countries from "./countries";

export default class AutoCompletedText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: ""
    };
  }

  onTextChanged = (e) => {
    const value = e.target.value;
    let suggestions = [];

    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = countries.sort().filter((v) => regex.test(v));
    }

    this.setState(() => ({ suggestions, text: value }));
  };

  suggestionSelected(value) {
    this.setState(() => ({
      text: value,
      suggestions: []
    }));
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) return null;

    return (
      <ul className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-xl shadow-xl mt-3 max-h-60 overflow-y-auto">
        {suggestions.map((item, index) => (
          <li
            key={index}
            onClick={() => this.suggestionSelected(item)}
            className="px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-all duration-150"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { text } = this.state;

    return (
      <div className="w-full sm:w-96 bg-white/30 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          🌍 Country Search
        </h2>

        <div className="relative">
          <input
            value={text}
            onChange={this.onTextChanged}
            type="text"
            placeholder="Type to search a country..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          {this.renderSuggestions()}
        </div>

        <p className="text-gray-500 text-sm mt-4 text-center">
          Start typing and select a country from the list.
        </p>
      </div>
    );
  }
}
