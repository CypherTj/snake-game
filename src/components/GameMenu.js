import "./GameMenu.style.css";

const GameMenu = (props) => {
    const { score, setGameStarted, setNewGame, setGamePaused } = props;
    const startGame = () => {
        setGameStarted(true);
        setGamePaused(false);
        setNewGame(false);
    }

    const startNewGame = () => {
        setNewGame(true);
        setGameStarted(false);
        setGamePaused(false);
    }
    return (
        <div className="game-menu">
            <button className="game-menu-button" onClick={startGame}>Start Game</button>
            <button className="game-menu-button" onClick={startNewGame}>New Game</button>
            <button className="game-menu-button" onClick={() => setGamePaused(true)}>Pause</button>
            <div className="score">Score: {score}</div>
        </div>
    );
}

export default GameMenu;