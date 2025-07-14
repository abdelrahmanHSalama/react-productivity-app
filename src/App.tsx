import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex justify-center items-center h-screen gap-2">
      <span>Count is</span>
      <button
        className="w-10 h-10 bg-gray-100 rounded cursor-pointer border border-[#FFFFFF] hover:border-black transition duration-100"
        onClick={() => setCount((count) => count + 1)}
      >
        {count}
      </button>
      <span>!</span>
    </main>
  );
}

export default App;
