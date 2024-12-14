import React from "react";
import "../../css/underConstruction.css"; // Create this file for styles

const UnderConstruction = () => {
  return (
    <>
      <center className="my-3">
        <div id="mid">
          <p className="">
            <img
              src={"/image/settingGear-icon.png"}
              id="gear1"
              className="rotating-image"
              alt="Rotating Gear"
            />
            <img
              src={"/image/settingGear-icon.png"}
              id="gear2"
              className="rotating-image"
              alt="Rotating Gear 2"
            />
          </p>
        </div>
      </center>
      <div id="gate" className="mt-3">Under Construction</div>
    </>
  );
};

export default UnderConstruction;
