const moveSnake = (props) => {
    const { snake, direction, snakePx } = props;
    const snakeHead = snake[0];
    let newHead;
    switch (direction) {
        case "up":
            newHead = { x: snakeHead.x, y: snakeHead.y - snakePx };
            break;
        case "down":
            newHead = { x: snakeHead.x, y: snakeHead.y + snakePx };
            break;
        case "left":
            newHead = { x: snakeHead.x - snakePx, y: snakeHead.y };
            break;
        case "right":
            newHead = { x: snakeHead.x + snakePx, y: snakeHead.y };
            break;
        default:
            newHead = snakeHead;
    }
    return newHead;
}

export default moveSnake;
