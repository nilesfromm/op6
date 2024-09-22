import { useEffect, useState, useRef } from "react";
import { nanoid } from "nanoid";
import OutputNode from "./outputNode";
import InputNode from "./inputNode";
import PatchCable from "./patchCable";

const TopLabels = ({ osc }) => {
  return (
    <div className="flex font-space text-gray-600 mx-1.5">
      <h1 className="text-sm -rotate-90 w-5 whitespace-nowrap">{`fm ${osc}`}</h1>
      <h1 className="text-sm -rotate-90 w-5 whitespace-nowrap">{`out${osc}`}</h1>
      <h1 className="text-sm -rotate-90 w-5 whitespace-nowrap">{`am ${osc}`}</h1>
    </div>
  );
};

const BottomLabels = ({ osc }) => {
  return (
    <div className="flex font-space text-gray-600 mt-1 mx-[18.5px]">
      <h1 className="text-sm whitespace-nowrap">{`osc${osc}`}</h1>
    </div>
  );
};

const Patchbay = ({ handleChange }) => {
  const svgRef = useRef(null);

  const [patchCables, setPatchCables] = useState([]);

  const [connections, setConnections] = useState([0, 0, 0, 0, 0, 0]);

  const outs = 6;
  const ins = 6;

  const updateConnections = (outId, inId, state) => {
    console.log("updating connections");
    console.log(outId + " -> " + inId + " : " + state);

    setConnections((prevConnections) => {
      const newConnections = [...prevConnections];
      if (state) {
        newConnections[outId] = newConnections[outId] | (1 << inId);
      } else {
        newConnections[outId] = newConnections[outId] & ~(1 << inId);
      }
      handleChange("con", outId, newConnections[outId]);
      // console.log(newConnections[outId]);
      return newConnections;
    });

    //set nth bit of connections[outId] based on bit
    // setConnections((prevConnections) => [
    //   ...prevConnections,
    //   (prevConnections[outId] = prevConnections[outId] ^ bit),
    // ]);

    // setConnections((prevConnections) => {
    //   prevConnections[outId] = prevConnections[outId] ^ bit;
    //   return prevConnections;
    // });
    // console.log(connections);
  };

  const createPatchCable = (outId, startPt) => {
    setPatchCables((prevCables) => [
      ...prevCables,
      { id: nanoid(), outId, startPt },
    ]);
    // console.log(patchCables);
  };

  const removePatchCable = (id, outId, inId) => {
    //remove patch cable at id
    setPatchCables((prevCables) =>
      prevCables.filter((cable) => cable.id !== id)
    );
    updateConnections(outId, inId, 0);
  };

  // useEffect(() => {
  //   console.log("updated connections:");
  //   console.log(connections);
  // }, [connections]);

  return (
    <div>
      <div className="flex w-full justify-center p-2">
        {[...Array(outs)].map((node, i) => (
          <TopLabels osc={i} />
        ))}
      </div>
      <div className="h-[240px] w-[500px] bg-gray-200">
        <svg viewBox="0 0 500 240">
          {patchCables.map((cable) => (
            <PatchCable
              key={`cable-${cable.id}`}
              id={cable.id}
              outId={cable.outId}
              startPt={cable.startPt}
              handleRemovePatchCable={removePatchCable}
              onMouseDown={() => console.log("hovering over cable")}
              updateConnections={updateConnections}
            />
          ))}
          {[...Array(ins)].map((node, i) => (
            <InputNode key={`input-${i}`} i={i} />
          ))}
          {[...Array(outs)].map((node, i) => (
            <OutputNode
              key={`output-${i}`}
              i={i}
              handleCreatePatchCable={createPatchCable}
            />
          ))}
          <g transform="translate(-10, -10)">
            <path
              style={{
                pointerEvents: "none",
                webkitFilter:
                  "drop-shadow( 0px 0px 16px rgba(10, 10, 10, 0.4))",
                filter: "drop-shadow( 0px 0px 16px rgba(10, 10, 10, 0.4))",
                boxShadow: "0px 0px 16px rgba(10, 10, 10, 0.4)",
              }}
              fill="rgb(240, 240, 240)"
              class="cls-1"
              d="M0,0v260h520V0H0ZM510.01,242h-.01c0,4.42-3.58,8-8,8h-59.43c0-2.21-1.79-4-4-4s-4,1.79-4,4h-63.43c0-2.21-1.79-4-4-4s-4,1.79-4,4h-63.43c0-2.21-1.79-4-4-4s-4,1.79-4,4h-63.43c0-2.21-1.79-4-4-4s-4,1.79-4,4h-63.43c0-2.21-1.79-4-4-4s-4,1.79-4,4h-63.43c0-2.21-1.79-4-4-4s-4,1.79-4,4H18c-4.42,0-8-3.58-8-8V18c0-4.42,3.58-8,8-8h39.43c0,2.21,1.79,4,4,4s4-1.79,4-4h12c0,2.21,1.79,4,4,4s4-1.79,4-4h12c0,2.21,1.79,4,4,4s4-1.79,4-4h23.43c0,2.21,1.79,4,4,4s4-1.79,4-4h12c0,2.21,1.79,4,4,4s4-1.79,4-4h12c0,2.21,1.79,4,4,4s4-1.79,4-4h23.43c0,2.21,1.79,4,4,4s4-1.79,4-4h12c0,2.21,1.79,4,4,4s4-1.79,4-4h12c0,2.21,1.79,4,4,4s4-1.79,4-4h23.43c0,2.21,1.79,4,4,4s4-1.79,4-4h12c0,2.21,1.79,4,4,4s4-1.79,4-4h12c0,2.21,1.79,4,4,4s4-1.79,4-4h23.43c0,2.21,1.79,4,4,4s4-1.79,4-4h12c0,2.21,1.79,4,4,4s4-1.79,4-4h12c0,2.21,1.79,4,4,4s4-1.79,4-4h23.43c0,2.21,1.79,4,4,4s4-1.79,4-4h12c0,2.21,1.79,4,4,4s4-1.79,4-4h12c0,2.21,1.79,4,4,4s4-1.79,4-4h39.43c4.42,0,8,3.58,8,8v224Z"
            />
          </g>
        </svg>
      </div>
      <div className="flex w-full justify-center">
        {[...Array(outs)].map((node, i) => (
          <BottomLabels osc={i} />
        ))}
      </div>
    </div>
  );
};

export default Patchbay;
