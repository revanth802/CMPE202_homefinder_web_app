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
                {localStorage.getItem('id') &&
                    <Fragment>
                    
                        {/* {navRoute}
                      
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/product-search" component={ProductSearch} />


                        {footer} */}
                    </Fragment>
                }
                {!localStorage.getItem('id') &&
                    <Fragment>
                        {/* <Route exact path="/login" component={Login} /> */}
                        <Route exact path="/" component={Login} />
                        {/* <Route exact path="/signup" component={SignUp} /> */}
                    </Fragment>
                }
                {/*<Route path="/login" component={Login}/>*/}

            </div>
        )
    }
}
//Export The Main Componenta
export default Main;