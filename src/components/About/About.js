import React, { useContext, useState } from "react";
import { Context } from "../../context/context";
import "./about.css";

function About(props) {
  const context = useContext(Context);

  const modal = (
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <span className="close" onClick={closeModal}>
        &times;
      </span>
      <div className="modal-header-info">
        <h2>Welcome to Savvy Travels</h2>
        <p>Please have a look around</p>
      </div>
      <h2>Developers</h2>
      <span className="modal-info">
        <div>
          <h1>Andrew Turner</h1>
          <h2>builtthewholeappbymyself.com</h2>
        </div>
        <div>
          <h1>Josh Friedel</h1>
          <h2>checkoutmynodemailer.com</h2>
        </div>
        <div>
          <h1>Nate Waite</h1>
          <h2>imbasicallybetterthaneveryone.com</h2>
        </div>
        <div>
          <h1>Nick LoVerde</h1>
          <h2>ibreakeverything.com</h2>
        </div>
      </span>
    </div>
  );

  const divStyle = {
    display: context.modal ? "block" : "none",
  };

  function closeModal(e) {
    e.stopPropagation();
    context.selectModal();
  }
  return (
    <div style={divStyle} className="modal" onClick={closeModal}>
      {context.modal ? modal : null}
    </div>
  );
}

export default About;
