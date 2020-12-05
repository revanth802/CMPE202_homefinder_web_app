import React, { Component } from "react";
// import { Form } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router";
import { backendServer } from "../../webconfig.js";
import { Card, CardGroup, Carousel } from "react-bootstrap";
import "../myfavourites/myfavourites.css";
import { Link } from "react-router-dom";

class myfavorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searches: [],
      msgr: "",
      pagetype: "admindashboard",
      //  this.handleRemove=this.handleRemove.bind();
    };
  }

  async componentDidMount() {
    const data = {
      email: localStorage.getItem("email"),
    };
    await axios
      .post(`${backendServer}/search/myfavorites`, data)
      .then((response) => {
        // console.log("Pro are::", response.data);
        this.setState({
          users: response.data,
        });
        console.log("Pro are::", this.state.users);
      });
  }

  render() {
    let redirectVar = null;

    let candr = this.state.users.map((msg) => {
      let imgSrc = "https://img2.homefinder.com/_img_/453961815/0b6cb9b1beb6691f05e9c45925d82bf9e27043a4/620"
      if(msg.imagePath){
        imgSrc = msg.imagePath
      }
      return (
        // <CardDeck>
        <Carousel.Item interval={1000}>
          <Card
            border="primary"
            style={{
              padding: "10px",
              width: "380px",
              height: "480px",
              marginLeft: "20px",
            }}
          >
            <Card.Img
              variant="top"
              src={imgSrc}
              style={{ width: "350px", height: "280px" }}
            />
            <Card.Body>
              <Card.Text style={{ color: "black" }}>
                <div className="row" style={{ marginBottom: "10px" }}>
                  <div className="col-4">
                    <span style={{ fontSize: "20px" }}>${msg.price}</span>
                  </div>
                  <div className="col-8">
                    {msg.bedrooms} <span className="field-names">Bd | </span>
                    {msg.bathrooms} <span className="field-names">Bath | </span>
                    {msg.area} <span className="field-names">Sqft</span>
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "10px" }}>
               <span className="field-names">{msg.addressLine1}, {msg.addressLine2},{msg.city}, {msg.state}, {msg.zipcode} </span>
              </div>
                <div className="row">
                  <div className="col-6">
                    <div style={{ marginBottom: "10px" }}>
                      <span className="field-names">House for </span> {msg.type}
                    </div>
                  </div>
                </div>
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
        <p style={{ color: "red" }}>{this.state.msgr}</p>
        {/* <div class="card-deck"> */}
        <center>
          <h3 style={{ color: "black" }}>Your favourites:</h3>

          <Carousel>{candr}</Carousel>
        </center>
      </div>
    );
  }
}

export default myfavorites;
