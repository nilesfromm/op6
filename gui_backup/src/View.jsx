import { useEffect, useState, useRef } from "react";
import { SpectrumAnalyzer } from "./SpectrumAnalyzer";
import "./index.css";

// const SAMPLE_RATE = 44100;

const UI = ({ amps, freqs, handleSliderChange }) => {
  return (
    <div className="ui">
      {amps.map((amp, i) => (
        <div
          key={i}
          style={{
            position: "relative",
            backgroundColor: "coral",
            left: `${(i / amps.length) * 76.8 + 21.75}%`,
          }}
        >
          <input
            className="freq-slider"
            type="range"
            value={amp}
            min={0.0}
            max={1.0}
            step={0.001}
            onChange={(e) => handleSliderChange("amp", i, e.target.value)}
            onDoubleClick={() => {
              handleSliderChange("amp", i, 1.0);
            }}
          />
          <input
            className="pan-slider"
            type="range"
            min={-1.0}
            max={1.0}
            step={0.001}
            value={freqs[i]}
            onChange={(e) => handleSliderChange("pan", i, e.target.value)}
            onDoubleClick={() => {
              handleSliderChange("pan", i, 0.0);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default function View({ patchConnection }) {
  const [stateLoaded, setStateLoaded] = useState(false);
  const [freqs, setFreqs] = useState(Array(8).fill(0.0));
  const [amps, setAmps] = useState(Array(8).fill(0.0));

  const updateValues = (type, index, value) => {
    if (type === "amp") {
      setAmps((prev) => prev.map((amp, i) => (i === index ? value : amp)));
    } else if (type === "freq") {
      // setPans((prev) => prev.map((pan, i) => (i === index ? value : pan)));
    }
  };

  const handleSliderChange = (type, index, value) => {
    updateValues(type, index, value);
    patchConnection?.sendEventOrValue(`osc${index}_${type}`, value, 100);
  };

  // useEffect(() => {
  //   const requestParameterValues = (type) => {
  //     for (let i = 0; i < FILTER_FREQS.length; i++) {
  //       patchConnection?.requestParameterValue(`osc${index}_${type}`);
  //     }
  //   };

  //   const handleControlChange = (event) => {
  //     const id = event.endpointID;
  //     const val = event.value;
  //     const index = parseInt(id.slice(-1));
  //     const type = id.slice(0, 3);

  //     updateValues(type, index, val);
  //   };

  //   // Add listeners for DFT output and input controls
  //   patchConnection?.addAllParameterListener(handleControlChange);

  //   // Load initial state
  //   if (!stateLoaded) {
  //     requestParameterValues("amp");
  //     requestParameterValues("pan");

  //     setStateLoaded(true);
  //   }

  //   return () => {
  //     patchConnection?.removeAllParameterListener(handleControlChange);
  //   };
  // }, [patchConnection, stateLoaded]);

  return (
    <div className="container">
      <div className="stack">
        <UI amps={amps} freqs={freqs} handleSliderChange={handleSliderChange} />
      </div>
    </div>
  );
}
