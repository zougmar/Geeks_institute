import React from "react";
import posts from "../posts.json"; // Import JSON file

const PostList = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        📰 Blog Posts
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {post.title}
            </h2>
            <p className="text-gray-600 mb-3">{post.content}</p>
            <p className="text-sm text-gray-400 mb-4">📅 {post.date}</p>
            <a
              href={`/posts/${post.slug}`}
              className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm transition"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
