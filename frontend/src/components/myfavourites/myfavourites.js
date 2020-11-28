import React, { Component } from "react";
// import { Form } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router";
import { backendServer } from "../../webconfig.js";
import {Card,CardGroup,Carousel} from 'react-bootstrap';
import "../myfavourites/myfavourites.css";
import { Link } from "react-router-dom";

class myfavorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
     users:[],
     searches:[],
     msgr:"",
     pagetype:"admindashboard"
    //  this.handleRemove=this.handleRemove.bind();
    };

  }

  async componentDidMount() {
    const data = {
        email: localStorage.getItem("email"),
       
      };
   await axios
      .post(`${backendServer}/search/myfavorites`,data)
      .then((response) => {
        // console.log("Pro are::", response.data);
        this.setState({
          users: response.data,
        });
        console.log("Pro are::", this.state.users);
      });

     await axios
      .post(`${backendServer}/search/myfavoriteSearches`,data)
      .then((response) => {
        // console.log("Pro are::", response.data);
        this.setState({
          searches: response.data,
        });
        console.log("Pro are::", this.state.searches);
      });
  }

  render() {
    let redirectVar = null;
    
    let candr = this.state.users.map((msg) => {
        return (
          // <CardDeck>
          <Carousel.Item interval={1000}>
    <Card border="primary" style={{padding:"10px",width:"380px",height:"480px",marginLeft:"20px"}} >
      <Card.Img variant="top" src="https://img2.homefinder.com/_img_/453961815/0b6cb9b1beb6691f05e9c45925d82bf9e27043a4/620" style={{width:"350px",height:"280px"}} />
      <Card.Body>
        <Card.Title style={{color:"black"}}>{msg.addressLine1}
        &nbsp;
    
        </Card.Title>
        <Card.Text>
        <h4 data-v-dabe9ba4="" class="text-primary mb-0">
            ${msg.price}
            {/* <MDBBtn rounded size="lg" color="info" >Button<MDBIcon icon="heart" className="ml-2" /></MDBBtn> */}
  
            &nbsp;
           <span class="scope-label text-for-sale small" style={{color:"red"}}>House For {msg.type}</span></h4>
           <div data-v-dabe9ba4="" class="text-muted">
      {msg.bedrooms} Bd | {msg.bathrooms} bath
      <span data-v-dabe9ba4="">| {msg.area} sqft</span></div>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
        {/* <MDBBtn floating size="lg" gradient="purple"><MDBIcon icon="bolt" /></MDBBtn> */}
      </Card.Footer>
    </Card>
    </Carousel.Item>

  );
      });

      let candr2 = this.state.searches.map((msg) => {
        return (
          // <CardDeck>
          <Carousel.Item interval={1000}>
    <Card border="primary" style={{padding:"10px",width:"380px",height:"480px",marginLeft:"20px"}} >
      <Card.Img variant="top" src="https://img2.homefinder.com/_img_/453961815/0b6cb9b1beb6691f05e9c45925d82bf9e27043a4/620" style={{width:"350px",height:"280px"}} />
      <Card.Body>
        <Card.Title style={{color:"black"}}>{msg.addressLine1}
        &nbsp;
    
        </Card.Title>
        <Card.Text>
        <h4 data-v-dabe9ba4="" class="text-primary mb-0">
            ${msg.price}
            {/* <MDBBtn rounded size="lg" color="info" >Button<MDBIcon icon="heart" className="ml-2" /></MDBBtn> */}
  
            &nbsp;
           <span class="scope-label text-for-sale small" style={{color:"red"}}>House For {msg.type}</span></h4>
           <div data-v-dabe9ba4="" class="text-muted">
      {msg.bedrooms} Bd | {msg.bathrooms} bath
      <span data-v-dabe9ba4="">| {msg.area} sqft</span></div>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
        {/* <MDBBtn floating size="lg" gradient="purple"><MDBIcon icon="bolt" /></MDBBtn> */}
      </Card.Footer>
    </Card>
    </Carousel.Item>

  );
      });
      return (
        <div>
     
        <p style={{color:"red"}}>{this.state.msgr}</p>
        {/* <div class="card-deck"> */}
        <center>
        <h3 style={{color:"black"}}>Your favourites:</h3>
        
        <Carousel>
          {candr}
          </Carousel>

          <h3 style={{color:"white"}}>Your favourite Searches:</h3>
        
        <Carousel>
          {candr2}
          </Carousel>
          </center>
  
          </div>
           
      );
    }
 
  
}

export default myfavorites;
