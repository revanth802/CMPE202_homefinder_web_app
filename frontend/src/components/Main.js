import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
// import { admin } from '../../../backend/api/admin/admin.service';

// import Navbar from '../components/navbar';
import Navbar from "../components/navbar_bootstrap";
import HomeListings from "../components/homelistings";
import Login from "./Login/Login";
import admin from "./Admin/admin";
import Search from "./Search/Search";
import RentalListings from "../components/rentalListings";
import LeaseApplication from "../components/leaseApplication";
import Sell from "./Sell/sell";
import mylistings from "./Mylistings/mylistings";
import currentlisting from "./Mylistings/currentlisting";
import rentalApplications from "./Applications/rentalApplications";
import myfavorites from "./myfavourites/myfavourites";
import BuyApplication from "../components/buyApplication"
import ScheduleTour from "../components/scheduleTour"

//Create a Main Component
class Main extends Component {
  render() {
    let navRoute = <Navbar />;
    // let footer = <Footer />

    return (
      <div>
        {localStorage.getItem("role") == "admin" && (
          <Fragment>
            {navRoute}
            <Route exact path="/admin-dashboard" component={admin} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/" component={Login} />
          </Fragment>
        )}
        {localStorage.getItem("role") != "admin" &&
          localStorage.getItem("role") && (
            <Fragment>
              {navRoute}
              <Route exact path="/" component={Login} />
              <Route exact path="/homelistings" component={HomeListings} />
              <Route exact path="/rentalListings" component={RentalListings} />
              <Route
                path="/leaseApplication/:id"
                component={LeaseApplication}
              />
              <Route
                path="/scheduleTour/:id"
                component={ScheduleTour}
              />
              <Route path="/currentlisting/:id" component={currentlisting} />
              <Route
                path="/buyApplication/:id"
                component={BuyApplication}
              />
              <Route exact path="/myfavorites" component={myfavorites} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/sell" component={Sell} />
              <Route exact path="/mylistings" component={mylistings} />
              <Route
                exact
                path="/rentalApplications/:id"
                component={rentalApplications}
              />
            </Fragment>
          )}

        {!localStorage.getItem("role") && (
          <Fragment>
            <Route exact path="/" component={Login} />
          </Fragment>
        )}
      </div>
    );
  }
}
//Export The Main Componenta
export default Main;
