import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import {backendServer} from '../webconfig';
import "../assets/homefindericon.png";

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
        }
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('status');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.clear();
        this.setState({
            logoutRedirect : true
        })
        window.location.href="/";
    }

    // componentDidMount() {
    //     axios.get(`${backendServer}/user/getUserDetails/${localStorage.getItem('id')}`)
    //         .then(response => {
    //             let data = response.data.data;
    //             if(localStorage.getItem('type')==='Customer'){
    //                 this.setState({
    //                     addresses: data.addresses,
    //                     cards: data.cards,
    //                     cart: data.cart,
    //                 })
    //             }
    //             this.setState({
    //                name: data.name
    //             })
               
    //         }
    //         ).catch(ex => {
    //             alert(ex);
    //         });
    //         if(localStorage.getItem('type')==='Customer'){
    //             axios.get(`${backendServer}/category/getAllCategories`)
    //             .then(response => {
    //                     this.setState({
    //                         categories : response.data.data
    //                     })
    //                 }
    //             ).catch( ex =>{
    //                alert(ex);
    //             });
    //         }
    //         else if(localStorage.getItem('type')==='Seller'){
    //             axios.get(`${backendServer}/category/getAllCategories`)
    //             .then(response => {
    //                     this.setState({
    //                         categories : response.data.data
    //                     })
    //                 }
    //             ).catch( ex =>{
    //                alert(ex);
    //             });
    //         }
            
    // }

    componeneDidUpdate() {
        if (this.stat.redirect) {
            this.setState({
                redirect: false
            })
        }
    }
    categoriesChangeHandler = (e) => {
        this.setState({
            selectedCategory: e.target.value
        })
    }

    searchChangeHandler = (e) => {
        this.setState({
            searchValue: e.target.value,
            redirect: false
        })
    }

    submitSearch = () => {
        if (this.state.searchValue) {
            this.setState({
                redirect: true
            })
        }

    }

    render() {
        let navLinks = null;
        let navLinkBottom = null;
        if (localStorage.getItem('role') === 'admin') {
            navLinks = (
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/search">Search</Link></li>
                    <li><Link  to="/" onClick={this.handleLogout}>Logout</Link></li>
                    {/* <li><Link to="/carthome"><span><i className="icon-shopping-cart icon-2x"></i></span><span className="badge badge-light">{this.state.cart.length}</span></Link></li> */}
                    <li><Link to="/admin-dashboard"><span><i className="icon-shopping-cart icon-2x">Dashboard</i></span></Link></li>
                </ul>
            );

            // navLinkBottom = (
            //     <div className="row">
            // <div className="col-sm-2 white">
            //     <span><i className="glyphicon glyphicon-map-marker"></i> Deliver to <b> {this.state.addresses.length > 0 ? this.state.addresses[0].city+ " " +this.state.addresses[0].zipcode : "No address added" } </b></span>
            // </div>
            //     <div className="col-sm-7">
            //         <ul className="nav navbar-nav xshop">
            //              <li><Link to="/product-search">Dashboard</Link></li>
            //             <li><Link to="/orders">Orders</Link></li>
            //             <li><Link to="/payment">Cards</Link></li>
            //             <li><Link to="/address">Address</Link></li>
            //         </ul>
            //     </div>
            //     <div className="col-sm-3">&nbsp;</div>
            //     </div>
            // );
        }
        else {
         
            navLinks = (
                <div className="container-fluid">
                <div className="col-sm-offset-2 col-sm-7">
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/homelistings">Dashboard</Link></li>
                        <li><Link to="/rentalListings">Rent</Link></li>
                        <li><Link to="/leaseApplication/:id">Buy</Link></li>
                        <li><Link to="/sell">Sell</Link></li>
                        <li><Link to="/search">Search</Link></li>
                        <li><Link to="/" onClick={this.handleLogout}>Logout</Link></li>

                    </ul>
                </div>
                <div className="col-sm-3">&nbsp;</div>
                </div>
            )

        }
       
        


        let redirectVar = null;
        let categoriesDropDownOptions = this.state.categories.map(c => {
            return (
                <li className="li-dropdown" key={c.category}><button className="btn btn-link" onClick={this.categoriesChangeHandler} value={c.category}> {c.category} </button></li>
            )
        });
        if (this.state.redirect && localStorage.getItem('type')==='Customer') {
            let link = "/product-search?name=" + this.state.searchValue + "&category=" + this.state.selectedCategory;
            redirectVar = <Redirect to={link} />
        }
        else if (this.state.redirect && localStorage.getItem('type')==='Seller') {
            console.log("he is a seller")
            let link = "/sellerinventory?name=" + this.state.searchValue + "&category=" + this.state.selectedCategory + "&seller_id=" + localStorage.getItem("id");
            redirectVar = <Redirect to={link} />
        }

        let logoutRedirect=null;
        if(this.state.logoutRedirect){
            logoutRedirect = <Redirect to="/"/>
        }
       
        return (
            
           
        
            <div>
                                        {navLinks}

            <nav class="navbar navbar-inverse">
            <div class="container-fluid">
            <div class="navbar-header">

            {/* <img 	style={{image:("../../assets/house2.jpg")}}/> */}
            <a class="navbar-brand" href="/search">WebSiteName</a>
            </div>
            <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><Link to="/sell">Sell</Link></li>
            <li><Link to="/homelistings">Buy</Link></li>
            <li><Link to="/rentalListings">Rent</Link></li>
            <li><a href="/" onClick={this.handleLogout}>Logout</a></li>

            </ul>
            {/* <form class="navbar-form navbar-left" action="/action_page.php">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Search"/>
            </div>
            <button type="submit" class="btn btn-default">Submit</button>
            </form> */}
            </div>
            </nav>
            </div>
        )
    
}
}
export default Navbar;