import React, { useState } from "react";

const InputNode = ({ i, x }) => {
  const [hover, setHover] = useState(false);

  //   const changeColor = (newColor) => setColor(newColor);

  return (
    <svg>
      <circle
        id={`inNode_${i}`}
        i={i}
        cx={x}
        cy={0}
        r="16"
        fill="transparent"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      />
      <circle
        className={`pointer-events-none transition-colors duration-300 ${
          hover ? "fill-coral" : "fill-cornflower"
        }`}
        cx={x}
        cy={0}
        r="8"
      />
    </svg>
  );
};

const InputNodeGroup = ({ i }) => {
  let nodes = [
    { id: `${i}_amp`, i: i * 3, x: (i + 1) * (500 / 7) - 20 },
    { id: `${i}_out`, i: i * 3 + 1, x: (i + 1) * (500 / 7) },
    { id: `${i}_freq`, i: i * 3 + 2, x: (i + 1) * (500 / 7) + 20 },
  ];
  return (
    // <InputNode key={nodes[0].id} i={i} x={nodes[0].x} />
    <g>
      {nodes.map((node) => (
        <InputNode key={node.id} i={node.i} x={node.x} />
      ))}
    </g>
  );
};

export default InputNodeGroup;
