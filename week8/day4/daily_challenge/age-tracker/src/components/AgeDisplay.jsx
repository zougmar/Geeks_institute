import { useSelector } from "react-redux";

export default function AgeDisplay() {
  const { age, loading } = useSelector((state) => state.age);

  return (
    <div className="text-center my-8">
      <h2 className="text-3xl font-bold">Your Age: {age}</h2>
      {loading && (
        <div className="flex justify-center mt-4">
          <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
