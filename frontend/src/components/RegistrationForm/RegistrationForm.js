import axios from 'axios';
import './RegistrationForm.css';
import React, { useState } from 'react';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import {isPasswordValid} from "../Utils/Utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "./RegistrationForm.css"
import { hashPassword } from "../../constants/apiContants"


function RegistrationForm(props) {
  const [values, setValues] = useState({
    username:"",
    password:"",
    email:""
  });
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [passwordType, setPasswordType] = useState(false);
  const eye = <FontAwesomeIcon icon={faEye} />;

  const handleUsernameInputChange = (event) => {
    setValues({...values, username: event.target.value})
  }
  const handleEmailInputChange = (event) => {
    setValues({...values, email: event.target.value})
  }
  const handlePasswordInputChange = (event) => {
    if (!isPasswordValid(event.target.value)) {console.log("password error")}
    setValues({...values, password: event.target.value})
  }
  const handleSubmit = (event) => {
      event.preventDefault();
      // console.log(sha1(sha1(values.username+values.password).toString() + values.password).toString())
      if(values.email && isPasswordValid(values.password) && values.username){
        setValid(true);
        sendDetailsToServer();
        props.newUser(values);         
        props.updateTitle('Login');    
        props.history.push('/login'); 
      }
      setSubmitted(true);
  }  
  const redirectToHome = (event) => {
    event.preventDefault();
    props.updateTitle('Home');
    props.history.push('/home');   
  }

  const sendDetailsToServer = () => {
    if(values.email.length && values.password.length && values.username.length) {
        props.showError(null);
        const userDetails={
          "username":values.username,
          "password":hashPassword(values.username, values.password),
          "email":values.email.toLowerCase()  
        }
        axios.post(API_BASE_URL+'/users', userDetails)
            .then(function (response) {
                if(response.status === 200){
                    setValues(prevState => ({
                        ...prevState,
                        'successMessage' : 'Registration successful. Redirecting to login page..'
                    }))
                    props.showError(null)
                } else{
                    props.showError("Some error ocurred12");
                }
            })
            .catch(function (error) {
                console.log(error);
            });    
    } else {
        props.showError('Please enter valid user details')    
    }
}
const togglePassword =(e)=>{
  e.preventDefault()
  setPasswordType(!passwordType);    
}
// const sha1 = (data) => {
//   return crypto.createHash("sha1").update(data, "binary").digest("hex");
// }


  return (
    <div className="form-container">
      <form className="register-form">
        {submitted && valid ? <div className="success-message">Success! Thank you for registering</div> : null}
        <div className="form-group text-left">
        <input
            onChange={handleUsernameInputChange}
            value = {values.username}
            className="form-field"
            placeholder="Username"
            name="username" />
        </div>
        {submitted && !values.username ? <span>Please enter a valid username</span> : null}
        <div className="form-group text-left">
        <input
            onChange={handlePasswordInputChange}
            value = {values.password}
            className="form-field"
            placeholder="Password"
            name="password" 
            type={passwordType ? "text" : "password"}/>    
        </div>
        
        { submitted && !isPasswordValid(values.password) ? (
            <label style={{color: 'red', fontSize: '16px'}}>Please enter a valid Password</label>
          ) : null}
        <i onClick={togglePassword}>{eye}</i>
        <div className="form-group text-left">
        <input
            onChange={handleEmailInputChange}
            value = {values.email}
            className="form-field"
            placeholder="Email"
            name="email" />
        </div>
        {submitted && !values.email ? <span>Please enter a valid email</span> : null}
        <button
            className="form-field"
            type="submit"
            onClick={handleSubmit}
            >Register</button>
            
         <button
            className="form-field"
            type="submit"
            onClick={redirectToHome}>Home</button>
      </form>
    </div>
  );
}

 export default withRouter(RegistrationForm);