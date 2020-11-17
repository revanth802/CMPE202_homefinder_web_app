import React, { Component } from 'react';
// import { Form } from "react-bootstrap";
import axios from 'axios';
import { Redirect } from "react-router";
import {backendServer} from '../../webconfig.js'

import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      persona: "seller",
      loginFlag: false,
      showerrormessage: false,
      redirecttohome: false,
    };
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);  
}

componentWillMount() {
    this.setState({
        authFlag: false
    })
}

emailChangeHandler = (e) => {
    this.setState({
        email: e.target.value
    })
}

passwordChangeHandler = (e) => {
    this.setState({
        password: e.target.value
    })
}


userTypeChangeHandler = (e) => {
    this.setState({
        type: e.target.value
    })
}


handleChange = (e) => {
    console.log('e', e.target.name);
    console.log('e', e.target.value);
    if(this.state.showLoginError){
        this.setState({
            showLoginError: false
        })
    }
    this.setState({ 
        [e.target.name]: e.target.value
    })
}


handleLogin = (e) => {
    const form = document.getElementById("signIn");
    form.reportValidity();
    if (form.checkValidity()) {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        console.log('req.body', data);
        axios.post(`${backendServer}/login/`, data)
            .then(response => {
                if(response){
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("id", response.data._id);
                    localStorage.setItem("name", response.data.name);
                    localStorage.setItem("type", response.data.userType);
                    if(response.data.userType === 'buyer'){
                        window.location.href = "/userdashboard";
                    }
                    else if(response.data.userType === 'Seller'){
                        window.location.href = "/sellerinventory";
                    }
                    else{
                        window.location.href = "/admin-dashboard";
                    }
                    this.setState({ redirectToHome: true });
                    this.setState({
                        authFlag: true
                    })
                }else{
                    this.setState({
                        showLoginError: true
                    })
                }
            }
            ).catch(ex => {
                this.setState({
                    showLoginError: true
                })
            });
    }

}



  render() {
    let redirectVar = null;
   

    if (this.state.redirectToHome) {
        redirectVar = <Redirect push to="/somewhere/else" />
    }
    return (

        <div>
            {redirectVar}
       
           
            
                        <div>
                            <a href="/login">
                               
                                {redirectVar}
                            </a>
                        </div>
                    
                        <div>
                         
                            {this.state.showLoginError && 
                            
                                  
                                        <div><h4>Important Message!</h4><i></i><div>
                                            <ul>
                                                <li><span>
                                                    Invalid credentials. Please check your username and password.
                                        </span></li>
                                            </ul>
                                        </div></div>
                            }
                            <div>
                                        <form id="signIn">

                                                    <div >
                                                        <h1>
                                                            Sign-In
                          </h1>
                                                        <div>
                                                            <label>
                                                                Email 
                            </label>
                                                            <input onChange={this.handleChange} required type="email" maxLength={128} id="ap_email" name="email"/>
                                                          
                                                        </div>
                                                        <input type="hidden" name="create" />
                                                     
                                                                <div>
                                                                    <label htmlFor="ap_password">
                                                                        Password
                                </label>
                                <input onChange={this.handleChange} required type="password" maxLength={1024} id="ap_password" name="password" />

                                                                </div>
                                                               
                                                           
                                                        <div>
                                                            <input type="button"  value = "Sign-In" onClick={this.handleLogin}  />
                                                        </div>
                                                        <div className="a-row">
                                                            <span><a id="signInCancelSubmit"  href="/signup"  role="button">
                                                                Register now
                                </a></span>
                                                        </div>
                                                    </div>
                                             
                                        </form>
                                    </div>

                        </div>
                  
                  
                </div>
              
             
         

    )
}
  
}

export default Login;