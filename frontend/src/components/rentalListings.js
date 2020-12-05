import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { backendServer } from "../webconfig";
import { Card, Button, ButtonGroup } from "react-bootstrap";

class RentalListings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homes: [],
      flag1: false,
    };
  }

  loadRent(id) {
    this.setState({
      redirect: `/leaseApplication/${id}`,
    });
  }

  scheduleTour(id) {
    this.setState({
      redirect: `/scheduleTour/${id}`,
    });
  }

  loadDetails(id) {
    this.setState({
      redirect: `/listingDetails/${id}`,
    });
  }

  async componentDidMount() {
    const data = {
      email: localStorage.getItem("email"),
    };
    console.log(data);
    axios
      .post(`${backendServer}/homelistings/rentalListings/`, data)
      .then((response) => {
        console.log("Pro are::", response.data);
        this.setState({
          homes: response.data,
        });
        console.log("Pro are::", this.state.homes);
      });
  }

  render() {
    let redirectVar = null;
    if (this.state.redirect) {
      redirectVar = <Redirect push to={this.state.redirect} />;
    }
    let candr = this.state.homes.map((msg) => {
      let isAvailable = false;
      if (msg.status == "open") isAvailable = true;
      else isAvailable = false;
      return (
        // <div className="container lease-application">
        // {/* &nbsp; */}
        <Card style={{ marginBottom: "20px" }}>
          <Card.Header style={{ color: "black" }}>{msg.name}</Card.Header>
          <Card.Body>
            <Card.Text>
              <div className="row">
                <div className="col-3">
                  <Card.Img
                    variant="top"
                    src="https://img2.homefinder.com/_img_/453961815/0b6cb9b1beb6691f05e9c45925d82bf9e27043a4/620"
                    style={{
                      width: "200px",
                      height: "130px",
                    }}
                  />
                </div>
                <div className="col-6">
                  <p>
                    {" "}
                    <span className="field-names"> Address: </span>{" "}
                    {msg.addressLine1}
                  </p>
                  <p>
                    <span className="field-names">Rent :</span> {msg.price}
                  </p>
                  <p>
                    <span className="field-names">Area : </span>
                    {msg.area}
                  </p>
                </div>
                <div className="col-3">
                  <div style={{ marginBottom: "10px" }}>
                    <Button onClick={(e) => this.loadDetails(msg._id)}>
                      View Details
                    </Button>
                  </div>
                  {/* <div style={{ marginBottom: "10px" }}>
                    <Button
                      margin-bottom="20px"
                      onClick={(e) => this.scheduleTour(msg._id)}
                    >
                      Schedule Tour
                    </Button>
                  </div> */}
                  <div style={{ marginBottom: "10px" }}>
                    {isAvailable ? (
                      <div>
                        <Button onClick={(e) => this.scheduleTour(msg._id)}>
                          Schedule Tour
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <button
                          type="button"
                          class="btn btn-primary"
                          disabled
                          onClick={(e) => this.scheduleTour(msg._id)}
                        >
                          {" "}
                          Schedule Tour
                        </button>
                      </div>
                    )}
                  </div>
                  {isAvailable ? (
                    <div>
                      <Button onClick={(e) => this.loadRent(msg._id)}>
                        Rent
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <button
                        type="button"
                        class="btn btn-primary"
                        disabled
                        onClick={(e) => this.loadRent(msg._id)}
                      >
                        {" "}
                        Rent
                      </button>
                    </div>
                  )}
                  {/* <div>
                    <Button onClick={(e) => this.loadRent(msg._id)}>
                      Rent
                    </Button>
                  </div> */}
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
        // {/* &nbsp; */}
        // </div>
      );
    });
    return (
      <div className="container lease-application">
        {/* <div class="card-deck"> */}
        {redirectVar}
        <h1 className="page-title"> Rental Listings</h1>
        {candr}
        {/* </div> */}
      </div>
    );
  }
}

export default RentalListings;
