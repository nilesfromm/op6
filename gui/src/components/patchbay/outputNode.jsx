import React, { useState } from "react";

const OutputNode = ({ i, handleCreatePatchCable }) => {
  const [hover, setHover] = useState(false);

  return (
    <svg>
      <circle
        cx={(i + 1) * (500 / 7)}
        cy={240}
        r="20"
        fill="transparent"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onMouseDown={(e) =>
          handleCreatePatchCable(i, {
            x: e.target.attributes.cx.value,
            y: e.target.attributes.cy.value,
          })
        }
      />
      <circle
        className={`pointer-events-none transition-colors duration-300 ${
          hover ? "fill-coral" : "fill-cornflower"
        }`}
        cx={(i + 1) * (500 / 7)}
        cy={240}
        r="8"
      />
    </svg>
  );
};

export default OutputNode;
