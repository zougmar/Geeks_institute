import React, { useState, useEffect } from "react";

function Clock() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const hour = currentDate.getHours();
  const isNight = hour >= 18 || hour < 6; // Night: 6PM–6AM

  useEffect(() => {
    const timerID = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timerID);
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentDate.toLocaleTimeString();

  return (
    <div
      className={`relative flex flex-col items-center justify-center h-screen overflow-hidden text-center transition-all duration-1000 ${
        isNight
          ? "bg-gradient-to-b from-gray-900 via-indigo-950 to-black text-gray-100"
          : "bg-gradient-to-b from-blue-200 via-sky-100 to-white text-gray-900"
      }`}
    >
      {/* 🌠 Smooth Moving Stars (Night Mode) */}
      {isNight && (
        <div className="absolute inset-0 overflow-hidden z-0">
          {[...Array(50)].map((_, i) => {
            const size = Math.random() * 2 + 1;
            const duration = 25 + Math.random() * 20; // slow, smooth
            const delay = Math.random() * 10;
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;

            return (
              <div
                key={i}
                className="absolute bg-white rounded-full opacity-70"
                style={{
                  top: `${startY}%`,
                  left: `${startX}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animation: `driftStar ${duration}s ease-in-out ${delay}s infinite alternate`,
                }}
              ></div>
            );
          })}
        </div>
      )}

      {/* 🌙 Moon (Night) */}
      {isNight && (
        <div className="absolute top-20 right-20 w-24 h-24 rounded-full bg-gradient-to-b from-gray-200 to-gray-500 shadow-[0_0_60px_20px_rgba(255,255,255,0.15)] animate-float-slow z-0"></div>
      )}

      {/* ☀️ Sun (Day) */}
      {!isNight && (
        <div className="absolute top-16 left-20 w-32 h-32 rounded-full bg-gradient-to-b from-yellow-300 to-orange-500 shadow-[0_0_80px_30px_rgba(255,200,0,0.4)] animate-pulse-slow z-0"></div>
      )}

      {/* 🕒 Clock Card */}
      <div
        className={`relative z-10 rounded-3xl shadow-2xl p-10 backdrop-blur-md ${
          isNight
            ? "bg-indigo-900/40 border border-indigo-700/40"
            : "bg-white/70 border border-indigo-200"
        }`}
      >
        <h1
          className={`text-5xl font-extrabold mb-4 tracking-tight ${
            isNight ? "text-indigo-100" : "text-indigo-900"
          }`}
        >
          {isNight ? "Good evening, world! 🌙" : "Good day, world! ☀️"}
        </h1>

        <p
          className={`text-lg mb-3 ${
            isNight ? "text-indigo-200" : "text-indigo-700"
          }`}
        >
          {formattedDate}
        </p>

        <h2
          className={`text-4xl font-bold ${
            isNight
              ? "text-indigo-100 animate-pulse"
              : "text-indigo-800 animate-pulse"
          }`}
        >
          It is {formattedTime}.
        </h2>
      </div>

      {/* Footer */}
      <footer
        className={`absolute bottom-6 text-sm z-10 ${
          isNight ? "text-indigo-400" : "text-indigo-600"
        }`}
      >
        Made with 💫 React & Tailwind CSS
      </footer>

      {/* 🌟 Custom Keyframes */}
      <style>
        {`
          @keyframes driftStar {
            0% { transform: translate(0, 0); opacity: 0.8; }
            50% { transform: translate(15px, -15px); opacity: 1; }
            100% { transform: translate(-15px, 15px); opacity: 0.7; }
          }

          @keyframes float-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }

          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.9; }
          }

          .animate-float-slow {
            animation: float-slow 6s ease-in-out infinite;
          }

          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}

export default Clock;
