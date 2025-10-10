import React, { useState } from "react";

function App() {
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Async function to post JSON data
  const sendData = async () => {
    setLoading(true);
    setResponseMessage("");

    const url = "https://webhook.site/914c5cc6-059f-4413-92e7-86409d052b5a"; // 🔗 Replace with your unique webhook URL

    const data = {
      key1: "myusername",
      email: "mymail@gmail.com",
      name: "Isaac",
      lastname: "Doe",
      age: 27,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // webhook.site may not always return JSON — handle both cases
      const text = await response.text();
      setResponseMessage(text);
      console.log("Response from Webhook:", text);
    } catch (error) {
      console.error("Error posting data:", error);
      setResponseMessage("❌ Failed to send data. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          🚀 Post JSON Data (React + Tailwind)
        </h1>
        <p className="text-gray-600 mb-6">
          Click the button below to send a JSON payload to your webhook URL.
        </p>

        <button
          onClick={sendData}
          disabled={loading}
          className={`${
            loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
          } text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300`}
        >
          {loading ? "Sending..." : "Send JSON Data"}
        </button>

        {/* Response box */}
        {responseMessage && (
          <div className="mt-6 bg-gray-100 border border-gray-300 rounded-lg p-4 text-left">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Response:
            </h2>
            <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words">
              {responseMessage}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
