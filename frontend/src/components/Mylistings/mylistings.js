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
            src="https://img2.homefinder.com/_img_/453961815/0b6cb9b1beb6691f05e9c45925d82bf9e27043a4/620"
            style={{ width: "450px", height: "280px" }}
          />
          <Card.Body>
            <Card.Title style={{ color: "black", height: "54px" }}>
              {msg.addressLine1}
              {/* &nbsp; */}

              {/* <button><i class="fas fa-heart fa-sm" style={{color:"red"}}></i></button> */}
            </Card.Title>
            <Card.Text>
              <h4 data-v-dabe9ba4="" class="text-primary mb-0">
                ${msg.price}
                {/* <MDBBtn rounded size="lg" color="info" >Button<MDBIcon icon="heart" className="ml-2" /></MDBBtn> */}
                &nbsp;
                <span
                  class="scope-label text-for-sale small"
                  style={{ color: "red" }}
                >
                  Property type: {msg.type}
                </span>
              </h4>
              <div data-v-dabe9ba4="" class="text-muted">
                {msg.bedrooms} Bd | {msg.bathrooms} Bath
                <span data-v-dabe9ba4="">| {msg.area} sqft</span>
              </div>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <center>
              <ButtonGroup>
                <Button onClick={(e) => this.handleUpdate(msg._id)}>
                  Update Listing
                </Button>
                &nbsp;
                <Button onClick={(e) => this.handleRemove(msg._id)}>
                  Remove Listing
                </Button>
                &nbsp;
                <Button onClick={(e) => this.handleViewApplications(msg._id)}>
                  View Applications
                </Button>
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
