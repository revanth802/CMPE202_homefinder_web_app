import React, { Component } from "react";
// import { Form } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router";
import { backendServer } from "../../webconfig.js";
// import "../Search/search.css";
import { Button, ButtonGroup } from "react-bootstrap";

import { Link } from "react-router-dom";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x1: "",
      x2: "active",
      term:"",
      minPrice: 500,
      maxPrice: 10000000,
      beds: 0,
      baths: 0,
      propertyTypes: "",
      other:"",
      year:0,
      floor:"",
      parking:"",
      loginFlag: false,
      showerrormessage: false,
      redirecttohome: false,
      showRegistrationError: false,
      regFlag: false,
      type: "sale",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      authFlag: false,
    });
  }

  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  userTypeChangeHandler = (e) => {
    this.setState({
      type: e.target.value,
    });
  };

  handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    if (this.state.showLoginError) {
      this.setState({
        showLoginError: false,
      });
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSearch = (e) => {
      //prevent page from refresh
      e.preventDefault();
      const data = {
        type:this.state.type,
        term: this.state.term,
        minPrice: this.state.minPrice,
        maxPrice:this.state.maxPrice,
        beds:this.state.beds,
        baths:this.state.baths,
        propertyTypes:this.state.propertyTypes,
        year:this.state.year,
        floor:this.state.floor,
        other:this.state.other,
        parking:this.state.parking
      };
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      console.log("req.body", data);
      axios
        .post(`${backendServer}/search/`, data)
        .then((response) => {
          if (response) {
            console.log(response);
            // localStorage.setItem("token", response.data.token);
            // localStorage.setItem("id", response.data._id);
            // localStorage.setItem("name", response.data.name);
            // localStorage.setItem("type", response.data.userType);
            // if (response.data.userType === "buyer") {
            //   window.location.href = "/userdashboard";
            // } else if (response.data.userType === "Seller") {
            //   window.location.href = "/sellerinventory";
            // } else {
            //   window.location.href = "/admin-dashboard";
            // }
            // this.setState({ redirectToHome: true });
            // this.setState({
            //   authFlag: true,
            // });
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
    
  };

  handleMsg1 = (e) => {
    //prevent page from refresh
    e.preventDefault();

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    {
      this.setState({
        type: "sale",
        x2: "active",
        x1: "",
      });
    }
  };

  handleMsg2 = (e) => {
    //prevent page from refresh
    e.preventDefault();

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    {
      this.setState({
        type: "rental",
        x1: "active",
        x2: "",
      });
    }
  };

  render() {
    let msg,
      redirectVar = null;
    if (this.state.type == "sale") msg = <p>Find Your New Home!</p>;
    else msg = <p>Find Homes for Rent</p>;
    if (this.state.redirectToHome) {
      redirectVar = <Redirect push to="/somewhere/else" />;
    }
    return (
      <div>
        <center>
          <div className="search">
            <header className="container mt-4">
              <h1 className="search-title mb-3 mb-md-0">
                <img
                  src="/images/logo-door.svg"
                  className="logo-door d-none d-md-inline"
                />
                <span
                  className="d-inline-block"
                  style={{ minWidth: "288px", background: "#00294D80" }}
                >
                  {msg}
                </span>{" "}
                <span className="semi-border d-none d-md-inline-block" />
              </h1>{" "}
              <div className="container text-center p-0">
                <div className="full-search">
                  <div className="search-box" data-v-0bf4be34>
                    &nbsp;
                    <div style={{ marginLeft: "-80px" }}>
                      <ButtonGroup
                        aria-label="Basic example"
                        style={{ marginTop: "10px" }}
                      >
                        <Button
                          variant="secondary"
                          onClick={this.handleMsg1}
                          disabled={!this.state.x1}
                        >
                          For Sale
                        </Button>
                        &nbsp;
                        <Button
                          variant="secondary"
                          onClick={this.handleMsg2}
                          disabled={!this.state.x2}
                        >
                          Rental
                        </Button>
                      </ButtonGroup>
                    </div>
                    <form
                      autoComplete="off"
                      style={{
                        height: "180px",
                        width: "650px",
                        background: "#00294D80",
                        marginLeft: "200px",
                      }}
                    >
                      <div>
                        <div
                          className="form-row"
                          style={{
                            marginTop: "20px",
                            marginLeft: "20px",
                            marginRight: "20px",
                          }}
                        >
                          <div
                            className="form-group col-12 field-search-term"
                            data-v-0bf4be34
                          >
                            <div
                              className="input-group"
                              style={{ marginTop: "20px" }}
                            >
                              <div
                                className="input-group-prepend d-none d-md-flex"
                                data-v-0bf4be34
                              >
                                <span className="input-group-text icon-search" />
                              </div>{" "}
                              <input
                                type="search"
                                name="term"
                                placeholder="Address, City or Zip"
                                autoComplete="off"
                                className="form-control form-control-lg"
                                onChange={this.handleChange}
                              />
                              <div className="input-group-btn" data-v-0bf4be34>
                                <button
                                  type="submit"
                                  aria-label="HomeFinder Search"
                                  className="btn btn-primary btn-lg"
                                  onClick={this.handleSearch}
                                >
                                  <i
                                    className="icon d-inline d-md-none icon-search"
                                    data-v-0bf4be34
                                  />
                                  <span
                                    className="label d-none d-md-inline"
                                    data-v-0bf4be34
                                  >
                                    Search
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="filters-row form-row"
                          style={{ marginLeft: "20px", marginRight: "20px" }}
                        >
                          <div
                            className="form-group col-auto d-none d-md-block field-select"
                            data-v-0bf4be34
                          >
                            <select
                              name="minPrice"
                              className="custom-select custom-select-sm"
                              onChange={this.handleChange}
                            >
                              <option value={0}>Min Price</option>
                              <option value={500}>$500</option>
                              <option value={1000}>$1,000</option>
                              <option value={1500}>$1,500</option>
                              <option value={2000}>$2,000</option>
                              <option value={2500}>$2,500</option>
                              <option value={3000}>$3,000</option>
                              <option value={3500}>$3,500</option>
                              <option value={4000}>$4,000</option>
                              <option value={4500}>$4,500</option>
                              <option value={5000}>$5,000</option>
                              <option value={10000}>$10,000</option>
                              <option value={20000}>$20,000</option>
                              <option value={30000}>$30,000</option>
                              <option value={40000}>$40,000</option>
                              <option value={50000}>$50,000</option>
                              <option value={60000}>$60,000</option>
                              <option value={70000}>$70,000</option>
                              <option value={80000}>$80,000</option>
                              <option value={90000}>$90,000</option>
                              <option value={100000}>$100,000</option>
                              <option value={125000}>$125,000</option>
                              <option value={150000}>$150,000</option>
                              <option value={175000}>$175,000</option>
                              <option value={200000}>$200,000</option>
                              <option value={225000}>$225,000</option>
                              <option value={250000}>$250,000</option>
                              <option value={275000}>$275,000</option>
                              <option value={300000}>$300,000</option>
                              <option value={350000}>$350,000</option>
                              <option value={400000}>$400,000</option>
                              <option value={450000}>$450,000</option>
                              <option value={500000}>$500,000</option>
                              <option value={550000}>$550,000</option>
                              <option value={600000}>$600,000</option>
                              <option value={650000}>$650,000</option>
                              <option value={700000}>$700,000</option>
                              <option value={750000}>$750,000</option>
                              <option value={800000}>$800,000</option>
                              <option value={850000}>$850,000</option>
                              <option value={900000}>$900,000</option>
                              <option value={950000}>$950,000</option>
                              <option value={1000000}>$1,000,000</option>
                              <option value={1250000}>$1,250,000</option>
                              <option value={1500000}>$1,500,000</option>
                              <option value={1750000}>$1,750,000</option>
                              <option value={2500000}>$2,500,000</option>
                              <option value={3000000}>$3,000,000</option>
                              <option value={3500000}>$3,500,000</option>
                              <option value={4000000}>$4,000,000</option>
                              <option value={4500000}>$4,500,000</option>
                              <option value={5000000}>$5,000,000</option>
                              <option value={6000000}>$6,000,000</option>
                              <option value={8000000}>$8,000,000</option>
                              <option value={10000000}>$10,000,000</option>
                            </select>
                          </div>{" "}
                          <div
                            className="form-group col-auto d-none d-md-block field-select"
                            data-v-0bf4be34
                          >
                            <select
                              name="maxPrice"
                              onChange={this.handleChange}
                              className="custom-select custom-select-sm"
                            >
                              <option value={10000000}>Max Price</option>
                              <option value={500}>$500</option>
                              <option value={1000}>$1,000</option>
                              <option value={1500}>$1,500</option>
                              <option value={2000}>$2,000</option>
                              <option value={2500}>$2,500</option>
                              <option value={3000}>$3,000</option>
                              <option value={3500}>$3,500</option>
                              <option value={4000}>$4,000</option>
                              <option value={4500}>$4,500</option>
                              <option value={5000}>$5,000</option>
                              <option value={10000}>$10,000</option>
                              <option value={20000}>$20,000</option>
                              <option value={30000}>$30,000</option>
                              <option value={40000}>$40,000</option>
                              <option value={50000}>$50,000</option>
                              <option value={60000}>$60,000</option>
                              <option value={70000}>$70,000</option>
                              <option value={80000}>$80,000</option>
                              <option value={90000}>$90,000</option>
                              <option value={100000}>$100,000</option>
                              <option value={125000}>$125,000</option>
                              <option value={150000}>$150,000</option>
                              <option value={175000}>$175,000</option>
                              <option value={200000}>$200,000</option>
                              <option value={225000}>$225,000</option>
                              <option value={250000}>$250,000</option>
                              <option value={275000}>$275,000</option>
                              <option value={300000}>$300,000</option>
                              <option value={350000}>$350,000</option>
                              <option value={400000}>$400,000</option>
                              <option value={450000}>$450,000</option>
                              <option value={500000}>$500,000</option>
                              <option value={550000}>$550,000</option>
                              <option value={600000}>$600,000</option>
                              <option value={650000}>$650,000</option>
                              <option value={700000}>$700,000</option>
                              <option value={750000}>$750,000</option>
                              <option value={800000}>$800,000</option>
                              <option value={850000}>$850,000</option>
                              <option value={900000}>$900,000</option>
                              <option value={950000}>$950,000</option>
                              <option value={1000000}>$1,000,000</option>
                              <option value={1250000}>$1,250,000</option>
                              <option value={1500000}>$1,500,000</option>
                              <option value={1750000}>$1,750,000</option>
                              <option value={2500000}>$2,500,000</option>
                              <option value={3000000}>$3,000,000</option>
                              <option value={3500000}>$3,500,000</option>
                              <option value={4000000}>$4,000,000</option>
                              <option value={4500000}>$4,500,000</option>
                              <option value={5000000}>$5,000,000</option>
                              <option value={6000000}>$6,000,000</option>
                              <option value={8000000}>$8,000,000</option>
                              <option value={10000000}>$10,000,000</option>
                            </select>
                          </div>{" "}
                          <div
                            className="form-group col-auto d-none d-md-block field-select"
                    
                          >
                            <select
                              name="beds"
                              className="custom-select custom-select-sm"
                              onChange={this.handleChange}
                            >
                              <option value={""}>Beds</option>
                              <option value={1}>1+ Beds</option>
                              <option value={2}>2+ Beds</option>
                              <option value={3}>3+ Beds</option>
                              <option value={4}>4+ Beds</option>
                              <option value={5}>5+ Beds</option>
                              <option value={6}>6+ Beds</option>
                              <option value={7}>7+ Beds</option>
                            </select>
                          </div>{" "}
                          <div
                            className="form-group col-auto d-none d-md-block field-select"
                            data-v-0bf4be34
                          >
                            <select
                              name="baths"
                              className="custom-select custom-select-sm"
                              onChange={this.handleChange}
                            >
                              <option value={""}>Baths</option>
                              <option value={1}>1+ Baths</option>
                              <option value={2}>2+ Baths</option>
                              <option value={3}>3+ Baths</option>
                              <option value={4}>4+ Baths</option>
                              <option value={5}>5+ Baths</option>
                            </select>
                          </div>{" "}
                          <div
                            className="col d-none d-md-block field-select"
                          >
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
                          
                        </div>
                        <div
                          className="filters-row form-row"
                          style={{ marginLeft: "20px", marginRight: "20px" }}
                        >
                          <div
                            className="form-group col-auto d-none d-md-block field-select"
                            data-v-0bf4be34
                          >
                            <select
                              name="parking"
                              className="custom-select custom-select-sm"
                              onChange={this.handleChange}
                            >
                              <option value={""}>Parking Type</option>
                              <option value={"open"}>Open Parking</option>
                              <option value={"closed"}>Closed Parking</option>
                              
                            </select>
                          </div>{" "}
                          <div
                            className="form-group col-auto d-none d-md-block field-select"
                            data-v-0bf4be34
                          >
                            <select
                              name="floor"
                              className="custom-select custom-select-sm"
                              onChange={this.handleChange}
                            >
                              <option value={""}>Flooring</option>
                              <option value={"carpet"}>Carpet</option>
                              <option value={"wooden"}>Wooden</option>
            
                            </select>
                          </div>{" "}
                          <div
                            className="form-group col-auto d-none d-md-block field-select"
                            data-v-0bf4be34
                          >
                           <input name="year"  
                              onChange={this.handleChange} type="number" maxlength="4" placeholder="Year built" style={{height:"32px",width:"100px"}}></input>
                          </div>{" "}
                          <div
                            className="form-group col-auto d-none d-md-block field-select"
                    
                          >
                             <input type="text" name="other" 
                              onChange={this.handleChange} placeholder="Other Amenities" style={{height:"32px",width:"150px"}} ></input>
                          </div>{" "}
                         
                          
                          
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </header>
          </div>
        </center>
      </div>
    );
  }
}

export default Search;
