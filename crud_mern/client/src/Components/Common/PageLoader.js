import React from "react";
import { Spinner } from "react-bootstrap";

const PageLoader = () => {
  return (
    <div style={{ textAlign: "center", paddingTop: "100px" }}>
      <Spinner animation="grow" role="status">
        <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
          <circle cx="22" cy="22" r="20" fill="none" strokeWidth="4"></circle>
        </svg>
      </Spinner>
    </div>
  );
};

export default PageLoader;
