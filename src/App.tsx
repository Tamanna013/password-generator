import { useState, useEffect } from "react";
import './App.css';
import Options from "./components/Options";
import Slider from "./components/Slider";

const App = () => {
  const [length, setLength] = useState(30);
  const [options, setOptions] = useState({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
    excludeDuplicates: false,
    includeSpaces: false,
  });
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const generatePassword = () => {
    if (options.includeSpaces && !options.lowercase && !options.uppercase && !options.numbers && !options.symbols) {
      setGeneratedPassword("Select at least one character type!");
      return;
    }

    let charset = "";
    if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.numbers) charset += "0123456789";
    if (options.symbols) charset += "!@#$%^&*()_+[]{}|;:,.<>?";
    if (options.includeSpaces) charset += " ";

    if (!charset) {
      setGeneratedPassword("Select at least one option!");
      return;
    }

    let password = "";
    while (password.length < length) {
      let char = charset[Math.floor(Math.random() * charset.length)];
      if (options.excludeDuplicates && password.includes(char)) continue;
      password += char;
    }

    setGeneratedPassword(password);
  };

  const handleCopy = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword)
        .then(() => {
          alert("Password copied to clipboard!");
        })
        .catch(err => {
          console.error("Error copying text: ", err);
        });
    }
  };

  return (
    <div className="animated-bg min-h-screen flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md z-0"></div>
      <div className={`bg-black/80 p-10 rounded-2xl shadow-lg text-center w-full max-w-2xl transition-all ${isLoaded ? 'translate-y-0' : 'translate-y-[100px]'}`}>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
          Password Generator
        </h1>
        {isLoaded && (
          <>
            <div className="mt-6">
              <Slider length={length} setLength={setLength} />
            </div>
            <div>
              <Options options={options} setOptions={setOptions} />
            </div>
            <div className="mt-6">
              <button
                onClick={generatePassword}
                className="px-6 py-2 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 transition"
              >
                Generate Password
              </button>
            </div>
            {generatedPassword && (
              <div className="mt-6">
                <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
                  <h2 className="text-lg mb-2 text-xl font-semibold">{generatedPassword}</h2>
                  <button
                    onClick={handleCopy}
                    className="text-white cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-pink-500 hover:text-pink-600 transition"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 8h8M8 12h8M8 16h8M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
