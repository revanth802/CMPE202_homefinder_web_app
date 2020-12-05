import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { backendServer } from "../../webconfig.js";
import { Card, Button, ButtonGroup, Form } from "react-bootstrap";

class ListingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homes: [],
      flag1: false,
      listingId: this.props.match.params.id,
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
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
          <br></br>
          <div className="container lease-app-form">
            <div className="card applications-end">
              <div className="card-head">
                <h2 className="page-title">Listing Details</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <Card.Img
                      variant="top"
                      src={imgSrc}
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
                      <span className="field-names">House Type: </span>
                      {msg.type}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">Address Line 1: </span>
                      {msg.addressLine1}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">Address Line 2: </span>
                      {msg.addressLine1}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">City: </span>
                      {msg.city}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">State: </span>
                      {msg.state}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">Zipcode: </span>
                      {msg.zipcode}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">House Type: </span>
                      {msg.hometype}
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
                      <span className="field-names">
                        Number of bedrooms:{" "}
                      </span>{" "}
                      {msg.bedrooms}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">
                        Number of bathrooms:{" "}
                      </span>{" "}
                      {msg.bathrooms}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">Year built: </span>{" "}
                      {msg.year_built}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">Flooring: </span>{" "}
                      {msg.flooring}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">Parking: </span>{" "}
                      {msg.parking}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">Amenities: </span>{" "}
                      {msg.amenities}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">Remove this ID: </span>{" "}
                      {msg._id}
                    </p>
                    <p>
                      {" "}
                      <span className="field-names">
                        Remove This Status:{" "}
                      </span>{" "}
                      {msg.status}
                    </p>
                  </div>
                </div>
                {/* <div className="row"> */}
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

export default ListingDetails;
