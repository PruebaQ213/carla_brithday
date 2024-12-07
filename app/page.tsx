"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  // Define the array of texts for the h1 element
  const headerTexts = [
    "Otra vez por aquí :)", 
    "Esta vez me lo he intentado currar más",   
    "Espero que te guste :D",
    ""
  ];
  const [scale, setScale] = useState(0);
  const [isStartVisible, setIsStartVisible] = useState(true);
  const [isMainVisible, setisMainVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle button click
  const handleClick = () => {
    // Update the index to the next one, looping back to the start
    const nextIndex = (currentIndex + 1) % headerTexts.length;

    setCurrentIndex(nextIndex);

    if (nextIndex === 3) {
      router.push("/main");
    }

  };

  const startPage = () => {
    setScale(scale === 0 ? 0 : 1);
    setisMainVisible(true);
    setIsStartVisible(false);
  }

  return (
   <>
        {/*this is the div to start everything */}
        {isStartVisible && (
          <div id="start" className="z-40 start absolute h-screen w-screen flex justify-center items-center">
          <button 
            id = "btnStart"
            className="bg-pink-400 hover:bg-pink-500 text-8xl p-3 text-center flex text-wrap justify-center items-center rounded-full "
            onClick={startPage}>
              <h1 className="tracking-widest letter- text-9xl ">COMENZAR</h1>
          </button>
        </div>
        )}
         
      {/* This is the div of the text and button */}
      {isMainVisible && ( // Conditionally render the div based on isMainVisible
        <div
          id="click-text"  
          className="main h-screen flex items-center justify-center">
          <div 
          className="flex-col flex items-center justify-center">
          <h1 className="text-7xl font-bold">{headerTexts[currentIndex]}</h1> {/* Display the current header text */}
          <button 
            className="w-80 h-40 mt-4 text-2xl bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleClick} // Attach the click handler
          >
            Siguiente
          </button>
          </div>
        </div>
      )}
    </>
  );
}