import {useState, useRef, useEffect} from "react";
import {nanoid} from "nanoid"
import Die from "./components/Die";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const [rollCount, setRollCount] = useState(0);
  const buttonRef = useRef(null);

  const gameWon = dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
    }
  }, [gameWon]);

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => ({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      }));
  }

  function rollDice() {
    if (gameWon) {
      setDice(generateAllNewDice());
      setRollCount(0)
    } else {
      const rolledDice = dice.map(dieObj => {
        return dieObj.isHeld
          ? dieObj
          : {...dieObj, value: Math.ceil(Math.random() * 6)};
      });
      setDice(rolledDice);
      setRollCount(prevCount => prevCount + 1);
    }
  }

  function holdDice(id) {
    const heldDice = dice.map(dieObj => {
      return id === dieObj.id
        ? {...dieObj, isHeld: !dieObj.isHeld}
        : dieObj;
    });
    setDice(heldDice);
  }

  const diceElements = dice.map(dieObj =>
  <Die key={dieObj.id} {...dieObj} holdDice={holdDice}/>);

  return (
    <main>
      {gameWon && <Confetti />}
      <header>
        <h1 className="title">Tenzi</h1>
        <p className="instructions">Roll until all dice are the same.</p>
        <p className="instructions">Click each die to freeze it at its current value between rolls</p>
      </header>
      <div className="dice-container">
        {diceElements}
      </div>
      <div>
        Rolls: {rollCount}
      </div>
      <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;