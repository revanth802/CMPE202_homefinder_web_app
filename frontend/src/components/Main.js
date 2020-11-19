import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
// import { admin } from '../../../backend/api/admin/admin.service';

import Login from './Login/Login';
import admin from './Admin/admin';

//Create a Main Component
class Main extends Component {
    render() {
        // let navRoute = <Navbar />
        // let footer = <Footer />

    
        return (
            <div>
            
               
                    <Fragment>
                    
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/admin-dashboard" component={admin} />
                        {/* <Route exact path="/signup" component={SignUp} /> */}
                    </Fragment>
        
               

            </div>
        )
    }
}
//Export The Main Componenta
export default Main;