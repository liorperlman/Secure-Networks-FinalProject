import React, { Component, useState, useEffect } from 'react';
//import { forgotPassword } from '../helpers/passwords';
import { Link, withRouter } from 'react-router-dom';

import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiContants';

function ForgotPasswordForm(props) {

  const [values, setValues] = useState({
    email: "",
    username: ""
  });
  const [username1, setUsername] = useState('');
  

  const handleEmailInputChange = (event) => {
    setValues({ ...values, email: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault()
    if(values.email){
      const tempUsername = await sendDetailsToServer()
      setUsername(tempUsername)
      console.log("tempUsername = "+tempUsername)
      console.log("username1 = "+username1)
      props.username(tempUsername)
    // setValues(...prevState => ({...prevState, username: values.username}));
    // console.log(username)
      
      props.updateTitle("Reset Password");
      props.history.push('/resetpassword') // redirecting to reset password screen
   }
  }
  

  // useEffect(() => {
  //   const updatedUsername = async () => {
  //    if(tempUsername)
  //     try {
        
  //       setUsername(tempUsername)
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   updatedUsername()
  // }, [tempUsername])


  const sendDetailsToServer = async() => {
    if(values.email.length) {
        props.showError(null);
        
        
       return await axios.get(API_BASE_URL+'/users/forgotpassword/'+values.email)
            .then(function (response) {
                if(response.status === 200){
                    setValues((prevState) => ({
                        ...prevState,
                        'successMessage' : 'Verification code sent through email. Redirecting to reset password page..'
                    }));
                    props.showError(null)
                    return response.data;
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
  
  return (
    <div>
      <p style={{color:'black'}}>Request password reset:</p>
      <form onSubmit={handleSubmit}>
        <input required id="forgotpasswordemail" onChange={handleEmailInputChange} name="email" placeholder="email" type="email" value={values.email}/>
        <button >Submit</button>
      </form>
    </div>
  );
  
}

export default withRouter(ForgotPasswordForm);