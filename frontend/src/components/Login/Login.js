import React, { Component } from "react";
// import { Form } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router";
import { backendServer } from "../../webconfig.js";
import "../Login/login.css";
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
      regFlag : false,
      rejectstatus:""
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
     this.setState({
      showLoginError: false,
      showRegistrationError : false
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
          if (response && response.data.status!="Rejected") {
            console.log(response.data);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("status", response.data.status);
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("email", response.data.email);
            if (response.data.role === "admin") {
              window.location.href = "/admin-dashboard";
            }
            if(response.data.role==="user"){
              window.location.href = "/search";
            }
            
        
            
            this.setState({ redirectToHome: true });
            this.setState({
              authFlag: true,
            });
          }
          
          else {
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
    this.setState({
      showLoginError: false,
      showRegistrationError : false
    });

      //prevent page from refresh
      e.preventDefault();
      const data = {
        rname:this.state.rname,
        remail:this.state.remail,
        rpassword: this.state.rpassword,
        role:this.state.role
      };

      if(this.state.rname.length === 0 || this.state.remail.length === 0 || this.state.rpassword.length === 0 || this.state.role === 0)
      {
        console.log("fields not validated")
        this.setState({
          showRegistrationError: true,
        });
        return 0;
      }
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      console.log("req.body", data);
      axios
        .post(`${backendServer}/register/`, data)
        .then((response) => {
          console.log(response);
          if (response.data === "error") {
            console.log("error")
            this.setState({
              showRegistrationError: true,
            });
           
          } else if("success") {
            this.setState({
              regFlag: true,
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
    let redirectVar,rejct = null;

    // if (this.state.redirectToHome && this.state.role=="admin") {
    //   redirectVar = <Redirect push to="/admin-dashboard" />;
    
    // }
    // if (this.state.redirectToHome && this.state.role=="user") {
    //   redirectVar = <Redirect push to="/search" />;
    
    // }

    if(this.state.rejectstatus)
    rejct= <p> Account has been rejected by the admin </p>
    return (
      <div>
        {redirectVar}
        {rejct}
        <div>
          <a href="/login">{redirectVar}</a>
        </div>

        {this.state.regFlag && (
            <div>
              <center>
              <li>
             
                    <span style={{color:"black"}}>
                      Registration Successfull!!
                    </span>
                  </li>
               </center>
            </div>
          )}
      
          {this.state.showRegistrationError && (
            <div>
              <center>
              <h4 style={{color:"black"}}>Important Message!</h4>
              <i></i>
              <div>
                
                    <span  style={{color:"black"}}>
                      Registration Unsuccessful!!Please Try Again
                    </span>
                  
              </div>
              </center>
            </div>
          )}
          

        <div>
          {this.state.showLoginError && (
            <div style={{color:"black"}}>
              <center>
                              <h4>Important Message!</h4>
           
            
             
                    <span>
                      Invalid credentials. Please check your username and
                      password.
                    </span>
                  
            </center>
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
                <input id="user" type="text" className="input" onChange={this.handleChange}  name="email"/>
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">Password</label>
                <input id="pass" type="password" className="input" data-type="password" onChange={this.handleChange} requied name="password"/>
              </div>
              <div className="group">
                <input type="submit" className="button" defaultValue="Sign In" onClick={this.handleLogin} />
              </div>
              <div className="hr" />
            </div>
            <div className="for-pwd-htm">
            <div className="group">
                <label htmlFor="user" className="label">Full Name</label>
                <input id="user" type="text" className="input" name="rname"  onChange={this.handleChange} />
              </div>
              <div className="group">
                <label htmlFor="user" className="label">Role ? </label>
                <select className="input" name="role" onChange={this.handleChange} >
                            <option style={{color:"black"}} value="" >Select</option>
                            <option style={{color:"black"}} value="user" >User</option>
                            <option style={{color:"black"}} value="realtor" >Realtor </option>
                            <option style={{color:"black"}} value="admin" >Admin </option>
                          </select>              
                          </div>
            
              <div className="group">
                <label htmlFor="user" className="label">Username or Email</label>
                <input id="user" type="text" className="input" name="remail" onChange={this.handleChange} />
              </div>
              <div className="group">
                <label htmlFor="user" className="label">Password</label>
                <input id="user" type="password" className="input" name="rpassword" onChange={this.handleChange} />
              </div>
              <div className="group">
                <input type="submit" className="button" defaultValue="Reset Password" onClick={this.handleRegister} />
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
