import React, { Component } from "react";
// import { Form } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router";
import { backendServer } from "../../webconfig.js";
import "../Login/login.css";
import {Card,Button,ButtonGroup,ListGroupItem} from 'react-bootstrap';

import { Link } from "react-router-dom";

class admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
     users:[],
     msgr:""
    //  this.handleRemove=this.handleRemove.bind();
    };

  }

  async componentDidMount() {
    axios
      .post(`${backendServer}/admin/`)
      .then((response) => {
        console.log("Pro are::", response.data);
        this.setState({
          users: response.data,
        });
        console.log("Pro are::", this.state.users);
      });
  }

 


 async handleRemove(e) {
      //prevent page from refresh
    //   e.preventDefault();
      console.log(e);
      const data = {
       uname: e
      };
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      console.log("req.body", data);
      await axios
        .post(`${backendServer}/admin/remove`, data)
        .then((response) => {
          console.log(response);
          if (response.data=="success") {
            console.log("Success")
            this.setState({
              msgr: "User successfully removed",
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
        
        this.componentDidMount();  
  };


  async handleApprove(e) {
    //prevent page from refresh
  //   e.preventDefault();
    console.log(e);
    const data = {
     uname: e
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    console.log("req.body", data);
    await axios
      .post(`${backendServer}/admin/approve`, data)
      .then((response) => {
        console.log(response);
        if (response.data=="success") {
          console.log("Success")
         
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
      
      this.componentDidMount();  
};

async handleReject(e) {
    //prevent page from refresh
  //   e.preventDefault();
    console.log(e);
    const data = {
     uname: e
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    console.log("req.body", data);
    await axios
      .post(`${backendServer}/admin/reject`, data)
      .then((response) => {
        console.log(response);
        if (response.data=="success") {
          console.log("Success")
        //   this.setState({
        //     msgr: "User successfully removed",
        //   });
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
      
      this.componentDidMount();  
};

  render() {
    
    let candr = this.state.users.map((msg) => {
        return (
        <div>
        &nbsp;
            <Card style={{width:"50%",marginLeft:"100px",height:"80%"}}>
            <Card.Header style={{color:"black"}}>{msg.name}</Card.Header>
            <Card.Body>
              
              <Card.Text>
              <img
          alt="AZ"
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
            style={{width:"100px",height:"120px"}}
          // id="avatar-image"
        />
              <p style={{color:"black"}}>Email/Username: {msg.email}</p> 
              <p style={{color:"black"}}>Present Status: {msg.status}</p>
              </Card.Text>
              <ButtonGroup style={{marginLeft:"450px",marginTop:"-80px"}} className="mb-2">
    <Button onClick={(e)=> this.handleApprove(msg.email)}>Approve</Button>
    &nbsp;
    <Button onClick={(e)=> this.handleReject(msg.email)}>Reject</Button>
    &nbsp;
    <Button onClick={(e)=> this.handleRemove(msg.email)}>Remove</Button>
  </ButtonGroup>
            </Card.Body>
          </Card>
          
              &nbsp;
          </div>
       
     

        );
      });
      return (
        <div>
        <p style={{color:"red"}}>{this.state.msgr}</p>
        {/* <div class="card-deck"> */}
          {candr}
          {/* </div> */}
         
  
          </div>
           
      );
    }
 
  
}

export default admin;
