const drawGameOver = (props) => {
    const { context, gridWidth, gridHeight } = props;
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.fillRect(0, 0, gridWidth, gridHeight);
    context.fillStyle = "white";
    context.font = "48px Arial";
    context.textAlign = "center";
    context.fillText("Game Over", gridWidth / 2, gridHeight / 2);
}

export default drawGameOver;