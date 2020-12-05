import React, { Component } from "react";
import { Link } from "react-router-dom";
// import cookie from 'react-cookies';
import { Redirect } from "react-router";
import axios from "axios";
import { backendServer } from "../webconfig";
// import "./navbar.css";
import "../assets/homefindericon.png";
import "../../src/assets/homefindericon.png";
//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedCategory: "All",
      addresses: [],
      cards: [],
      cart: [],
      name: null,
      searchValue: "",
      redirect: false,
      logoutRedirect: false,
    };
    this.handleLogout = this.handleLogout.bind(this);
  }
  //handle logout to destroy the cookie
  handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("status");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.clear();
    this.setState({
      logoutRedirect: true,
    });
    window.location.href = "/";
  };

  componeneDidUpdate() {
    if (this.stat.redirect) {
      this.setState({
        redirect: false,
      });
    }
  }
  categoriesChangeHandler = (e) => {
    this.setState({
      selectedCategory: e.target.value,
    });
  };

  searchChangeHandler = (e) => {
    this.setState({
      searchValue: e.target.value,
      redirect: false,
    });
  };

  submitSearch = () => {
    if (this.state.searchValue) {
      this.setState({
        redirect: true,
      });
    }
  };

  render() {
    let navLinks = null;
    let navLinkBottom = null;
    if (localStorage.getItem("role") === "admin") {
      navLinks = (
        <ul className="navbar-nav mr-auto">
          <li class="nav-item">
            <Link class="nav-link" to="/search">
              Search
            </Link>
          </li>
          {/* <li class="nav-item">
            <Link class="nav-link" to="/" onClick={this.handleLogout}>
              Logout
            </Link>
          </li> */}
          {/* <li><Link to="/carthome"><span><i className="icon-shopping-cart icon-2x"></i></span><span className="badge badge-light">{this.state.cart.length}</span></Link></li> */}
          <li class="nav-item">
            <Link class="nav-link" to="/admin-dashboard">
              <span>
                <i className="icon-shopping-cart icon-2x">Search</i>
              </span>
            </Link>
          </li>
        </ul>
      );
    } else if (localStorage.getItem("role") === "user") {
      navLinks = (
        <ul className="navbar-nav mr-auto">
          <li class="nav-item">
            <Link class="nav-link" to="/search">
              Search
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/rentalListings">
              Rent
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/homelistings">
              Buy
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/sell">
              List Your Property
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/mylistings">
              Manage Listings
            </Link>
          </li>

          <Link class="nav-link" to="/myfavorites">
            My Favorites
            <li
              width="100px"
              height="200px"
              class="fas fa-heart fa-lg"
              style={{ color: "red" }}
            ></li>
          </Link>
          <Link class="nav-link" to="/myapplications">
              My Applications
            </Link>
          <li class="nav-item">
            <Link class="nav-link" to="/myfavorites">
              My Favorites{" "}
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-heart-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
              </svg>
              {/* <img src="/open-iconic/svg/icon-name.svg" alt="icon name" /> */}
            </Link>
          </li>
        </ul>
      );
    } else {
      navLinks = (
        <ul className="navbar-nav mr-auto">
          <li class="nav-item">
            <Link class="nav-link" to="/search">
              Search
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/rentalListings">
              Rent
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/homelistings">
              Buy
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/sell">
              List Your Property
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/mylistings">
              Manage Listings
            </Link>
          </li>
          <Link class="nav-link" to="/myapplications">
              My Applications
            </Link>

         
        </ul>
      );
    }

    let redirectVar = null;
    let categoriesDropDownOptions = this.state.categories.map((c) => {
      return (
        <li className="li-dropdown" key={c.category}>
          <button
            className="btn btn-link"
            onClick={this.categoriesChangeHandler}
            value={c.category}
          >
            {" "}
            {c.category}{" "}
          </button>
        </li>
      );
    });
    if (this.state.redirect && localStorage.getItem("type") === "Customer") {
      let link =
        "/product-search?name=" +
        this.state.searchValue +
        "&category=" +
        this.state.selectedCategory;
      redirectVar = <Redirect to={link} />;
    } else if (
      this.state.redirect &&
      localStorage.getItem("type") === "Seller"
    ) {
      console.log("he is a seller");
      let link =
        "/sellerinventory?name=" +
        this.state.searchValue +
        "&category=" +
        this.state.selectedCategory +
        "&seller_id=" +
        localStorage.getItem("id");
      redirectVar = <Redirect to={link} />;
    }

    let logoutRedirect = null;
    if (this.state.logoutRedirect) {
      logoutRedirect = <Redirect to="/" />;
    }

    return (
      <div style={{ color: "black" }}>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          {/* <Link class="navbar-brand" to="/search">
            Home Finder
          </Link> */}

          <a class="navbar-brand " href="#">
            <i class="fas fa-home fa-lg"></i>
          </a>
          {navLinks}
          
          
          
     
          <Link class="nav-link" to="/" onClick={this.handleLogout}>
            Logout
          </Link>
          {/* <li class="nav-item"> */}
          <ul className="navbar-nav ml-auto">
            {/* <li class="nav-item">
              <Link class="nav-link" to="/myapplications">
                My Applications
              </Link>
            </li> */}

            <Link class="nav-link" to="/" onClick={this.handleLogout}>
              Logout
            </Link>
          </ul>
        </nav>
      </div>
    );
  }
}
export default Navbar;
