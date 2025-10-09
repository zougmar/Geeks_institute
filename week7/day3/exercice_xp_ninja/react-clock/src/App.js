import React, { useEffect, useState } from "react";

const CircularClock = () => {
  const [time, setTime] = useState(new Date());
  const [rotations, setRotations] = useState({
    sec: 0,
    min: 0,
    hr: 0,
    day: 0,
    week: 0,
    month: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const sec = now.getSeconds();
      const min = now.getMinutes();
      const hr = now.getHours();
      const day = now.getDate();
      const week = Math.floor(day / 7) + 1;
      const month = now.getMonth() + 1;

      setTime(now);

      // Each ring moves exactly one step per unit
      setRotations({
        sec: (sec / 60) * 360,      // 6° per second
        min: (min / 60) * 360,      // 6° per minute
        hr: (hr / 24) * 360,        // 15° per hour
        day: (day / 31) * 360,      // ~11.6° per day
        week: (week / 52) * 360,    // ~6.9° per week
        month: (month / 12) * 360,  // 30° per month
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  const rings = [
    { label: "month", count: 12, value: month, rot: rotations.month },
    { label: "week", count: 52, value: Math.floor(day / 7) + 1, rot: rotations.week },
    { label: "day", count: 31, value: day, rot: rotations.day },
    { label: "hr", count: 24, value: hour, rot: rotations.hr },
    { label: "min", count: 60, value: minute, rot: rotations.min },
    { label: "sec", count: 60, value: second, rot: rotations.sec },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#0a0f1f] to-[#1a1f2e] text-white overflow-hidden relative">
      {/* YEAR */}
      <div className="absolute top-8 left-8 text-4xl font-light tracking-wide text-gray-300">
        {year} <span className="text-sm text-gray-500">/Year</span>
      </div>

      {/* CLOCK RINGS */}
      <div className="relative flex items-center justify-center w-[650px] h-[650px]">
        {rings.map((ring, index) => {
          const radius = 80 + index * 45;
          const angleStep = (2 * Math.PI) / ring.count;

          return (
            <div
              key={index}
              className="absolute inset-0 transition-transform duration-1000 ease-linear"
              style={{ transform: `rotate(${ring.rot}deg)` }}
            >
              {[...Array(ring.count)].map((_, i) => {
                const angle = i * angleStep;
                const x = radius * Math.sin(angle);
                const y = -radius * Math.cos(angle);
                const isActive = i + 1 === ring.value;

                return (
                  <div
                    key={i}
                    className={`absolute text-[10px] sm:text-xs font-light transition-all duration-500 ${
                      isActive
                        ? "text-white font-semibold scale-125 drop-shadow-[0_0_8px_#00f5ff]"
                        : "text-gray-600"
                    }`}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: `translate(-50%, -50%) rotate(${(angle * 180) / Math.PI}deg)`,
                    }}
                  >
                    {i + 1} <span className="ml-1 text-[8px]">{ring.label}</span>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* CENTER TIME LINE */}
        <div className="absolute text-center text-xl sm:text-2xl md:text-3xl font-light tracking-wider">
          <span className="text-white font-semibold">{hour}</span>
          <span className="text-gray-400 ml-1">hr</span>

          <span className="text-white font-semibold ml-4">{minute}</span>
          <span className="text-gray-400 ml-1">min</span>

          <span className="text-white font-semibold ml-4">{second}</span>
          <span className="text-gray-400 ml-1">sec</span>
        </div>
      </div>

      {/* MONTH NAME */}
      <div className="absolute bottom-10 right-10 text-3xl font-semibold text-cyan-300 tracking-wide">
        {time.toLocaleString("default", { month: "short" })}
      </div>
    </div>
  );
};

export default CircularClock;
