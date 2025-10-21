import React from "react";
import { connect } from "react-redux";
import { setSelectedDay } from "../actions";

function DatePicker({ selectedDay, setSelectedDay }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600 font-medium">Select Day</label>
      <input
        type="date"
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
      />
    </div>
  );
}

const mapState = (state) => ({ selectedDay: state.selectedDay });
export default connect(mapState, { setSelectedDay })(DatePicker);
