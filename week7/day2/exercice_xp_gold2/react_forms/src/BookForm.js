import React, { useState } from "react";

function NewBookForm() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📘 New Book Data:", book);
    setSuccess("✅ New book added successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-lg p-8">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-8 tracking-wide">
          📚 Add a New Book
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              placeholder="Enter book title"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              placeholder="Enter author's name"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Genre
            </label>
            <input
              type="text"
              name="genre"
              value={book.genre}
              onChange={handleChange}
              placeholder="Enter genre"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Year Published
            </label>
            <input
              type="number"
              name="year"
              value={book.year}
              onChange={handleChange}
              placeholder="Enter year"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            Submit
          </button>
        </form>

        {success && (
          <div className="mt-6 text-center text-green-600 font-medium text-lg animate-fadeIn">
            {success}
          </div>
        )}
      </div>
    </div>
  );
}

export default NewBookForm;
