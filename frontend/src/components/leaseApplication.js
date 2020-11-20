import React,{Component} from 'react';
import axios from "axios";
import { Redirect } from "react-router";
import { backendServer } from "../webconfig";
import {Card,Button,ButtonGroup,Form} from 'react-bootstrap';

class LeaseApplication extends Component {
    constructor(props){
        super(props);
        this.state = {
         homes:[],
         flag1:false,
         listingId: this.props.match.params.id
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value,
          });
    }

    handleSubmit(e){
        e.preventDefault()
        console.log("Submit lease:", this.state.empName)
        var data = {
            firstName :this.state.firstName,
            lastName: this.state.lastName,
            homeId: this.state.homes[0].id,
            empName:this.state.empName,
            creditScore:this.state.creditScore,
            netIncome:this.state.netIncome
        }

        var listingName = this.state.homes[0].address
        axios
          .post(`${backendServer}/homelistings/submitLease`,data)
          .then(async function(response,){ 
            console.log("Pro are::", response.data);
            var emailData = {
                toEmail:"thanmai.gajam@sjsu.edu",
                emailType:"Lease Application",
                listingName:listingName
            }

           await axios.post(`${backendServer}/email/sendEmail`,emailData).then((response2)=>{
               alert("Application sent")
               console.log("email sent")
           })
          });
    }
    async componentDidMount() {
        axios
          .get(`${backendServer}/homelistings/getListingDetails?id=${this.state.listingId}`)
          .then((response) => {
            console.log("Pro are::", response.data);
            this.setState({
              homes: this.state.homes.concat(response.data),
            });
            console.log("Pro are::", this.state.homes);
          });
      }

    render()
    {
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
                  <p style={{color:"black"}}>Address: {msg.address}</p> 
                  <p style={{color:"black"}}>Type : {msg.type}</p>
                  <p style={{color:"black"}}>Rent : {msg.rent}</p>
                  <p style={{color:"black"}}>Area : {msg.area}</p>

                  <form onSubmit={this.handleSubmit}>
                <label>
                 First Name:
                 <input type="text" name ="firstName" value={this.state.firstName} onChange={this.handleChange} />
                 </label>
                 <label>
                 Last Name:
                 <input type="text" name ="lastName" value={this.state.lastName} onChange={this.handleChange} />
                 </label>
                 <label>
                 Employer Name:
                 <input type="text" name ="empName"  value={this.state.empName} onChange={this.handleChange} />
                 </label>
                 <label>
                 Credit Score:
                 <input type="text"  name ="creditScore" value={this.state.creditScore} onChange={this.handleChange} />
                 </label>
                 <label>
                 Yearly Income:
                 <input type="text" name ="netIncome" value={this.state.netIncome} onChange={this.handleChange} />
                 </label>
                <input type="submit" value="Submit Lease Application" />
                    </form>

                  </Card.Text>
                 
                 
                </Card.Body>
              </Card>
              
                  &nbsp;
              </div>
            );
          });
          return (
            <div>
            {/* <div class="card-deck"> */}
              {candr}
              {/* </div> */}
             
      
              </div>
               
          );
    }
}

export default LeaseApplication;