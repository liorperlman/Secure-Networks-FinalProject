import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";
import { API_BASE_URL } from "../../constants/apiContants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "./ResetPasswordForm.css"
import {isPasswordValid} from "../Utils/Utilities.js"
import { hashPassword } from "../../constants/apiContants"

/*
combine both methods getCurrentUser & ChangeUserPassword ** CHECK why forgotpasswordform isnt displayed
--- combined the use of them in handleSubmit, not showing cuz it doesnt find the mail in the backend (it's ok)
*/
function ResetPasswordForm(props) {

  const [values, setValues] = useState({
    resetCode: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const [passwordType, setPasswordType] = useState(false);
  const eye = <FontAwesomeIcon icon={faEye} />;
  const [submitted, setSubmitted] = useState(false);
    const handleResetCodeInputChange = (event) => {
        setValues({ ...values, resetCode: event.target.value });
    };
    const handleEmailInputChange = (event) => {
        setValues({ ...values, email: event.target.value });
    };
    const handlePasswordInputChange = (event) => {
        setValues({ ...values, password: event.target.value });
    };
    const handlePasswordConfirnationInputChange = (event) => {
      setValues({ ...values, password_confirmation: event.target.value });
    };
    
  

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!isPasswordValid(values.password) || values.password !== values.password_confirmation) {
      alert("Passwords don't match or not strong enough");
      setValues({ ...values, password: "", password_confirmation: ""});     //clean password & password_confirmation fields
    } else if (values.resetCode && values.email) {
        ResetUserPassword();
        // userDetails.username = tempUserDetails.username;
        props.updateTitle('Login');    
        props.history.push('/login');   //Redirecting to login page..
    }
    else alert("Please enter email and reset code");
  }

  
    const ResetUserPassword = async () => {
    
    // if(values.email && values.password && values.resetCode && values.password === values.password_confirmation){
        props.showError(null);
        console.log(props.username)
          const userDetails={
            "resetCode":values.resetCode,
            "email":values.email,
            "password":hashPassword(props.username, values.password)
        }
        axios.put(API_BASE_URL+'/users/resetpassword/', userDetails)
            .then(function (response) {
                if(response.status === 200){
                    setValues(prevState => ({
                        ...prevState,
                        'successMessage' : 'Reset Password successful. Redirecting to login page...'
                    }))
                    props.showError(null)
                } else{
                    props.showError("bad request");
                }
            })
            .catch(function (error) {
                console.log(error);
            }); 
           
        // }
        // else{

        // }
}
const togglePassword =(e)=>{
  e.preventDefault()
  setPasswordType(!passwordType);    
}

    return (
        <div>
        <form onSubmit={handleSubmit} style={{  color: 'black' }}>
          <label for="resetCode">Reset Code:</label>
          <input required id="resetCode" onChange={handleResetCodeInputChange} name="resetCode" placeholder="resetCode" type="resetCode" value={values.resetCode}/>
          <p></p>
          <h3 style={{ color: 'black' }}>{props.username}</h3>
          <label for="email">Email:</label>
          <input required id="email" onChange={handleEmailInputChange} name="email" placeholder="email" type="email" value={values.email}/>
          <p></p>
          <label for="password">New password:</label>
          <input required id="password" onChange={handlePasswordInputChange} name="password" placeholder="password" type={passwordType ? "text" : "password"} value={values.password}/>
          { submitted && !isPasswordValid(values.password) ? (
            <label style={{color: 'red', fontSize: '16px'}}>Please enter a valid Password</label>
          ) : null}
          <i onClick={togglePassword}>{eye}</i>
          <p></p>
          <label for="password_confirmation">Confirm new password:</label>
          <input required id="password_confirmation" onChange={handlePasswordConfirnationInputChange} name="password_confirmation" placeholder="password confirmation" type={passwordType ? "text" : "password"} value={values.password_confirmation}/>
          <p></p>
          <button type="secondary">Reset Password</button>
        </form>
        </div>
    );
  }

export default withRouter(ResetPasswordForm);