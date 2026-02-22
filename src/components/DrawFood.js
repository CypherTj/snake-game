const drawFood = (props) => {
    const { context, foodPosition, snakePx } = props;
    context.fillStyle = "red";
    context.fillRect(foodPosition.x, foodPosition.y, snakePx, snakePx);
}

export default drawFood;