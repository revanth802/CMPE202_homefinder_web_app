import React, { Component, Fragment } from "react";
import axios from "axios";
import { backendServer } from "../../webconfig.js";
import "../Sell/sell.css";
import { Button } from "react-bootstrap";

class Sell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add1: "",
      add2: "",
      city: "",
      statex: "",
      zipcode: "",
      area: 0,
      beds: 0,
      baths: 0,
      propertyTypes: "",
      floor: "",
      year: 0,
      price: 0,
      terms: "",
      amenities: "",
      parking: "",
      successmsg: "",
      type: "sale",
      availableDate: "",
      securityDeposit: "",
      userrole : localStorage.getItem("role"),
      owners : [],
      owner : ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  async componentDidMount() {
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

  handleChange = (e) => {
    console.log("e", e.target.name, " ", e.target.value);

    this.setState({
      [e.target.name]: e.target.value,
    });
    // console.log(owner, "owner")
  };

  handleOnChangeListingType = (e) => {
    this.setState({
      type: e.target.value,
    });
  };

  handleAdd = (e) => {
    let boo = false;
    if (localStorage.getItem("role") == "user" ) boo = true;
    e.preventDefault();
    const data = {
      add1: this.state.add1,
      add2: this.state.add2,
      city: this.state.city,
      statex: this.state.statex,
      zipcode: this.state.zipcode,
      area: this.state.area,
      beds: this.state.beds,
      baths: this.state.baths,
      propertyTypes: this.state.propertyTypes,
      floor: this.state.floor,
      year: this.state.year,
      price: this.state.price,
      terms: this.state.terms,
      amenities: this.state.amenities,
      boo: this.state.boo,
      person: localStorage.getItem("email"),
      parking: this.state.parking,
      boo: boo,
      type: this.state.type,
      availableDate: this.state.availableDate,
      securityDeposit: this.state.securityDeposit,
      owner : this.state.owner
    };

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    console.log("req.body", data);
    axios
      .post(`${backendServer}/sell/`, data)
      .then((response) => {
        console.log(response);
        if (response.data === "error") {
          console.log("error");
          this.setState({
            showRegistrationError: true,
          });
        } else if (response.data === "success") {
          this.setState({
            successmsg: "success",
          });
        }
      })
      .catch((ex) => {
        this.setState({
          showRegistrationError: true,
        });
      });
  };

  render() {
    let msgshow = null;
    if (this.state.successmsg == "success")
      msgshow = <p>Listing Successfully posted</p>;
      let optionItems = this.state.owners.map((owner) =>
      <option key={owner}>{owner}</option>
  );
    return (
      <div className="container contact-form">
        <div className="contact-image">
          <img
            src="https://image.ibb.co/kUagtU/rocket_contact.png"
            alt="rocket_contact"
          />
        </div>
        <form method="post">
          <h3>Add a new Listing for Sale!</h3>
          {msgshow}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  name="add1"
                  className="form-control"
                  placeholder="Address Line 1 *"
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div>
             
             
         </div>
              <div className="form-group">
                <input
                  type="text"
                  name="add2"
                  className="form-control"
                  placeholder="Address Line 2 "
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  placeholder="City"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="statex"
                  className="form-control"
                  placeholder="State"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="zipcode"
                  className="form-control"
                  placeholder="Zipcode (Eg: 95126)"
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="number"
                  name="area"
                  className="form-control"
                  placeholder="Area in sqft"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="beds"
                  className="form-control"
                  placeholder="Number of bedrooms"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="baths"
                  className="form-control"
                  placeholder="Number of bathrooms"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <select
                  name="propertyTypes"
                  className="custom-select custom-select-sm"
                  onChange={this.handleChange}
                >
                  <option value={""}>Property Type</option>
                  <option value="SFH">Single Family Home</option>
                  <option value="CONDOUNIT">Condominium/Apartment</option>
                  <option value="TOWNHOUSE">Townhouse/Townhome</option>
                  <option value="DUPLEX">Duplex</option>
                  <option value="MOBILE">Mobile/Manufactured Home</option>
                  <option value="LOT">Building Lot</option>
                  <option value="LAND">Raw Land</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  name="floor"
                  className="custom-select custom-select-sm"
                  onChange={this.handleChange}
                >
                  <option value={""}>Flooring</option>
                  <option value={"carpet"}>Carpet</option>
                  <option value={"wooden"}>Wooden</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  name="parking"
                  className="custom-select custom-select-sm"
                  onChange={this.handleChange}
                >
                  <option value={""}>Parking Type</option>
                  <option value={"open"}>Open Parking</option>
                  <option value={"closed"}>Closed Parking</option>
                </select>
              </div>
              <div className="form-group">
                <Button variant="outline-primary" onClick={this.handleAdd}>
                  Add Listing!
                </Button>
              </div>
            </div>
            <div className="col-md-6">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="sale"
                  onChange={this.handleOnChangeListingType}
                />
                <label class="form-check-label" style={{color:"black"}} for="inlineRadio1">
                  For Sale
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="rent"
                  onChange={this.handleOnChangeListingType}
                />
                <label class="form-check-label" style={{color:"black"}} for="inlineRadio2">
                  For Rent
                </label>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="year"
                  className="form-control"
                  placeholder="Year Built"
                  onChange={this.handleChange}
                />{" "}
              </div>
              <div className="form-group">
                <textarea
                  name="amenities"
                  className="form-control"
                  placeholder="Amenities"
                  style={{ width: "100%", height: "150px" }}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="Price in $"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  name="terms"
                  className="form-control"
                  placeholder="Terms *"
                  style={{ width: "100%", height: "150px" }}
                  onChange={this.handleChange}
                />
              </div>

<div>
              {this.state.type == "rent" ? (
                <div>
                  <div className="form-group">
                    <input
                      type="number"
                      name="securityDeposit"
                      className="form-control"
                      placeholder="Security Deposit"
                      onChange={this.handleChange}
                    />{" "}
                  </div>
                  <div>
                  <label for="date"> Available Date</label>
                  <input
                    type="date"
                    name="availableDate"
                    id="date"
                    value={this.state.date}
                    onChange={this.handleChange}
                    class="form-control"
                    required
                  />
                  </div>
                </div>
              ) : (
                ""
              )}
              </div>
<div>
             {this.state.userrole == "realtor" ? (
                  
                
                  <div>
                    <label for="date" style={{color:"black"}}>On behalf of Seller</label>
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
        </form>
      </div>
    );
  }
}

export default Sell;
