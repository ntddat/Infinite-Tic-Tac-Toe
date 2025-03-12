import '../App.css';
import Props from './Props.tsx';

function Twoplayer({ onButtonClick }: Props) {
  return (
    <>
      <h1>Infinite Tic-Tac-Toe</h1>
      <div className="card">
        <button onClick={() => { onButtonClick("Menu")}}>
          Back to Menu
        </button>
      </div>
    </>
  )
}

export default Twoplayer;

/* MAYBE I DONT NEED THIS JUST GO STRAIGHT INTO GAME */
