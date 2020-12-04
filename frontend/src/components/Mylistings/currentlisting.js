import React, { Component, Fragment } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { backendServer } from "../../webconfig.js";
import "../Sell/sell.css";
import { Button } from "react-bootstrap";
import Icon from "@material-ui/core/Icon";

class currentlisting extends Component {
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
      securityDeposit: "",
      availableDate: "",
      type: "",
      status:"",
      homes: [],
      listingId: this.props.match.params.id,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  async componentDidMount() {
    axios
      .get(
        `${backendServer}/homelistings/getListingDetails?id=${this.state.listingId}`
      )
      .then((response) => {
        // console.log("Pro are::", response.data);
        this.setState({
          homes: response.data,
          add1: response.data.addressLine1,
          add2: response.data.addressLine2,
          city: response.data.city,
          statex: response.data.state,
          zipcode: response.data.zipcode,
          area: response.data.area,
          beds: response.data.bedrooms,
          baths: response.data.bathrooms,
          propertyTypes: response.data.hometype,
          floor: response.data.flooring,
          year: response.data.year_built,
          price: response.data.price,
          terms: response.data.leaseTerms,
          amenities: response.data.amenities,
          parking: response.data.parking,
          securityDeposit: response.data.securityDeposit,
          availableDate: response.data.availableDate,
          type: response.data.type,
        });
        console.log("Pro are::", this.state.homes);
      });
  }

