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
      return (
        <div>
          &nbsp;
          <Card style={{ width: "50%", marginLeft: "100px", height: "80%" }}>
            <Card.Header style={{ color: "black" }}>{msg.name}</Card.Header>
            <Card.Body>
              <Card.Text>
                <img
                  alt="AZ"
                  src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                  style={{ width: "100px", height: "120px" }}
                  // id="avatar-image"
                />
                <p style={{ color: "black" }}>Address: {msg.addressLine1}</p>
                <p style={{ color: "black" }}>Type : {msg.type}</p>
                <p style={{ color: "black" }}>Price : {msg.price}</p>
                <p style={{ color: "black" }}>Area : {msg.area}</p>
              </Card.Text>
              <ButtonGroup
                style={{ marginLeft: "450px", marginTop: "-80px" }}
                className="mb-2"
              >
                {/* <Button>Approve</Button>
        &nbsp; */}
                <Button>Schedule Tour</Button>
                &nbsp;
                <Button onClick={(e) => this.handleRemove(msg._id)}>Buy</Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
          &nbsp;
        </div>
      );
    });
    return (
      <div>
        {redirectVar}
        {candr}
        {/* </div> */}
      </div>
    );
  }
}

export default HomeListings;
