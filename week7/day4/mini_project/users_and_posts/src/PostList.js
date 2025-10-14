import React, { Component } from "react";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      errorMsg: ""
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(data => this.setState({ posts: data }))
      .catch(error => this.setState({ errorMsg: error.message }));
  }

  render() {
    const { posts, errorMsg } = this.state;

    return (
      <div className="max-w-6xl mx-auto my-10 px-4">
        <h2 className="text-3xl font-bold mb-6">Posts</h2>

        {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}

        {posts.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
              <div
                key={post.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-600">
                  {post.title}
                </h3>
                <p className="text-gray-700">{post.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Loading posts...</p>
        )}
      </div>
    );
  }
}

export default PostList;
