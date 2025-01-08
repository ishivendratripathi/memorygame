import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Apihandling = () => {
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clicked, setClicked] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);

  const shuffleArray = (array) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  useEffect(() => {
    axios.get('https://digimon-api.vercel.app/api/digimon').then((response) => {
      const shuffled = shuffleArray(response.data);
      setData(shuffled.slice(0, 10));
    });
  }, []);

  const handleRestart = () => {
    setGameOver(false);
    setCounter(0);
    setClicked(new Set());
    axios.get('https://digimon-api.vercel.app/api/digimon').then((response) => {
      const shuffled = shuffleArray(response.data);
      setData(shuffled.slice(0, 10));
    });
  };

  const handleClick = (name) => {
    if (clicked.has(name)) {
      setBestScore(Math.max(bestScore, counter));
      setGameOver(true);
    } else {
      setClicked(new Set(clicked).add(name));
      setCounter(counter + 1);
      setData(shuffleArray(data));
    }
  };

  return (
    <div className="p-8">
      {gameOver ? (
        <div className="text-center">
          <div className="text-4xl font-bold text-red-600 mb-4">Game Over! You Lost</div>
          <div className="text-xl font-semibold mb-4">Your Score: {counter}</div>
          <div className="text-xl font-semibold mb-6">Best Score: {bestScore}</div>
          <button
            onClick={handleRestart}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
          >
            Restart Game
          </button>
        </div>
      ) : (
        <>
          <div className="text-center font-extrabold text-4xl text-rose-600 mb-4">
            IS YOUR MEMORY GOOD? Let's Find Out
          </div>
          <div className="text-lg text-blue-600 mb-2">
            DON'T TAP THE SAME CARD TWICE OR YOU LOSE
          </div>
          <div className="text-xl font-semibold mb-4">CURRENT SCORE: {counter}</div>
          <div className="text-xl font-semibold mb-6">BEST SCORE: {bestScore}</div>
          <div className="flex flex-wrap justify-center gap-6">
            {data.map((item, index) => (
              <button
                key={index}
                onClick={() => handleClick(item.name)}
                className="relative h-40 w-40 border-4 border-black flex flex-col items-center justify-center p-2 rounded-lg overflow-hidden shadow-lg group hover:shadow-xl hover:scale-110 transition-transform"
              >
                <span className="absolute left-0 -ml-2 h-40 w-40 origin-top-right -translate-x-full translate-y-10 -rotate-90 bg-gray-800 transition-all duration-300 group-hover:-rotate-180"></span>
                <img src={item.img} alt="" className="h-20 w-20 object-contain mb-2 z-10" />
                <div className="text-lg font-medium z-10 text-white">{item.name}</div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Apihandling;
