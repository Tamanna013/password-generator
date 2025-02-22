import React from "react";
import * as Switch from "@radix-ui/react-switch"; // Import Radix UI Switch

interface OptionsProps {
  options: {
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    symbols: boolean;
    excludeDuplicates: boolean;
    includeSpaces: boolean;
  };
  setOptions: (options: any) => void;
}

const Options: React.FC<OptionsProps> = ({ options, setOptions }) => {
  const handleToggle = (key: keyof typeof options) => {
    setOptions({ ...options, [key]: !options[key] });
  };

  return (
    <div className="mt-6 text-white">
      <h2 className="text-lg mb-2">Password Settings</h2>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(options).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <Switch.Root
              checked={value}
              onCheckedChange={() => handleToggle(key as keyof typeof options)}
              className="relative inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full border border-gray-700 bg-gray-900 transition-all data-[state=checked]:bg-pink-500"
            >
              <Switch.Thumb className="block h-5 w-5 translate-x-0 rounded-full bg-white transition-transform data-[state=checked]:translate-x-6" />
            </Switch.Root>
            <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Options;
