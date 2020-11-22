import React, { Component } from "react";
// import { Form } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router";
import { backendServer } from "../../webconfig.js";
import "../Sell/sell.css";
import {Form,Button,Col} from 'react-bootstrap';

import { Link } from "react-router-dom";

class Sell extends Component {
  constructor(props) {
    super(props);
    this.state = {
     add1:"",
     add2:"",
     city:"",
    statex:"",
    zipcode:"",
    area:0,
    beds:0,
    baths:0,
    propertyTypes:"",
    floor:"",
    year:0,
    price:0,
    terms:"",
    amenities:""
    
    //  this.handleRemove=this.handleRemove.bind();
    };

  }

  async componentDidMount() {
    // axios
    //   .post(`${backendServer}/admin/`)
    //   .then((response) => {
    //     console.log("Pro are::", response.data);
    //     this.setState({
    //       users: response.data,
    //     });
    //     console.log("Pro are::", this.state.users);
    //   });
  }

 


 async handleRemove(e) {
      //prevent page from refresh
    //   e.preventDefault();
      console.log(e);
      const data = {
       uname: e
      };
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      console.log("req.body", data);
      await axios
        .post(`${backendServer}/admin/remove`, data)
        .then((response) => {
          console.log(response);
          if (response.data=="success") {
            console.log("Success")
            this.setState({
              msgr: "User successfully removed",
            });
          } else {
            this.setState({
              showLoginError: true,
            });
          }
        })
        .catch((ex) => {
          this.setState({
            showLoginError: true,
          });
        });
        
        this.componentDidMount();  
  };

  render() {
  
      return (
      
        <div className="container contact-form">
        <div className="contact-image">
          <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact" />
        </div>
        <form method="post">
          <h3>Add a new Listing for Sale!</h3>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input type="text" name="add1" className="form-control" placeholder="Address Line 1 *" />
              </div>
              <div className="form-group">
                <input type="text" name="add2" className="form-control" placeholder="Address Line 2 " />
              </div>
              <div className="form-group">
                <input type="text" name="city" className="form-control" placeholder="City" />
              </div>
              <div className="form-group">
                <input type="text" name="statex" className="form-control" placeholder="State" />
              </div>
              <div className="form-group">
                <input type="text" name="zipcode" className="form-control" placeholder="Zipcode (Eg: 95126)" />
              </div>
              
              <div className="form-group">
                <input type="number" name="area" className="form-control" placeholder="Area in sqft" />
              </div>
              <div className="form-group">
                <input type="number" name="beds" className="form-control" placeholder="Number of bedrooms" />
              </div>
              <div className="form-group">
                <input type="text" name="baths" className="form-control" placeholder="Number of bathrooms" />
              </div>
              <div className="form-group">
              <select
                              name="propertyTypes"
                              className="custom-select custom-select-sm"
                              onChange={this.handleChange}
                            >
                              <option value={""}>Property Type</option>
                              <option value="SFH">Single Family Home</option>
                              <option value="CONDOUNIT">
                                Condominium/Apartment
                              </option>
                              <option value="TOWNHOUSE">
                                Townhouse/Townhome
                              </option>
                              <option value="DUPLEX">Duplex</option>
                              <option value="MOBILE">
                                Mobile/Manufactured Home
                              </option>
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
                <input type="submit" name="btnSubmit" className="btnContact"  />
              </div>
            </div>
            <div className="col-md-6">
            <div className="form-group">
            <input type="number" name="year" className="form-control" placeholder="Year Built" />              </div>
            <div className="form-group">
                <textarea name="amenities" className="form-control" placeholder="Amenities" style={{width: '100%', height: '150px'}} defaultValue={""} />
              </div>
            <div className="form-group">
                <input type="number" name="price" className="form-control" placeholder="Price in $" />
              </div>
              <div className="form-group">
                <textarea name="terms" className="form-control" placeholder="Terms *" style={{width: '100%', height: '150px'}} defaultValue={""} />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
    }
 
  
}

export default Sell;
