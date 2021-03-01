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
      <hr></hr>
      <p>
        We all agreed that the group project was the highlight of our bootcamp
        at DevMountain. Besides learning, it was just plain fun to work with
        others. We would stay on the same discord channel all day, so that it
        felt like we were working right next to the person. We could bounce off
        ideas, ask for help, corroborate, and it really helped us work as a
        team. It was a blast.
      </p>
      <h2>Developers</h2>
      <span className="modal-info">
        <div>
          <h1>Andrew Turner</h1>
          <h2>
            <a
              style={{ textDecoration: "none", color: "#65b0b6" }}
              href="https://aturner.dev/"
              target="_blank"
            >
              aturner.dev
            </a>
          </h2>
          <p>
            Andrew was the api and data passing wizard. He set up the various
            api calls and then combined them all to give us our flight data.
          </p>
        </div>
        <div>
          <h1>Josh Friedel</h1>
          <p>
            Josh built the entire backend and the database. He also set up
            advanced features with nodemailer.
          </p>
        </div>
        <div>
          <h1>Nate Waite</h1>
          <h2>
            <a
              style={{ textDecoration: "none", color: "#65b0b6" }}
              href="https://natewaite.com"
              target="_blank"
            >
              natewaite.com
            </a>
          </h2>
          <p>
            Nate had his hand on almost every aspect of the project. Besides his
            many contributions both small and large, he also implemented all of
            the global state management with Redux and React Context.
          </p>
        </div>
        <div>
          <h1>Nick LoVerde</h1>
          <h2>
            <a
              style={{ textDecoration: "none", color: "#65b0b6" }}
              href="https://nicholasloverde.com/#home"
              target="_blank"
            >
              nicholasloverde.com
            </a>
          </h2>
          <p>
            Nick developed the map using react mapbox gl with geolocation,
            markers, and adding prices. He also created the background video.
          </p>
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
