import React from "react";
import loader from "../assets/image/loader.gif";
const Loader = () => {
  return (
    <div className="loaderDiv">
      <img style={{ height: "130px" }} src={loader} alt="" />
    </div>
  );
};

export default Loader;
