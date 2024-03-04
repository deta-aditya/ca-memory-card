import { useAppContext } from "../../contexts/appContextOld";
import { Game } from "../../core/game";

export type WonGameProps = Extract<Game, { kind: 'won' }>

function WonGame({ score }: WonGameProps) {
  const app = useAppContext();

  return (
    <div className="won">
      <div>
        <h1>You Win!</h1>
        Final Score:
        <p className="score">{score}</p>
        <button onClick={() => app.resetGame()}>Main Menu</button>
      </div>
    </div>
  )
}

export default WonGame;
