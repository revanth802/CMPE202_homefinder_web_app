import React, { Component } from "react";
// import { Form } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router";
import { backendServer } from "../../webconfig.js";
import "../Login/login.css";

import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      remail: "",
      rpassword: "",
      rname:"",
      role:"",
      persona: "seller",
      loginFlag: false,
      showerrormessage: false,
      redirecttohome: false,
      showRegistrationError:false,
      regFlag : false
    };
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  componentWillMount() {
    this.setState({
      authFlag: false,
    });
  }

  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  userTypeChangeHandler = (e) => {
    this.setState({
      type: e.target.value,
    });
  };

  handleChange = (e) => {
    console.log("e", e.target.name);
    console.log("e", e.target.value);
    if (this.state.showLoginError) {
      this.setState({
        showLoginError: false,
      });
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLogin = (e) => {
    const form = document.getElementById("signIn");
    form.reportValidity();
    if (form.checkValidity()) {
      //prevent page from refresh
      e.preventDefault();
      const data = {
        email: this.state.email,
        password: this.state.password,
      };
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      console.log("req.body", data);
      axios
        .post(`${backendServer}/login/`, data)
        .then((response) => {
          if (response) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("id", response.data._id);
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("type", response.data.userType);
            if (response.data.userType === "buyer") {
              window.location.href = "/userdashboard";
            } else if (response.data.userType === "Seller") {
              window.location.href = "/sellerinventory";
            } else {
              window.location.href = "/admin-dashboard";
            }
            this.setState({ redirectToHome: true });
            this.setState({
              authFlag: true,
            });
          } else {
            this.setState({
              showLoginError: true,
            });
          }
        })
        .catch((ex) => {
          this.setState({
            showLoginError: true,
          });
        });
    }
  };

  handleRegister = (e) => {
      //prevent page from refresh
      e.preventDefault();
      const data = {
        rname:this.state.rname,
        remail:this.state.remail,
        rpassword: this.state.rpassword,
        role:this.state.role
      };
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      console.log("req.body", data);
      axios
        .post(`${backendServer}/register/`, data)
        .then((response) => {
          console.log(response);
          if (response) {
            
            this.setState({
              regFlag: true,
            });
          } else {
            this.setState({
              showRegistrationError: true,
            });
          }
        })
        .catch((ex) => {
          this.setState({
            showRegistrationError: true,
          });
        });
    
  };
  
  render() {
    let redirectVar = null;

    if (this.state.redirectToHome) {
      redirectVar = <Redirect push to="/somewhere/else" />;
    }
    return (
      <div>
        {redirectVar}

        <div>
          <a href="/login">{redirectVar}</a>
        </div>

        {this.state.regFlag && (
            <div>
              <i></i>
              <div>
                <ul>
                  <li>
                    <span>
                      Registration Successfull!!
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}
      
          {this.state.showRegistrationError && (
            <div>
              <h4>Important Message!</h4>
              <i></i>
              <div>
                <ul>
                  <li>
                    <span>
                      Registration Unsuccessful!!Please Try Again
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}
          

        <div>
          {this.state.showLoginError && (
            <div>
              <h4>Important Message!</h4>
              <i></i>
              <div>
                <ul>
                  <li>
                    <span>
                      Invalid credentials. Please check your username and
                      password.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}
          <div>
            <form id="signIn">
            <div className="login-wrap">
        <div className="login-html">
          <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked /><label htmlFor="tab-1" className="tab">Sign In</label>
          <input id="tab-2" type="radio" name="tab" className="for-pwd" /><label htmlFor="tab-2" className="tab">Register</label>
          <div className="login-form">
            <div className="sign-in-htm">
              <div className="group">
                <label htmlFor="user" className="label">Username or Email</label>
                <input id="user" type="text" className="input" onChange={this.handleChange} required name="email"/>
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">Password</label>
                <input id="pass" type="password" className="input" data-type="password" onChange={this.handleChange} required name="password"/>
              </div>
              <div className="group">
                <input type="submit" className="button" defaultValue="Sign In" onClick={this.handleLogin} />
              </div>
              <div className="hr" />
            </div>
            <div className="for-pwd-htm">
            <div className="group">
                <label htmlFor="user" className="label">Full Name</label>
                <input id="user" type="text" className="input" name="rname" onChange={this.handleChange}/>
              </div>
              <div className="group">
                <label htmlFor="user" className="label">Role ? </label>
                <input id="user" type="text" className="input" name="role" onChange={this.handleChange} />
              </div>
              <div className="group">
                <label htmlFor="user" className="label">Username or Email</label>
                <input id="user" type="text" className="input" name="remail" onChange={this.handleChange}/>
              </div>
              <div className="group">
                <label htmlFor="user" className="label">Password</label>
                <input id="user" type="password" className="input" name="rpassword" onChange={this.handleChange}/>
              </div>
              <div className="group">
                <input type="submit" className="button" defaultValue="Reset Password" onClick={this.handleRegister}/>
              </div>
              <div className="hr" />
            </div>
          </div>
        </div>
      </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
