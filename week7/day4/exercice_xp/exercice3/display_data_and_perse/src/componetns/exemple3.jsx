import React, { Component } from "react";
import data from "../data.json";

class Example3 extends Component {
  render() {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h2 className="text-xl font-semibold mb-4 text-purple-600">💼 Experiences</h2>

        <div className="flex flex-col gap-5">
          {data.Experiences.map((exp, index) => (
            <div
              key={index}
              className="border border-purple-200 bg-purple-50 p-4 rounded-xl"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={exp.logo}
                  alt={exp.companyName}
                  className="w-12 h-12 rounded-full border border-purple-300"
                />
                <div>
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg font-semibold text-purple-700 hover:underline"
                  >
                    {exp.companyName}
                  </a>
                </div>
              </div>

              {exp.roles.map((role, i) => (
                <div
                  key={i}
                  className="bg-white border border-purple-100 rounded-lg p-3 mb-3"
                >
                  <h4 className="text-md font-semibold text-purple-700">
                    {role.title}
                  </h4>
                  <p className="text-gray-700 text-sm mt-1">
                    {role.description}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    📍 {role.location}
                  </p>
                  <p className="text-gray-500 text-xs">
                    🗓️ {role.startDate} → {role.endDate}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Example3;
