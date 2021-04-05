import React from "react";
import "../assets/styles/button.css";

const Buttons = ({ setDataDisplayedOnChart, dataDisplayedOnChart }) => {
  return (
    <div className="buttons">
      <button
        onClick={() => setDataDisplayedOnChart(dataDisplayedOnChart + 50)}
      >
        Add 50 to Chart
      </button>
      <button
        onClick={() =>
          dataDisplayedOnChart <= 50
            ? ""
            : setDataDisplayedOnChart(dataDisplayedOnChart - 50)
        }
      >
        Remove 50 from Chart
      </button>
    </div>
  );
};

export default Buttons;
