import React,{Component} from 'react';
import axios from "axios";
import { Redirect } from "react-router";
import { backendServer } from "../webconfig";
import {Card,Button,ButtonGroup} from 'react-bootstrap';

class RentalListings extends Component {
    constructor(props){
        super(props);
        this.state = {
         homes:[],
         flag1:false
        };
    }

    loadRent(id){
        this.setState({
            redirect:`/leaseApplication/${id}`
        })
    }

    scheduleTour(id){
      this.setState({
        redirect:`/scheduleTour/${id}`
    })
    }

    loadDetails(id){
      this.setState({
        redirect:`/listingDetails/${id}`
    })
    }

    async componentDidMount() {
      const data = {
        email: localStorage.getItem("email")
      };
      console.log(data)
        axios
          .post(`${backendServer}/homelistings/rentalListings/`,data)
          .then((response) => {
            console.log("Pro are::", response.data);
            this.setState({
             homes: response.data,
            });
            console.log("Pro are::", this.state.homes);
          });
      }

    render()
    {
        let redirectVar = null;
        if (this.state.redirect) {
            redirectVar = <Redirect push to={this.state.redirect} />;
          }
        let candr = this.state.homes.map((msg) => {
            return (
            <div>
            &nbsp;
                <Card style={{width:"50%",marginLeft:"100px",height:"80%"}}>
                <Card.Header style={{color:"black"}}>{msg.name}</Card.Header>
                <Card.Body>
                  <Card.Text>
                  <img
              alt="AZ"
              src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                style={{width:"100px",height:"120px"}}
              // id="avatar-image"
            />
                  <p style={{color:"black"}}>Address: {msg.addressLine1}</p> 
                  <p style={{color:"black"}}>Rent : {msg.price}</p>
                  <p style={{color:"black"}}>Area : {msg.area}</p>


                  </Card.Text>
                  <ButtonGroup style={{marginLeft:"450px",marginTop:"-80px"}} className="mb-2">
                
                  <Button onClick={(e)=> this.loadDetails(msg._id)}>View Details</Button>
                  &nbsp;
        <Button onClick={(e)=> this.scheduleTour(msg._id)}>Schedule Tour</Button>
        &nbsp;
        <Button onClick={(e)=> this.loadRent(msg._id)}>Rent</Button>
        &nbsp;
       
      </ButtonGroup>
                </Card.Body>
              </Card>
              
                  &nbsp;
              </div>
            );
          });
          return (
            <div>
            {/* <div class="card-deck"> */}
            {redirectVar}
              {candr}
              {/* </div> */}
             
      
              </div>
               
          );
    }
}

export default RentalListings;