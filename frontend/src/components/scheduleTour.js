import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { backendServer } from "../webconfig";
import "./leaseApplication.css";
import { Card, Button, ButtonGroup, Form } from "react-bootstrap";

class ScheduleTour extends Component {
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
      dayOfVisit: this.state.dayOfVisit,
      timeOfVisit: this.state.timeOfVisit,
      listingId: this.state.listingId,
      type: this.state.homes[0].type,
    };
    console.log("handleSubmit:::", data);
    var listingName = this.state.homes[0].addressLine1;
    var toEmail = localStorage.getItem("email");
    toEmail = toEmail +","+ this.state.homes[0].representedBy
    axios
      .post(`${backendServer}/homelistings/scheduleTour`, data)
      .then(async function (response) {
        console.log("Pro are::", response.data);
        //alert("Appointment Fixed");
        var emailData = {
            toEmail: toEmail,
            emailType: "House Appointment",
            listingName: listingName,
          };
  
            await axios
              .post(`${backendServer}/email/sendEmail`, emailData)
              .then((response2) => {
                alert("Appointment Fixed! Check your email");
                console.log("email sent");
              });
        console.log("email sent");
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
        let imgSrc = "https://img2.homefinder.com/_img_/453961815/0b6cb9b1beb6691f05e9c45925d82bf9e27043a4/620"
      if(msg.imagePath){
        imgSrc = msg.imagePath
      }
      return (
        <div className="lease-application">
          <div className="container lease-app-form">
            <div className="card applications-end">
              <div className="card-head">
                <h2 className="page-title">Schedule a visit with us</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <Card.Img
                      variant="top"
                      src={imgSrc}
                      style={{
                        width: "300px",
                        height: "230px",
                        marginBottom: "20px",
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <p>
                      {" "}
                      <span className="field-names">Address:</span>
                      {msg.addressLine1}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">House Type: </span>
                      <span className="text-capitalize">{msg.type}</span>
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">Rent: </span> {msg.price}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">Living Area: </span>{" "}
                      {msg.area}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">Lease Terms: </span>{" "}
                      {msg.leaseTerms}
                    </p>
                  </div>
                </div>
                {/* <div className="row"> */}
                <form>
                  <div class="form-row">
                    <div class="col">
                      <div class="form-group ">
                        <label className="field-names">First Name:</label>
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
                        <label className="field-names">Last Name:</label>
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
                    <label className="field-names" for="date">
                      Date of Visit:
                    </label>
                    <input
                      type="date"
                      name="dayOfVisit"
                      class="form-control"
                      id="date"
                      placeholder="Enter Date for Visit"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="form-group">
                    <label className="field-names">Time of Visit:</label>
                    <input
                      type="time"
                      name="timeOfVisit"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter time for Visit"
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

export default ScheduleTour;
