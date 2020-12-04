import React, { Component } from "react";
// import { Form } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router";
import { backendServer } from "../../webconfig.js";
import {Card,Button,ButtonGroup,ListGroupItem} from 'react-bootstrap';

class myapplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
     users:[],
     msgr:"",
    };

  }

  async componentDidMount() {
    var data = {
        email:localStorage.getItem("email")
      };
    axios
      .post(`${backendServer}/rentalApplications/getMyApplications/`,data)
      .then((response) => {
        console.log("Pro are::", response.data);
        this.setState({
          users: response.data,
        });
        console.log("Pro are::", this.state.users);
      });
  }

 

  render() {
    let redirectVar = null;
    
    let candr = this.state.users.map((msg) => {
        return (
        <div>
              &nbsp;
            <Card style={{width:"50%",marginLeft:"100px",height:"80%"}}>
            <Card.Header style={{color:"black"}}>{msg.name}</Card.Header>
            <Card.Body>
              
              <Card.Text>
              {/* <img
          alt="AZ"
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
            style={{width:"100px",height:"120px"}}
          // id="avatar-image"
        /> */}
              <p style={{color:"black"}}>Listing id: {msg.listingId}</p> 
              <p style={{color:"black"}}>Present Status: {msg.status}</p>
              </Card.Text>
              
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

export default myapplications;
