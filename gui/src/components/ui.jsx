import { useEffect, useState, useRef } from "react";
import Slider from "./slider";
import Dial from "./dial";
import Radio from "./radio";
import Patchbay from "./patchbay/patchbay";

const UI = ({ amps, frqs, cons, handleControlChange }) => {
  // const [selectedValue, setSelectedValue] = useState("");

  // const handleRadioChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };
  return (
    <div className="flex flex-col">
      {/* <div className=" w-[600px] h-[600px] flex flex-col bg-coral p-0 m-0"> */}
      <div className="h-full w-full p-8 flex items-center justify-center">
        <Patchbay handleChange={handleControlChange} />
      </div>
      <div className="flex justify-center gap-3">
        {amps.map((amp, i) => (
          <div className="controls" key={i}>
            <Slider Id={i} value={amps[i]} handleChange={handleControlChange} />
            <Dial
              Id={i}
              value={frqs[i]}
              onChange={handleControlChange}
              min={0}
              max={1000}
            />
            {/* <Radio Id={i} value={cons[i]} handleChange={handleControlChange} /> */}
          </div>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
};

export default UI;
