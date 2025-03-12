import '../App.css';
import Props from './Props.tsx';

function Singleplayer({ onButtonClick }: Props) {
  return (
    <>
      <h1>Infinite Tic-Tac-Toe</h1>
      <div className="card">
        <button onClick={() => { }}>
          Random Bot
        </button>
      </div>
      <div className="card">
        <button onClick={() => { onButtonClick("Menu")}}>
          Back to Menu
        </button>
      </div>
    </>
  )
}

export default Singleplayer;
