import GameMenu from "./components/GameMenu";
import GameGrid from "./components/GameGrid";
import drawSnake from "./components/DrawSnake";
import { useEffect, useState } from "react";
import moveSnake from "./components/MoveSnake";
import generateRandomFood from "./components/GenerateRandomFood";
import drawFood from "./components/DrawFood";
import drawGameOver from "./components/DrawGameOver";



export default function App() {
	const gridWidth = 800;
	const gridHeight = 800;
	const snakePx = 20;

	const [direction, setDirection] = useState("right");
	const [snake, setSnake] = useState([{ x: 40, y: 0 }, { x: 20, y: 0 }, { x: 0, y: 0 }]);
	const [foodPosition, setFoodPosition] = useState(generateRandomFood(gridWidth, gridHeight, snake));
	const [gameOver, setGameOver] = useState(false);
	const [score, setScore] = useState(0);
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [isGamePaused, setIsGamePaused] = useState(false);
	const [isNewGame, setIsNewGame] = useState(true);


	// handles key presses for snake movement
	useEffect(() => {
		const handleKeyDown = (event) => {
			switch (event.key) {
				case "ArrowUp":
					if (direction !== "down") {
						// Prevent reversing into itself
						setDirection("up");
					}
					break;
				case "ArrowDown":
					if (direction !== "up") {
						// Prevent reversing into itself
						setDirection("down");
					}
					break;
				case "ArrowLeft":
					if (direction !== "right") {
						// Prevent reversing into itself
						setDirection("left");
					}
					break;
				case "ArrowRight":
					if (direction !== "left") {
						// Prevent reversing into itself
						setDirection("right");
					}
					break;
				default:
					break;
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [direction]);

	// handles snake re-render
	useEffect(() => {
		let interval;
		// move snake every 100ms if game is started
		if (isNewGame && !isGameStarted) {
			setSnake([{ x: 40, y: 0 }, { x: 20, y: 0 }, { x: 0, y: 0 }]);
			setFoodPosition(generateRandomFood(gridWidth, gridHeight, snake));
			setGameOver(false);
			setScore(0);
			setIsNewGame(false);
			setDirection("right");
			setIsGameStarted(false);
		}
		if (isGameStarted && !gameOver && !isGamePaused) {
			interval = setInterval(() => {
				setSnake((prevSnake) => {
					const newHeadPosition = moveSnake({ snake: prevSnake, direction, snakePx });
					const newSnake = [newHeadPosition, ...prevSnake.slice(0, -1)];
					return newSnake;
				});

				// check if snake eats food
				if (snake[0].x === foodPosition.x && snake[0].y === foodPosition.y) {
					// grow snake and generate new food
					setSnake((prevSnake) => [...prevSnake, prevSnake[prevSnake.length - 1]]);
					setFoodPosition(generateRandomFood(gridWidth, gridHeight, snake));
					setScore((prevScore) => prevScore + 1);
				}

				// check for collisions with walls to render snake on opposite side
				setSnake((prevSnake) => {
					const head = prevSnake[0];
					let newHead = { ...head };
					if (head.x < 0) {
						newHead.x = gridWidth - snakePx;
					} else if (head.x >= gridWidth) {
						newHead.x = 0;
					}
					if (head.y < 0) {
						newHead.y = gridHeight - snakePx;
					} else if (head.y >= gridHeight) {
						newHead.y = 0;
					}
					return [newHead, ...prevSnake.slice(1)];
				});

				// check for collisions with itself to reset game
				if (snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)) {
					setGameOver(true);
					return;
				}

			}, 100);
		}
		if (gameOver || isGamePaused) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [isGameStarted, isGamePaused, isNewGame,direction, snakePx, snake, foodPosition]);

	const draw = (context) => {
		if (gameOver) {
			drawGameOver({ context, gridWidth, gridHeight });
			return;
		}

		if (isGamePaused) {
			context.fillStyle = "rgba(0, 0, 0, 0.5)";
			context.fillRect(0, 0, gridWidth, gridHeight);
			context.fillStyle = "white";
			context.font = "48px Arial";
			context.textAlign = "center";
			context.fillText("Paused", gridWidth / 2, gridHeight / 2);
			return;
		}

		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		context.fillStyle = "red";
		drawSnake({ context, snake, snakePx });
		drawFood({ context, foodPosition, snakePx });
	};


	return (
		<div className="App">
			<GameMenu score={score} setGameStarted={setIsGameStarted} setNewGame={setIsNewGame} setGamePaused={setIsGamePaused} />
			<GameGrid width={gridWidth} height={gridHeight} draw={draw} />
		</div>
	);
}