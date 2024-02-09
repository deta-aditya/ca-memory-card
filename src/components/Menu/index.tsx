import { useAppContext } from "../../contexts/appContext";

function Menu() {
  const { startGame } = useAppContext();

  const handleClickStartGame = () => {
    startGame();
  }

  return (
    <div className="menu">
      <div>
        <h1>Memory Card</h1>
        <button onClick={handleClickStartGame}>Start Game</button>
      </div>
    </div>
  )
}

export default Menu;
