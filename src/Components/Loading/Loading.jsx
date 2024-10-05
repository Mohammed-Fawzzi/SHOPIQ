import React from "react";
import { CirclesWithBar } from "react-loader-spinner";

export default function Loading() {
  return (
    <>
      <div className="container-fluid">
        <div className="position-fixed start-0 end-0 bottom-0 top-0 d-flex justify-content-center align-items-center bg-light">
          <CirclesWithBar
            height="100"
            width="100"
            color="#007bff"
            outerCircleColor="#007bff"
            innerCircleColor="#007bff"
            barColor="#007bff"
            ariaLabel="circles-with-bar-loading"
            visible={true}
          />
        </div>
      </div>
    </>
  );
}
