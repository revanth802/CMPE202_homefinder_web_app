import React, { Component } from "react";
// import { Form } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { backendServer } from "../../webconfig.js";
import { Card, Button, ButtonGroup, ListGroupItem } from "react-bootstrap";

class myapplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      msgr: "",
    };
  }

  async componentDidMount() {
    var data = {
      email: localStorage.getItem("email"),
    };
    axios
      .post(`${backendServer}/rentalApplications/getMyApplications/`, data)
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
      let statusColor = "";
      let statusNew = "";
      if (msg.status == "approve") {
        statusColor = "green";
        statusNew = "Approved";
      } else if (msg.status == "reject") {
        statusColor = "red";
        statusNew = "Rejected";
      } else if (msg.status == "pending") {
        statusColor = "orange";
        statusNew = "Pending";
      }
      return (
        <div>
          &nbsp;
          <Card style={{ marginBottom: "20px" }}>
            <Card.Header style={{ color: "black" }}>{msg.name}</Card.Header>
            <Card.Body>
              <Card.Text>
                <div className="row">
                  <div className="col-8">
                    {/* <img
          alt="AZ"
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
            style={{width:"100px",height:"120px"}}
          // id="avatar-image"
        /> */}
                    <p>
                      <span className="field-names">
                        {" "}
                        Application for Listing id:
                      </span>{" "}
                      {msg.listingId}
                    </p>
                    <p>
                    Applicant: {msg.firstName},{msg.lastName}
                    </p>
                    <p>
                      <span className="field-names">Present Status: </span>
                      <span style={{ color: statusColor }}>{statusNew}</span>
                    </p>
                    {/* <ButtonGroup
                style={{ marginLeft: "450px", marginTop: "-80px" }}
                className="mb-2"
              > */}
                  </div>
                  <div className="col-4">
                    <Link
                      class="btn btn-primary"
                      to={"/listingDetails/" + msg.listingId}
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
          &nbsp;
        </div>
      );
    });
    return (
      <div className="container lease-application">
        <p style={{ color: "red" }}>{this.state.msgr}</p>
        {/* <div class="card-deck"> */}
        <h1 className="page-title"> My Applications</h1>
        {candr}
        {/* </div> */}
      </div>
    );
  }
}

export default myapplications;
