import { useEffect, useRef } from "react";
import "./GameGrid.style.css";


const Canvas = (props) => {
    const { draw, width, height } = props;
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        draw(context);
    }, [draw]);

  return (
    <canvas ref={canvasRef} className="game-canvas" width={width} height={height}/>
  );
};

export default Canvas;