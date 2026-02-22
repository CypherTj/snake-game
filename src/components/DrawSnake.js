
const drawSnake = (props) => {
    const { context, snake, snakePx } = props;
    context.strokeStyle = "darkgreen";
    for (let i = 0; i < snake.length; i++) {
        const snakePosition = snake[i];
        if (i === 0) {
            context.fillStyle = "red";
        } else {
            context.fillStyle = "green";
        }
        context.fillRect(snakePosition.x, snakePosition.y, snakePx, snakePx);
        context.lineWidth = 2;
        context.strokeRect(snakePosition.x, snakePosition.y, snakePx, snakePx);
    }
}

export default drawSnake;