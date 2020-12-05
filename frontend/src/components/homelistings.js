import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { backendServer } from "../webconfig";
import { Card, Button, ButtonGroup } from "react-bootstrap";

class HomeListings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homes: [],
      flag1: false,
    };
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleRemove(id) {
    console.log("Inside handleRemove");
    this.setState({
      redirect: `/saleApplication/${id}`,
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
    axios.post(`${backendServer}/homelistings/`, data).then((response) => {
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

      let imgSrc = "https://img2.homefinder.com/_img_/453961815/0b6cb9b1beb6691f05e9c45925d82bf9e27043a4/620"
      if(msg.imagePath){
        imgSrc = msg.imagePath
      }
      let isAvailable = false;
      if (msg.status == "open") isAvailable = true;
      else isAvailable = false;
      return (
        <div>
          {/* &nbsp; */}
          <Card style={{ marginBottom: "20px" }}>
            <Card.Header style={{ color: "black" }}>{msg.name}</Card.Header>
            <Card.Body>
              <Card.Text>
                <div className="row">
                  <div className="col-3">
                    <Card.Img
                      variant="top"
                      src={imgSrc}
                      style={{
                        width: "200px",
                        height: "130px",
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <p style={{ color: "black" }}>
                      Address: {msg.addressLine1}
                    </p>
                    <p>
                      <span className="field-names">Type : </span>
                      {msg.type}
                    </p>
                    <p>
                      <span className="field-names"> Price :</span> {msg.price}
                    </p>
                    <p>
                      <span className="field-names"> Area : </span>
                      {msg.area}
                    </p>
                    <p>
                      <span className="field-names"> Status : </span>
                      {msg.status}
                    </p>

                  </div>
                  <div className="col-3">
                    <div style={{ marginBottom: "10px" }}>
                      <Button onClick={(e) => this.loadDetails(msg._id)}>
                        View Details
                      </Button>
                    </div>

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
                        <Button onClick={(e) => this.handleRemove(msg._id)}>
                          Buy
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <button
                          type="button"
                          class="btn btn-primary"
                          disabled
                          onClick={(e) => this.handleRemove(msg._id)}
                        >
                          {" "}
                          Buy
                        </button>
                      </div>
                    )}

                    {/* <div style={{ marginBottom: "10px" }}>
                      <Button onClick={(e) => this.scheduleTour(msg._id)}>
                        Schedule Tour
                      </Button>
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <Button onClick={(e) => this.handleRemove(msg._id)}>
                        Buy
                      </Button>
                    </div> */}
                  </div>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
          {/* &nbsp; */}
        </div>
      );
    });
    return (
      <div className="container lease-application">
        {redirectVar}
        <h1 className="page-title"> Sale Listings</h1>
        {candr}
        {/* </div> */}
      </div>
    );
  }
}

export default HomeListings;
