import React, { useState, useRef, useEffect } from "react";

const PatchCable = ({
  i,
  id,
  outId,
  startPt,
  handleRemovePatchCable,
  updateConnections,
}) => {
  // const [hover, setHover] = useState(false);
  const svgRef = useRef(null);
  // const [el, setEl] = useState(null);
  const [inId, setInId] = useState(null);

  const [points, setPoints] = useState([
    { x: startPt.x, y: startPt.y },
    { x: startPt.x, y: startPt.y },
  ]);

  const mousemove = (event) => {
    event.preventDefault();
    let cursorPoint = svgRef.current.createSVGPoint();
    cursorPoint.x = event.clientX;
    cursorPoint.y = event.clientY;
    cursorPoint = cursorPoint.matrixTransform(
      svgRef.current.getScreenCTM().inverse()
    );
    setPoints(
      points.map((p, i) =>
        i === 1
          ? {
              x: Math.max(Math.min(cursorPoint.x, 1000), 0),
              y: Math.max(Math.min(cursorPoint.y, 1000), 0),
            }
          : p
      )
    );
  };

  const mouseup = (event) => {
    if (event.target.id.includes("inNode")) {
      setInId(event.target.id.slice(7));
      // console.log("created patch cable with id: " + id);
      // console.log(outId + " -> " + event.target.id.slice(7));
      updateConnections(outId, event.target.id.slice(7), 1);
      setPoints(
        points.map((p, i) =>
          i === 1
            ? {
                x: event.target.attributes.cx.value,
                y: event.target.attributes.cy.value,
              }
            : p
        )
      );
    } else {
      // not connected to an input node, remove cable
      handleRemovePatchCable(id);
    }
    // el.classList.remove("pointer-events-none");
    document.removeEventListener("mousemove", mousemove);
    document.removeEventListener("mouseup", mouseup);
  };

  const startDrag = (event, index) => {
    event.preventDefault();
    // setEl(event.target);
    console.log(event.target);
    // el.classList.add("pointer-events-none");

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  };

  useEffect(() => {
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  }, []);

  return (
    <svg ref={svgRef}>
      <path
        style={{
          webkitFilter: "drop-shadow( 0px 0px 10px rgba(100, 149, 237, 0.8))",
        }}
        d={`M ${points[0].x} ${points[0].y} C ${points[0].x} ${
          points[0].y - (points[0].y - points[1].y) / 2
        }, ${points[1].x} ${points[1].y + (points[0].y - points[1].y) / 2}, ${
          points[1].x
        } ${points[1].y}`}
        fill="transparent"
        stroke="cornflowerblue"
        strokeWidth="4"
        // onMouseDown={() => handleRemovePatchCable(id)}
      />
      <path
        className="hover:cursor-pointer"
        d={`M ${points[0].x} ${points[0].y} C ${points[0].x} ${
          points[0].y - (points[0].y - points[1].y) / 2
        }, ${points[1].x} ${points[1].y + (points[0].y - points[1].y) / 2}, ${
          points[1].x
        } ${points[1].y}`}
        fill="transparent"
        // stroke="black"
        stroke="transparent"
        strokeWidth="16"
        onMouseDown={() => {
          handleRemovePatchCable(id, outId, inId);
        }}
      />
      {points.map((point, i) => (
        <circle
          className="pointer-events-none"
          key={i}
          cx={point.x}
          cy={point.y}
          r="4"
          fill="cornflowerblue"
          onMouseDown={(e) => startDrag(e, i)}
        />
      ))}
    </svg>
  );
};

export default PatchCable;
