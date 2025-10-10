import React, { Component } from "react";
import data from "../data.json";

class Example1 extends Component {
  render() {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 hover:shadow-lg transition">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">🌐 Social Media</h2>

        <div className="flex flex-col gap-3">
          {data.SocialMedias.map((link, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:text-blue-700 font-medium underline"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

export default Example1;
