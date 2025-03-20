import { useState, useEffect } from 'react';
import Header from './component/Header';
import Balloon from './component/Balloon';
import Confetti from "react-confetti"

function App() {
  const [balloons, setBalloons] = useState(newBalloons());
  const [score, setScore] = useState(0);
  const [visibleBalloon, setVisibleBalloon] = useState(null);
  const [wonGame, setWonGame] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let timeoutId;
    if (isRunning) {
      timeoutId = setInterval(() => {
        if (score === 15) {
          setVisibleBalloon(null);
          setBalloons((prevBalloons) =>
            prevBalloons.map((balloon) => ({ ...balloon, popped: false }))
          );
          setWonGame(true);
          setIsRunning(false);
        } else {
          const randomBalloon =
            Math.floor(Math.random() * balloons.length) + 1;
          setVisibleBalloon(randomBalloon);
        }
      }, 1000);
    }


    return () => clearTimeout(timeoutId);
  }, [balloons, score, isRunning]);
  

  function handleClick(id) {
    setBalloons((prevBalloons) =>
      prevBalloons.map((balloon) =>
        balloon.id === id ? { ...balloon, popped: !balloon.popped } : balloon
      )
    );
    setScore((prevScore) => prevScore + 1);
    setVisibleBalloon(null);
  }
  function resetGame(){
    setWonGame(false)
    setScore(0)
  }
  function startGame(){
    setIsRunning(true)
    console.log("start")
  }
  function stopGame(){
    setIsRunning(false)
    console.log("stop")
  }


  function newBalloons() {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    return colors.map((color, index) => ({
      id: index + 1,
      color,
      popped: false,
    }));
  }
  const showBalloons = balloons.map((balloon) => (
    <Balloon
      key={balloon.id}
      color={balloon.color}
      popped={balloon.popped}
      onClick={() => handleClick(balloon.id)}
      isVisible={balloon.id === visibleBalloon}
    />))
  return (
    <>
      {wonGame && <Confetti/>}
      <div className="container">
        <div className="mainCont">
          <Header score = {score} isRunning= {isRunning} onStart={startGame} onStop={stopGame}/>
          <div className="bodyCont">
            {wonGame && (<h3>You won</h3>)}
            <h2>Click a balloon to score</h2>
            <div className="balloonCont">
              {showBalloons}
            </div>
            {
              wonGame && 
              (
              <div className="buttCont">
                <button onClick={resetGame}>Reset game</button>
              </div>
            )
            }
            
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
