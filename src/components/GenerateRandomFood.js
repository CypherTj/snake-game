const generateRandomFood = (gridWidth, gridHeight, snake) => {
    const foodSize = 20;
    let foodPosition;
    let isOnSnake;
    do {
        foodPosition = {
            x: Math.floor(Math.random() * (gridWidth / foodSize)) * foodSize,
            y: Math.floor(Math.random() * (gridHeight / foodSize)) * foodSize
        };
        isOnSnake = snake.some(segment => segment.x === foodPosition.x && segment.y === foodPosition.y);
    } while (isOnSnake);
    return foodPosition;
}

export default generateRandomFood;