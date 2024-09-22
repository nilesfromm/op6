import { useEffect, useState, useRef } from "react";
import "./index.css";
import Three from "./3D/ThreeJS";
import UI from "./components/ui";

const oscCount = 6;

export default function View({ patchConnection }) {
  const [stateLoaded, setStateLoaded] = useState(false);
  const [fftData, setFFTData] = useState([]);
  const [amps, setAmps] = useState(Array(oscCount).fill(0.0));
  const [frqs, setFrqs] = useState(Array(oscCount).fill(0.0));
  const [cons, setCons] = useState(Array(oscCount).fill(0));

  const updateValues = (type, index, value) => {
    if (type === "amp") {
      setAmps((prev) => prev.map((amp, i) => (i === index ? value : amp)));
    } else if (type === "frq") {
      setFrqs((prev) => prev.map((frq, i) => (i === index ? value : frq)));
    } else if (type === "con") {
      // setCons((prev) => prev.map((con, i) => (i === index ? value : con)));
    }
  };

  const handleSliderChange = (type, index, value) => {
    updateValues(type, index, value);
    patchConnection?.sendEventOrValue(`${type}Band${index}`, value, 100);
  };

  const handleControlChange = (type, index, value) => {
    // setAmps((prev) => prev.map((amp, i) => (i === index ? value : amp)));
    updateValues(type, index, value);
    patchConnection?.sendEventOrValue(`osc${index}_${type}`, value);
    console.log(type, index, value);
  };

  const handleDftOut = (event) => {
    setFFTData(event.magnitudes);
  };

  useEffect(() => {
    const requestParameterValues = (type) => {
      for (let i = 0; i < oscCount; i++) {
        patchConnection?.requestParameterValue(`osc${i}_${type}`);
      }
    };

    const handleControlChange = (event) => {
      const id = event.endpointID;
      const val = event.value;
      const index = parseInt(id.slice(3, 4));
      const type = id.slice(5, 8);

      // updateValues("amp", 1, 0.5);
      updateValues(type, index, val);
    };

    // Add listeners for DFT output and input controls
    patchConnection?.addEndpointListener("dftOut", handleDftOut);
    patchConnection?.addAllParameterListener(handleControlChange);

    // Load initial state
    if (!stateLoaded) {
      requestParameterValues("amp");
      requestParameterValues("frq");
      requestParameterValues("con");

      setStateLoaded(true);
    }

    return () => {
      patchConnection?.removeEndpointListener("dftOut", handleDftOut);
      patchConnection?.removeAllParameterListener(handleControlChange);
    };
  }, [patchConnection, stateLoaded]);

  return (
    <div className="containerWrapper">
      {/* <div className="canvas3DWrapper">
        <div className="canvas3D">
          <Three loaded={true} amps={amps} frqs={frqs} />
        </div>
      </div> */}
      <UI
        amps={amps}
        frqs={frqs}
        cons={cons}
        handleControlChange={handleControlChange}
      />
    </div>
  );
}
