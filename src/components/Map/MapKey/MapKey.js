import React from "react";
import "./mapKey.css";
function MapKey(props) {
  return (
    <div className="map-key">
      <ul>
        <li>
          <h5>&#60;100</h5>
          <div className="hun"></div>
        </li>
        <li>
          <h5>&#60;200</h5>
          <div className="two"></div>
        </li>
        <li>
          <h5>&#60;400</h5>
          <div className="four"></div>
        </li>
        <li>
          <h5>&#60;600</h5>
          <div className="six"></div>
        </li>
        <li>
          <h5>&#60;800</h5>
          <div className="eight"></div>
        </li>
        <li>
          <h5>&#60;1000</h5>
          <div className="thou"></div>
        </li>
        <li>
          <h5>&#62;1000</h5>
          <div className="over"></div>
        </li>
      </ul>
    </div>
  );
}

export default MapKey;
