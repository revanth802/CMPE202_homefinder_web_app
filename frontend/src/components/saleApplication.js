import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { backendServer } from "../webconfig";
import "./leaseApplication.css";
import { Card, Button, ButtonGroup, Form } from "react-bootstrap";

class SaleApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homes: [],
      flag1: false,
      listingId: this.props.match.params.id,
      role : localStorage.getItem("role"),
      owners : [],
      owner : ""
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
      offerPrice: this.state.offerPrice,
      status: "pending",
      listingId: this.state.listingId,
      applicant:localStorage.getItem("email"),
      actual_applicant:(this.state.owner != "")?this.state.owner : localStorage.getItem("email")
    };
    console.log("handleSubmit:::", data);
    var listingName = this.state.homes[0].addressLine1;
    var toEmail = this.state.homes[0].representedBy;

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

      axios
      .get(`${backendServer}/sell/getOwners`)
      .then((response) => {
        console.log("Pro are::", response.data);
        this.setState({
          owners: response.data,
        });
        console.log("Pro are::", this.state.owners);
      });

  }

  render() {
    let optionItems = this.state.owners.map((owner) =>
    <option key={owner}>{owner}</option>);

    let candr = this.state.homes.map((msg) => {
      return (
        <div className="lease-application">
          <div className="container lease-app-form">
            <div className="card applications-end">
              <div className="card-head">
                <h2 className="page-title">Sale Application Form</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <Card.Img
                      variant="top"
                      src="https://img2.homefinder.com/_img_/453961815/0b6cb9b1beb6691f05e9c45925d82bf9e27043a4/620"
                      style={{
                        width: "350px",
                        height: "280px",
                        marginBottom: "20px",
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <p>
                      {" "}
                      <span className="field-names">Location: </span>
                      {msg.city}
                      {", "}
                      {msg.state}
                      {"."}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">House Type: </span>
                      {msg.type}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">Asking Price: </span>{" "}
                      {msg.price}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">Bedrooms: </span>{" "}
                      {msg.bedrooms}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">Bathrooms: </span>{" "}
                      {msg.bathrooms}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">Living Area: </span>{" "}
                      {msg.area}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">Home Type: </span>{" "}
                      {msg.hometype}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">Flooring Type: </span>{" "}
                      {msg.flooring}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">Built in year: </span>{" "}
                      {msg.year_built}
                    </p>
                  </div>
                </div>
                {/* <div className="row"> */}
                <form>
                  <div class="form-row">
                    <div class="col">
                      <div class="form-group ">
                        <label className="field-names" for="exampleInputEmail1">
                          First Name:
                        </label>
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
                        <label
                          className="field-names"
                          for="exampleInputPassword1"
                        >
                          Last Name:
                        </label>
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
                  <div class="form-row">
                    <div class="col">
                      <div class="form-group ">
                    <label className="field-names" for="exampleInputEmail1">
                      Offer Price:
                    </label>
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

                    </div>
                    <div class="col">
                      <div class="form-group">
                  {this.state.role == "realtor" ? (
                  
                
                  <div>
                    <label for="date" style={{color:"black"}}>On behalf of Buyer</label>
                                <select
                  name="owner"
                  className="custom-select custom-select-sm"
                  onChange={this.handleChange}>
                  <option value="">Select</option>
   {optionItems}
                </select>
                </div>
                   
                 
              
              ) : (
                ""
              )}
            </div>
            </div>
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

export default SaleApplication;
