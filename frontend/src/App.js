import './App.css';
import React, { useState } from 'react';
import Home from './components/Home/Home';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';
import Header from './components/HeaderComponent/HeaderComponent';
import AlertComponent from './components/AlertComponent/AlertComponent'
import ForgotPasswordForm from './components/ForgotPasswordComponent/ForgotPasswordForm';
import ChangePasswordForm from './components/ChangePasswordComponent/ChangePasswordForm';
import ResetPasswordForm from './components/ResetPasswordComponent/ResetPasswordForm';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  const [errorMessage, updateErrorMessage] = useState(null);
  const [title, updateTitle] = useState(null);
  const [userRegister, createUser] = useState({username:'', password:'', email:''});
  const [userBoundary, setUserBoundary] = useState({username:'', password:'', email:''});
  const [usernameBoundary, setUsernameBoundary] = useState(null);

  return ( <Router>
    <div className="App">
      <Header title={title}/>
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <LoginForm showError={updateErrorMessage} updateTitle={updateTitle} registrationDetails={userRegister} boundary={setUserBoundary}/>
            </Route>
            <Route path="/register">
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} newUser={createUser}/>
            </Route>
            <Route path="/login">
              <LoginForm showError={updateErrorMessage} updateTitle={updateTitle} registrationDetails={userRegister} boundary={setUserBoundary} >
                {console.log(userBoundary)}
              </LoginForm> 
            </Route>
            <Route path="/changepassword">
              <ChangePasswordForm showError={updateErrorMessage} updateTitle={updateTitle} boundary={userBoundary}/> 
            </Route>
            <Route path="/forgotpassword">
              <ForgotPasswordForm showError={updateErrorMessage} updateTitle={updateTitle} username={setUsernameBoundary}/> 
            </Route>
            <Route path="/home">
              <Home showError={updateErrorMessage} updateTitle={updateTitle} username={userBoundary.username}/> 
            </Route>
            <Route path="/resetpassword">
              <ResetPasswordForm showError={updateErrorMessage} updateTitle={updateTitle} username={usernameBoundary} /> 
            </Route>
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </div>
    </div>
    </Router>
  );
  
}

export default App;