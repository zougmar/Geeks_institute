import { useDispatch } from "react-redux";
import { ageUpAsync, ageDownAsync } from "../redux/ageSlice";

export default function AgeControls() {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center gap-6 mt-6">
      <button
        onClick={() => dispatch(ageUpAsync())}
        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        Age Up
      </button>
      <button
        onClick={() => dispatch(ageDownAsync())}
        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Age Down
      </button>
    </div>
  );
}
