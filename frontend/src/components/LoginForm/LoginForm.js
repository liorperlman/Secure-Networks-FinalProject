import axios from "axios";
import React, { useState } from "react";
import { API_BASE_URL } from "../../constants/apiContants";
import facebook_icon from "../../facebook.png";
import instagram_icon from "../../instagram.jpg";
import Comments from "../CommentComponent/Comments";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "./LoginForm.css"
import {isPasswordValid} from "../Utils/Utilities.js"
import { hashPassword } from "../../constants/apiContants"

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

function LoginForm(props) {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [valid, setValid] = useState(false);
  const [passwordType, setPasswordType] = useState(false);
  const eye = <FontAwesomeIcon icon={faEye} />;

  const redirectToRegister = (event) => {
    event.preventDefault();
    setRegistered(true);
    props.updateTitle("Register");
    props.history.push("/register");
  };
  const redirectToForgotPassword = (event) => {
    event.preventDefault();
    props.updateTitle("Forgot Password");
    props.history.push("/forgotpassword");
  };
  
  const handleUsernameInputChange = (event) => {
    setValues({ ...values, username: event.target.value });
  };
  const handlePasswordInputChange = (event) => {
    if (!isPasswordValid(event.target.value)) {console.log("password error")}
    setValues({ ...values, password: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (values.username && values.password) {
      const tempUserBoundary = await getDetailsFromServer();
      setUserDetails(tempUserBoundary);
      console.log(tempUserBoundary.username + " " + tempUserBoundary.password);
      if (
        tempUserBoundary.username === values.username &&
        tempUserBoundary.password === hashPassword(values.username, values.password)
      ) {
        setValid(true);
        props.boundary(tempUserBoundary);
        console.log(tempUserBoundary)
        props.updateTitle("Home");
        props.history.push("/home");
      }
    }
    setLoggedIn(true);
  };
  const handleLogout = (event) => {};

  const redirectToHome = (event) => {
    event.preventDefault();
    props.updateTitle("Home");
    props.history.push("/home");
  };
  

  const getDetailsFromServer = async () => {
    if (values.username.length && values.password.length) {
      props.showError(null);
      const userDetails={
        "username":values.username,
        "password":hashPassword(values.username, values.password)
      }
      return await axios
        .put(
          API_BASE_URL + "/users/login/", userDetails
        ) //returns the requested object(according to the url) or none
        .then(function (response) {
          console.log(response.code + " " + response.data.code);
          if (response.status === 200) {
            setUserDetails((prevState) => ({
              ...prevState,
              successMessage: "Login successful. Redirecting to home page..",
            }));
            props.showError(null);
            return response.data;
          } else if (response.data.code === 204) {
            props.showError("Space and email do not match");
          } else {
            props.showError("Some error ocurred");
          }
        })
        .catch(function (error) {
          console.log("Some error occured");
        });
    } else {
      props.showError("Please enter valid user details");
    }

    
  };
  const togglePassword =(e)=>{
    e.preventDefault()
    setPasswordType(!passwordType);    
  }

  return (
    <div className="Login-background">
      <header className="App-header">
        <label style={{ fontSize: "50px", color: "black", fontWeight: "bold" }}>
          {"Comunication_LTD"}
        </label>
        <form className="login-form">
          {loggedIn && valid ? (
            <div className="success-message">
              Success! Thank you for logging in
            </div>
          ) : null}
          <input
            onChange={handleUsernameInputChange}
            value={values.username}
            className="form-field"
            placeholder="Username"
            name="username"
          />
          {loggedIn && !values.username ? (
            <span style={{color: 'red', fontSize: '16px'}}>Please enter a valid Username</span>
          ) : null}
          <input
            onChange={handlePasswordInputChange}
            value={values.password}
            className="form-field"
            placeholder="Password"
            name="password"
            type={passwordType ? "text" : "password"}
          />
          { loggedIn && !isPasswordValid(values.password) ? (
            <label style={{color: 'red', fontSize: '16px'}}>Please enter a valid Password</label>
          ) : null}
          <i onClick={togglePassword}>{eye}</i>
          <button className="form-field" type="submit" onClick={handleSubmit}>
            Log In
          </button>
        </form>
        <form className="registration-form">
          {registered ? <div className="registration-request"></div> : null}
          <button
            className="form-field"
            type="submit"
            onClick={redirectToRegister}
          >
            Register
          </button>
          <button
            className="form-field"
            type="submit"
            onClick={redirectToForgotPassword}
          >
            Forgot Password
          </button>
        </form>
        <Comments commentsUrl="http://localhost:3004/comments"
        currentUserId="1">

        </Comments>
        <p style={{ fontSize: "30px", color: "black", fontWeight: "bold" }}>
          Find us on social medias!
        </p>
        <img
          src={facebook_icon}
          className="App-facebook_icon"
          alt="facebook_icon"
          width="100"
          height="50"
        />
        <img
          src={instagram_icon}
          className="App-instagram_icon"
          alt="instagram_icon"
          width="100"
          height="50"
        />
        <a
          className="App-link"
          href="https://www.ccbham.org/Club/Scripts/Home/home.asp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit our website
        </a>
      </header>
    </div>
  );
}
export default withRouter(LoginForm);