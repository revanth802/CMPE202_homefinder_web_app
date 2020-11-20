import React, { Component } from "react";
// import { Form } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router";
import { backendServer } from "../../webconfig.js";
import "../Search/search.css";
import {Form,Col} from 'react-bootstrap'

import { Link } from "react-router-dom";

class Search extends Component {
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
        <center>
            <Form style={{height:"139px",width:"650px",background:"#00294D80"}}>
            &nbsp;
  <Form.Row>
  <div>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossOrigin="anonymous" />
        <div className="container">
          <br />
          <div className="row justify-content-center">
            <div>
           
              
                <div className="card-body row no-gutters align-items-center" style={{padding:"0.5rem",marginLeft:"150px"}}>
                  <div >
                    <i className="fas fa-search h4 text-body" style={{marginTop:"10px"}} />
                  </div>
                  {/*end of col*/}
                  <div className="col">
                    <input className="form-control form-control-borderless" type="search" placeholder="Address, City or Zip" />
                  </div>
                  {/*end of col*/}
                  <div className="col-auto">
                  &nbsp;
                    <button className="btn btn-success" type="submit">Search</button>
                  </div>
                  {/*end of col*/}
                </div>

            </div>
            {/*end of col*/}
          </div>
        </div>
      </div>
  </Form.Row>
</Form>
</center>
        </div>
    //     <div>
    //     <section>
    //       <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
    //         <div className="carousel-inner">
    //           <div className="carousel-item active">
    //             <img src="https://pbs.twimg.com/media/EGHYvttU4AAYKb7?format=jpg&name=large" className="d-block w-100" alt="..." />
    //           </div>
    //           <div className="carousel-item">
    //             <img src="https://pbs.twimg.com/media/EGHYvtkUcAAuc8T?format=jpg&name=large" className="d-block w-100" alt="..." />
    //           </div>
    //           <div className="carousel-item">
    //             <img src="https://pbs.twimg.com/media/EGHYvtjU0AAO8w1?format=jpg&name=large" className="d-block w-100" alt="..." />
    //           </div>
    //           {/*https://upload.wikimedia.org/wikipedia/commons/8/8d/Yarra_Night_Panorama%2C_Melbourne_-_Feb_2005.jpg*/}
    //         </div>
    //         <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
    //           <span className="carousel-control-prev-icon" aria-hidden="true" />
    //           <span className="sr-only">Previous</span>
    //         </a>
    //         <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
    //           <span className="carousel-control-next-icon" aria-hidden="true" />
    //           <span className="sr-only">Next</span>
    //         </a>
    //       </div>
    //     </section>
    //     <section className="search-sec">
    //       <div className="container">
    //         <form action="#" method="post" noValidate="novalidate">
    //           <div className="row">
    //             <div className="col-lg-12">
    //               <div className="row">
    //                 <div className="col-lg-3 col-md-3 col-sm-12 p-0">
    //                   <input type="text" className="form-control search-slt" placeholder="Enter Pickup City" />
    //                 </div>
    //                 <div className="col-lg-3 col-md-3 col-sm-12 p-0">
    //                   <input type="text" className="form-control search-slt" placeholder="Enter Drop City" />
    //                 </div>
    //                 <div className="col-lg-3 col-md-3 col-sm-12 p-0">
    //                   <select className="form-control search-slt" id="exampleFormControlSelect1">
    //                     <option>Select Vehicle</option>
    //                     <option>Example one</option>
    //                     <option>Example one</option>
    //                     <option>Example one</option>
    //                     <option>Example one</option>
    //                     <option>Example one</option>
    //                     <option>Example one</option>
    //                   </select>
    //                 </div>
    //                 <div className="col-lg-3 col-md-3 col-sm-12 p-0">
    //                   <button type="button" className="btn btn-danger wrn-btn">Search</button>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </form>
    //       </div>
    //     </section>
    //   </div>
    );
  }
}

export default Search;
