import React from "react";

interface SliderProps {
  length: number;
  setLength: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ length, setLength }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <label className="text-pink-400 text-lg">Password Length</label>
      <input
        type="range"
        min="6"
        max="30"
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
        className="w-full mt-2 accent-purple-500 cursor-pointer"
      />
      <div className="mt-2 text-xl font-semibold bg-gray-800 px-4 py-1 rounded-lg">{length}</div>
    </div>
  );
};

export default Slider;
