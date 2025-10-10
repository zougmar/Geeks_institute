import React, { useState } from "react";

function ColumnLeft() {
  const [images, setImages] = useState([]);

  const handleGetImages = () => {
    setImages([
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
    ]);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-md h-full">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Left column</h2>
      <button
        onClick={handleGetImages}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-6"
      >
        Get images
      </button>

      <div className="flex flex-col gap-4">
        {images.map((url, index) => (
          <img
            key={index}
            src={url}
            alt="Fetched"
            className="w-56 h-36 object-cover rounded-lg shadow"
          />
        ))}
      </div>
    </div>
  );
}

export default ColumnLeft;