  handleChange = (e) => {
    console.log("e", e.target.name, " ", e.target.value);

    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleAdd = (e) => {
    e.preventDefault();
    const data = {
      listingId: this.state.listingId,
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
      status:this.state.status,
      person: localStorage.getItem("email"),
      parking: this.state.parking,
      securityDeposit: this.state.securityDeposit,
      availableDate: this.state.availableDate,
    };

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    console.log("req.body", data);
    axios
      .post(`${backendServer}/myhomelistings/update/`, data)
      .then((response) => {
        console.log(response);
        if (response.data === "error") {
          console.log("error");
          this.setState({
            showRegistrationError: true,
          });
        } else if (response.data === "success") {
          this.setState({
            redirect: `/mylistings/`,
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
    let redirectVar = null;
    if (this.state.redirect) {
      redirectVar = <Redirect push to={this.state.redirect} />;
    }

    return (
      <div className="container contact-form">
        {redirectVar}
        <div className="contact-image">
          <img
            src="https://image.ibb.co/kUagtU/rocket_contact.png"
            alt="rocket_contact"
          />
        </div>
        <form method="post">
          <h3>Update Listing here!</h3>
          {/* {msgshow} */}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
              <label>Address Line 1</label>
                <input
                  type="text"
                  name="add1"
                  className="form-control"
                  placeholder="Address Line 1 *"
                  required
                  onChange={this.handleChange}
                  defaultValue={this.state.homes.addressLine1}
                />
              </div>
              <div className="form-group">
              <label>Address Line 2</label>
                <input
                  type="text"
                  name="add2"
                  className="form-control"
                  placeholder="Address Line 2 "
                  onChange={this.handleChange}
                  defaultValue={this.state.homes.addressLine2}
                />
              </div>
              <div className="form-group">
              <label>City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  placeholder="City"
                  onChange={this.handleChange}
                  defaultValue={this.state.homes.city}
                />
              </div>
              <div className="form-group">
              <label>State</label>
                <input
                  type="text"
                  name="statex"
                  className="form-control"
                  placeholder="State"
                  onChange={this.handleChange}
                  defaultValue={this.state.homes.state}
                />
              </div>
              <div className="form-group">
              <label>Zipcode</label>
                <input
                  type="text"
                  name="zipcode"
                  className="form-control"
                  placeholder="Zipcode (Eg: 95126)"
                  onChange={this.handleChange}
                  defaultValue={this.state.homes.zipcode}
                />
              </div>

              <div className="form-group">
              <label>Area in sqft</label>
                <input
                  type="number"
                  name="area"
                  className="form-control"
                  placeholder="Area in sqft"
                  onChange={this.handleChange}
                  defaultValue={this.state.homes.area}
                />
              </div>
              <div className="form-group">
              <label>Number of beds</label>
                <input
                  type="number"
                  name="beds"
                  className="form-control"
                  placeholder="Number of bedrooms"
                  onChange={this.handleChange}
                  defaultValue={this.state.homes.bedrooms}
                />
              </div>
              <div className="form-group">
              <label>Number of baths</label>
                <input
                  type="number"
                  name="baths"
                  className="form-control"
                  placeholder="Number of bathrooms"
                  onChange={this.handleChange}
                  defaultValue={this.state.homes.bathrooms}
                />
              </div>
              <div className="form-group">
              <label>Property types</label>
                <select
                  name="propertyTypes"
                  className="custom-select custom-select-sm"
                  onChange={this.handleChange}
                  value={this.state.homes.hometype}
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
              <label>Flooring</label>
                <select
                  name="floor"
                  className="custom-select custom-select-sm"
                  onChange={this.handleChange}
                  value={this.state.homes.flooring}
                >
                  <option value={""}>Flooring</option>
                  <option value={"carpet"}>Carpet</option>
                  <option value={"wooden"}>Wooden</option>
                </select>
              </div>
              <div className="form-group">
              <label>Parking</label>
                <select
                  name="parking"
                  className="custom-select custom-select-sm"
                  onChange={this.handleChange}
                  value={this.state.homes.parking}
                >
                  <option value={""}>Parking Type</option>
                  <option value={"open"}>Open Parking</option>
                  <option value={"closed"}>Closed Parking</option>
                </select>
              </div>
              <div className="form-group">
                <Button variant="outline-primary" onClick={this.handleAdd}>
                  Update Listing!
                </Button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
              <label>Year constructed</label>
                <input
                  type="number"
                  name="year"
                  className="form-control"
                  placeholder="Year Built"
                  onChange={this.handleChange}
                  defaultValue={this.state.homes.year_built}
                />{" "}
              </div>
              <div className="form-group">
              <label>Amenities</label>
                <textarea
                  name="amenities"
                  className="form-control"
                  placeholder="Amenities"
                  style={{ width: "100%", height: "150px" }}
                  onChange={this.handleChange}
                  defaultValue={this.state.homes.amenities}
                />
              </div>
              <div className="form-group">
              <label>Price in $</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="Price in $"
                  onChange={this.handleChange}
                  defaultValue={this.state.homes.price}
                />
              </div>
              <div className="form-group">
              <label>Lease Terms</label>
                <textarea
                  name="terms"
                  className="form-control"
                  placeholder="Terms *"
                  style={{ width: "100%", height: "150px" }}
                  onChange={this.handleChange}
                  defaultValue={this.state.homes.leaseTerms}
                />
              </div>
              
              {this.state.homes.type == "rent" ? (
                <div>
                  <div className="form-group">
                    <input
                      type="number"
                      name="securityDeposit"
                      className="form-control"
                      placeholder="Security Deposit"
                      onChange={this.handleChange}
                      defaultValue={this.state.homes.securityDeposit}
                    />{" "}
                  </div>
                  {/* <div>
                    {("Date", this.state.homes.availableDate.split("T")[0])}
                  </div> */}
                  <label for="date"> Available Date</label>
                  <input
                    type="date"
                    name="availableDate"
                    id="date"
                    value={this.state.date}
                    onChange={this.handleChange}
                    defaultValue={this.state.homes.availableDate.split("T")[0]}
                    class="form-control"
                    required
                  />
                </div>
              ) : (
                ""
              )}

              <div className="form-group">
              <label>Update Status</label>
                <select
                  name="status"
                  className="custom-select custom-select-sm"
                  onChange={this.handleChange}
                  value={this.state.homes.status}
                >
                  <option value={""}>Status</option>
                  <option value={"open"}>Open</option>
                  <option value={"closed"}>Closed</option>
                </select>
              </div>
              
            </div>
            
          </div>
        </form>
      </div>
    );
  }
}

export default currentlisting;
