import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

import Login from './Login/Login';

//Create a Main Component
class Main extends Component {
    render() {
        // let navRoute = <Navbar />
        // let footer = <Footer />

    
        return (
            <div>
            
               
                    <Fragment>
                    
                        <Route exact path="/login" component={Login} />
                        {/* <Route exact path="/signup" component={SignUp} /> */}
                    </Fragment>
        
               

            </div>
        )
    }
}
//Export The Main Componenta
export default Main;