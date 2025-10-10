import React, { Component } from "react";
import data from "../data.json";

class Example2 extends Component {
  render() {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 hover:shadow-lg transition">
        <h2 className="text-xl font-semibold mb-4 text-green-600">🧰 Skills</h2>

        {data.Skills.map((skillArea, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-bold text-green-700 mb-3">
              {skillArea.Area}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skillArea.SkillSet.map((skill, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between border px-3 py-2 rounded-lg text-sm ${
                    skill.Hot
                      ? "bg-green-100 border-green-300 text-green-700 font-semibold"
                      : "bg-gray-50 border-gray-200 text-gray-700"
                  }`}
                >
                  <span>{skill.Name}</span>
                  {skill.Hot && (
                    <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">
                      HOT
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Example2;
