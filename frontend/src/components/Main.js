import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import Navbar from '../components/navbar';
import Login from './Login/Login';

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
            </Fragment>
                 }
               {!localStorage.getItem('id') &&
                    <Fragment>
                
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