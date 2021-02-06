import axios from "axios";
import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../../Redux/userReducer";
import { ClipLoader } from "react-spinners";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");

  function userLogin() {
    setErrorMessage("");
    if (email === " " || password === "") {
      return setErrorMessage("Missing Required Fields");
    }
    setLoading(true);
    axios
      .post("/api/auth/login", { email, password })
      .then((res) => {
        props.loginUser(res.data);
        props.history.push("/");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMessage(err.response.data);
      });
  }
  return (
    <div className="auth-view">
      {loading ? (
        <div className="login-field">
          <h1 style={{ color: "#cae00d" }}>Fetching your profile...</h1>
          <ClipLoader color={"#cae00d"} />
        </div>
      ) : (
        <form className="login-field">
          <div className="register-input-field">
            <div className="register-header">
              <h2>Welcome Back</h2>
              <h4>
                Not a member yet?
                <h4>
                  <Link
                    style={{ textDecoration: "none", color: "#cae00d" }}
                    to="/signup"
                  >
                    Signup
                  </Link>
                </h4>
              </h4>
            </div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="register-inputs"
              type="email"
              placeholder="Email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="register-inputs"
              type="password"
              placeholder="Password"
            />
            {errorMessage && <h5 className="error-message">{errorMessage}</h5>}
            <button onClick={() => userLogin()} className="register-button">
              Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default withRouter(connect(null, { loginUser })(Login));
