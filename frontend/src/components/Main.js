import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
// import { admin } from '../../../backend/api/admin/admin.service';

import Navbar from '../components/navbar';
import HomeListings from '../components/homelistings';
import Login from './Login/Login';
import admin from './Admin/admin';
import RentalListings from '../components/rentalListings'
import LeaseApplication from '../components/leaseApplication'

//Create a Main Component
class Main extends Component {
    render() {
        let navRoute = <Navbar />
        // let footer = <Footer />

    
        return (
            <div>
                {localStorage.getItem('id') &&
            <Fragment>
            {navRoute}
            <Route exact path="/admin-dashboard" component={admin} />
            <Route exact path="/homelistings" component={HomeListings} />
            <Route exact path = "/rentalListings" component = {RentalListings}/>
            <Route path = "/leaseApplication/:id" component = {LeaseApplication}/>
            </Fragment>
                 }
               {!localStorage.getItem('id') &&
                    <Fragment>
                        <Route exact path="/login" component={Login} />
                       
                
                        <Route exact path="/" component={Login} />
                        {/* <Route exact path="/signup" component={SignUp} /> */}
                    </Fragment>
        
                 }

            </div>
        )
    }
}
//Export The Main Componenta
export default Main;