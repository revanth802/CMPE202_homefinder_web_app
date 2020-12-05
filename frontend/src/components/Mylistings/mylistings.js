import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { backendServer } from "../../webconfig";
import { Card, CardColumns, Button, ButtonGroup } from "react-bootstrap";

class mylistings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homes: [],
      flag1: false,
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(id) {
    console.log("in here");
    this.setState({
      redirect: `/currentlisting/${id}`,
    });
  }

  handleViewApplications(id) {
    console.log("In handleViewApplications");
    this.setState({
      redirect: `/rentalApplications/${id}`,
    });
  }

  async componentDidMount() {
    const data = {
      owner: localStorage.getItem("email"),
    };
    axios.post(`${backendServer}/myhomelistings/`, data).then((response) => {
      console.log("Pro are::", response.data);
      this.setState({
        homes: response.data,
      });
      console.log("Pro are::", this.state.homes);
    });
  }

  async handleRemove(e) {
    //prevent page from refresh
    //   e.preventDefault();
    console.log(e);
    const data = {
      uname: e,
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    console.log("req.body", data);
    await axios
      .post(`${backendServer}/myhomelistings/remove`, data)
      .then((response) => {
        console.log(response);
        if (response.data == "success") {
          console.log("Success");
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
  }

  render() {
    let redirectVar = null;
    if (this.state.redirect) {
      redirectVar = <Redirect push to={this.state.redirect} />;
    }
    let candr = this.state.homes.map((msg) => {
      let imgSrc = "https://img2.homefinder.com/_img_/453961815/0b6cb9b1beb6691f05e9c45925d82bf9e27043a4/620"
      if(msg.imagePath){
        imgSrc = msg.imagePath
      }
      return (
        // <CardDeck>
        <Card
          border="primary"
          style={{
            padding: "10px",
            width: "470px",
            height: "520px",
            marginLeft: "20px",
          }}
        >
          <Card.Img
            variant="top"
            src={imgSrc}
            style={{ width: "450px", height: "280px" }}
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
            <center>
              <ButtonGroup>
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  onClick={(e) => this.handleUpdate(msg._id)}
                >
                  Update Listing
                </button>
                &nbsp;
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  onClick={(e) => this.handleRemove(msg._id)}
                >
                  Remove Listing
                </button>
                &nbsp;
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  onClick={(e) => this.handleViewApplications(msg._id)}
                >
                  View Applications
                </button>
              </ButtonGroup>
            </center>
            {/* <MDBBtn floating size="lg" gradient="purple"><MDBIcon icon="bolt" /></MDBBtn> */}
          </Card.Footer>
        </Card>
      );
    });
    return (
      <div>
        &nbsp;
        <br></br>
        <CardColumns style={{ columnCount: "1" }}>
          {candr}
          {redirectVar}
        </CardColumns>
      </div>
    );
  }
}

export default mylistings;
