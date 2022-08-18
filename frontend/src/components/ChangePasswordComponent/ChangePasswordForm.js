import axios from 'axios';
import React, { useState } from 'react';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "./ChangePasswordForm.css"
import {isPasswordValid} from "../Utils/Utilities.js"
import { hashPassword } from "../../constants/apiContants"

function ChangePasswordForm(props) {
  const [values, setValues] = useState({
    currentPassword:"",
    newPassword:""
  });
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [passwordType, setPasswordType] = useState(false);
  const eye = <FontAwesomeIcon icon={faEye} />;

  const handleCurrentPasswordInputChange = (event) => {
    setValues({...values, currentPassword: event.target.value})
  }
  const handleNewPasswordInputChange = (event) => {
    setValues({...values, newPassword: event.target.value})
  }
  
  const handleSubmit = (event) => {
      event.preventDefault();
      if(values.currentPassword && isPasswordValid(values.newPassword) && hashPassword(props.boundary.username, values.currentPassword)  === props.boundary.password){
        setValid(true);
        sendDetailsToServer();
        props.updateTitle('Home');
        props.history.push('/home'); 
      }
      else{ return}
      setSubmitted(true);
  }  
  const redirectToHome = (event) => {
    event.preventDefault();
    props.updateTitle('Home');
    props.history.push('/home');   
  }

  const sendDetailsToServer = () => {
    if(values.currentPassword.length && values.newPassword.length) {
        props.showError(null);
        const user={
          "username":props.boundary.username,
          "password":hashPassword(props.boundary.username, values.currentPassword)  
        }
        const update={
            "username":props.boundary.username,
            "password":hashPassword(props.boundary.username, values.newPassword),
            "email":props.boundary.email
        }
        const updateBoundary={user, update}
        console.log(updateBoundary)
        axios.put(API_BASE_URL+'/users/update', updateBoundary)
            .then(function (response) {
                if(response.status === 200){
                    setValues(prevState => ({
                        ...prevState,
                        'successMessage' : 'Password has been changed. Redirecting to home page..'
                    }))
                    props.showError(null)
                } 
                else{
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


  return (
    <div className="form-container">
      <form className="register-form">
        {submitted && valid ? <div className="success-message">Success! Password Updated!</div> : null}
        <div className="form-group text-left">
        <input
            onChange={handleCurrentPasswordInputChange}
            value = {values.currentPassword}
            className="form-field"
            placeholder="Current Password"
            name="currentPassword"
            type={passwordType ? "text" : "password"}/>
            
        </div>
        {submitted && !values.currentPassword ? <span>Please enter a valid password</span> : null}
        <div className="form-group text-left">
        <input
            onChange={handleNewPasswordInputChange}
            value = {values.newPassword}
            className="form-field"
            placeholder="New Password"
            name="newPassword" 
            type={passwordType ? "text" : "password"}/>
        </div>
        { submitted && !isPasswordValid(values.newPassword) ? (
            <label style={{color: 'red', fontSize: '16px'}}>Please enter a valid Password</label>
          ) : null}
        <i onClick={togglePassword}>{eye}</i>
       
        <button
            className="form-field"
            type="submit"
            onClick={handleSubmit}>Submit</button>
         <button
            className="form-field"
            type="submit"
            onClick={redirectToHome}>Home</button>
      </form>
    </div>
  );
}

export default withRouter(ChangePasswordForm);