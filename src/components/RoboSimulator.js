
import { useState } from "react";

export default function RoboSimulator() {
  const directions = ["NORTH", "EAST", "SOUTH", "WEST"];
  const gridSize = 5;
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    f: "NORTH",
    placed: false,
  });

  const place = (x, y, f) => {
    if (x >= 0 && x <= 4 && y >= 0 && y <= 4) {
      setPosition({ ...position, x, y, f, placed: true });
    }
  };

const move = () => {
  if (!position.placed) return;

  let { x, y, f } = position;
  switch (f) {
    case 'NORTH':
      if (y < 4) y += 1;
      break;
    case 'EAST':
      if (x < 4) x += 1;
      break;
    case 'SOUTH':
      if (y > 0) y -= 1;
      break;
    case 'WEST':
      if (x > 0) x -= 1;
      break;
    default:
      break;
  }
  setPosition(prevState => ({ ...prevState, x, y }));

};

const rotate = (direction) => {
  if (!position.placed) return;

  let currentIndex = directions.indexOf(position.f);
  if (direction === 'LEFT') {
    currentIndex = currentIndex - 1 < 0 ? directions.length - 1 : currentIndex - 1;
  } else if (direction === 'RIGHT') {
    currentIndex = (currentIndex + 1) % directions.length;
  }
  const newFacing = directions[currentIndex];
  setPosition(prevState => ({ ...prevState, f: newFacing }));
};

  const report = () => {
    if (!position.placed) return;

    alert(`Output: ${position.x},${position.y},${position.f}`);
  };
  const renderGrid = () => {
    let grid = [];
    for (let y = gridSize - 1; y >= 0; y--) {
      for (let x = 0; x < gridSize; x++) {
        const isRobotHere =
          position.placed && position.x === x && position.y === y;
        grid.push(
          <div
            className={`grid-cell ${isRobotHere ? "robot" : ""}`}
            key={`${x}-${y}`}
          >
            {isRobotHere ? "🤖" : ""}
          </div>
        );
      }
    }
    return grid;
  };

  return (
    <div className="main">
      <div>
        <button onClick={() => place(0, 0, "NORTH")}>PLACE 0,0,NORTH</button>
        <button onClick={move}>MOVE</button>
        <button onClick={() => rotate("LEFT")}>LEFT</button>
        <button onClick={() => rotate("RIGHT")}>RIGHT</button>
        <button onClick={report}>REPORT</button>
      </div>
      <h2>{`${position.x},${position.y},${position.f}`}</h2>
      <div className="grid">{renderGrid()}</div>
    </div>
  );
}
