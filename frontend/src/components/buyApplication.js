import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { backendServer } from "../webconfig";
import "./leaseApplication.css";
import { Card, Button, ButtonGroup, Form } from "react-bootstrap";

class LeaseApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homes: [],
      flag1: false,
      listingId: this.props.match.params.id,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("Submit lease:", this.state.empName);
    var data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      homeId: this.state.homes[0].id,
      offerPrice:this.state.offerPrice,
      status: "pending",
      listingId: this.state.listingId,
    };
    console.log("handleSubmit:::", data);
    var listingName = this.state.homes[0].addressLine1;
    var toEmail = this.state.homes[0].representedBy
    
    axios
      .post(`${backendServer}/homelistings/submitBuy`, data)
      .then(async function (response) {
        console.log("Pro are::", response.data);
        var emailData = {
          toEmail: toEmail,
          emailType: "Lease Application",
          listingName: listingName,
        };

          await axios
            .post(`${backendServer}/email/sendEmail`, emailData)
            .then((response2) => {
              alert("Application sent");
              console.log("email sent");
            });
      });
  }
  async componentDidMount() {
    axios
      .get(
        `${backendServer}/homelistings/getListingDetails?id=${this.state.listingId}`
      )
      .then((response) => {
        console.log("Pro are::", response.data);
        this.setState({
          homes: this.state.homes.concat(response.data),
        });
        console.log("Pro are::", this.state.homes);
      });
  }

  render() {
    let candr = this.state.homes.map((msg) => {
      return (
        <div className="lease-application">
          <div className="container lease-app-form">
            <div className="card applications-end">
              <div className="card-head">
                <h2 className="page-title">Offer for Home</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <img
                      alt="AZ"
                      src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                      style={{ width: "100px", height: "120px" }}
                      // id="avatar-image"
                    />
                  </div>
                  <div className="col-6">
                    <p>
                      {" "}
                      <span style={{ color: "black" }}>Address is </span>
                      {msg.addressLine1}
                    </p>
                    <p>
                      {" "}
                      <span style={{ color: "black" }}>This house is for </span>
                      {msg.type}
                    </p>
                    <p>
                      {" "}
                      <span style={{ color: "black" }}>Price We have is </span>{" "}
                      {msg.price}
                    </p>
                    <p>
                      {" "}
                      <span style={{ color: "black" }}>Area of Property is </span>{" "}
                      {msg.area}
                    </p>
                  </div>
                </div>
                {/* <div className="row"> */}
                <form>
                  <div class="form-row">
                    <div class="col">
                      <div class="form-group ">
                        {/* <label for="exampleInputEmail1">First Name:</label> */}
                        <input
                          type="text"
                          name="firstName"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter first name"
                          onChange={this.handleChange}
                        />
                        {/* <small id="emailHelp" class="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small> */}
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group">
                        {/* <label for="exampleInputPassword1">Last Name:</label> */}
                        <input
                          type="text"
                          name="lastName"
                          class="form-control"
                          id="exampleInputPassword1"
                          placeholder="Enter last name"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    {/* <label for="exampleInputEmail1">Credit Score:</label> */}
                    <input
                      type="text"
                      name="offerPrice"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter your price offer"
                      onChange={this.handleChange}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    class="btn btn-primary"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </button>
                </form>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        {/* <div class="card-deck"> */}
        {candr}
        {/* </div> */}
      </div>
    );
  }
}

export default LeaseApplication;
