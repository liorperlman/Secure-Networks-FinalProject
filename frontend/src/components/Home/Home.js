import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/apiContants';
import { withRouter } from "react-router-dom";


function Home(props) {
  

  const redirectToLogin = (event) => {
    event.preventDefault();
    props.updateTitle('Login');
    props.history.push('/login');
  }
  
  const [amount, setAmount] = useState(1);
  const handleAmountInputChange = (event) => {
    setAmount(event.target.value)
  }
  const handleChangePassword = async (event) => {
        event.preventDefault();
        
        // props.boundary(props.boundary);
        props.updateTitle("Change-Password");
        props.history.push("/changepassword");
      }
  
  
  return (
    <div className="App" style={{}}>
      <h3 style={{ textAlign: 'left', color: 'black' }}>{props.username}</h3>
      
      
      {props.username ?
        <h3 style={{ textAlign: 'left', color: 'black' }}>Welcome {props.username} !</h3> : null
      }
      <div className="welcome">
      <button
            className="form-field"
            type="submit"
            onClick={handleChangePassword}>Change Password</button>
      </div>
    </div>
  );
}
export default withRouter(Home);
