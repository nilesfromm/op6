import React, { useState } from "react";

const Radio = ({ Id, value, handleChange }) => {
  const [selectedValue, setSelectedValue] = useState("0");

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    handleChange("con", Id, event.target.value);
  };

  return (
    <div>
      <div>
        <input
          type="radio"
          value="1"
          checked={selectedValue === "1"}
          onChange={handleRadioChange}
        />
      </div>
      <div>
        <input
          type="radio"
          value="2"
          checked={selectedValue === "2"}
          onChange={handleRadioChange}
        />
      </div>
      <div>
        <input
          type="radio"
          value="4"
          checked={selectedValue === "4"}
          onChange={handleRadioChange}
        />
      </div>
    </div>
  );
};

export default Radio;
