import { useState } from 'react'
import Singleplayer from "./Components/Singleplayer.tsx"
import Twoplayer from "./Components/Twoplayer.tsx"
import GameCanvas from "./Components/GameCanvas.tsx"
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [mode, setMode] = useState("Menu")
  const [win, setWin] = useState(
        <div id="home">
          <button className="return" onClick={() => reset()}>
            Menu
          </button>
        </div>)

  function reset() {
    setMode("Menu")
    setWin(<div id="home">
          <button className="return" onClick={() => setMode("Menu")}>
            Menu
          </button>
        </div>)
  }

  const handleButtonClick = (item: string) => {
    if (item === "X Win") {
      setWin(<div id="home">
          <button className="return" onClick={() => reset()}>
            X Wins! Click to return to Menu
          </button>
        </div>)
      console.log("mm")
    }
    else if (item === "O Win") {
      setWin(<div id="home">
          <button className="return" onClick={() => reset()}>
            O Wins! Click to return to Menu
          </button>
        </div>)
    }
    else if (item === "Menu") {
      reset()
    }
    else {
      setMode(item)
    }
  }

  if (mode == "Singleplayer") {
    return <Singleplayer onButtonClick={handleButtonClick}/>
  }

  if (mode == "Twoplayer") {
    return (
      <>
        <GameCanvas onButtonClick={handleButtonClick}/>
        <div id="home">
          <button className="return" onClick={() => reset()}>
            Menu
          </button>
        </div>
        {win}
      </>
    )
  }


  return (
    <>
      <div id="menuContainer">
        <h1>Infinite Tic-Tac-Toe</h1>
        <div className="card">
          <button onClick={() => setMode("Singleplayer")}>
            Play Computer
          </button>
        </div>
        <div className="card">
          <button onClick={() => setMode("Twoplayer")}>
            Play a Friend
          </button>
        </div>
        <p className="read-the-docs">
          About
        </p>
      </div>
    </>
  )
}

export default App
