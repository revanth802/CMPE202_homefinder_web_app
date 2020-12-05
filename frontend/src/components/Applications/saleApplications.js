import React, { Component, Fragment } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { backendServer } from "../../webconfig.js";
import "./rentalApplications.css";
// import { Button } from "react-bootstrap";
// import Icon from "@material-ui/core/Icon";

class saleApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listingId: this.props.match.params.id,
      applications: [],
      changingState: true,
      owners: [],
      role : localStorage.getItem("role")
    };
  }

  async componentDidMount() {
    console.log("saleApplications componentDidMount before axios");
   await axios
      .get(
        `${backendServer}/rentalApplications/rentalApplications/${this.state.listingId}`
      )
      .then((response) => {
        // console.log("Pro are::", response.data);
        this.setState({
          applications: response.data,
        });
        console.log("rentalApplications componentDidMount after axios");
      });

    
      await axios
          .get(`${backendServer}/sell/getOwners`)
          .then((response) => {
            console.log("Pro are::", response.data);
            this.setState({
              owners: response.data,
            });
            console.log("Pro are::", this.state.owners);
          });
      
  }

  handleStatusChange = (e, id) => {
    // e.preventDefault();
    console.log("e", e.target.name, e.target.value, id);
    const data = {
      id: id,
      status: e.target.value,
      listingId: this.state.listingId,
    };
    axios
      .post(`${backendServer}/rentalApplications/updateStatus/`, data)
      .then((response) => {
        console.log(response);
        if (response.data === "error") {
          console.log("error");
          this.setState({
            showRegistrationError: true,
          });
        } else if (response.data === "success") {
          this.componentDidMount();
          this.setState({
            changingState: !this.state.changingState,
          });
        }
      })
      .catch((ex) => {
        this.setState({
          changingState: !this.state.changingState,
        });
      });
  };

  render() {
    console.log("rentalApplications render" + this.state.listingId);
 
    let optionItems = this.state.owners.map((owner) =>
    <option key={owner}>{owner}</option>);
    
    return (
      // <h1>Heloowww</h1>
      <div className="container">
        <div className="applications-list">
          {/* <div>Heloowww</div>
        <pre>{JSON.stringify(this?.state?.applications, null, 2)}</pre> */}
          {this?.state?.applications?.map((application) => (
            <div className="card application" key={application._id}>
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <div className="row">
                      <div className="col-9 listings-info">
                        <div className="row">
                          <div className="col-4">
                            <div>Full Name:</div>
                            <div>Offered Price:</div>
                          </div>
                          <div className="col-5">
                            <div>
                              {application.firstName} {application.lastName}
                            </div>
                            <div>{application.empName}</div>
                            <div>{application.offerPrice}</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-3">
                        <div class="input-group mb-3">
                          <select
                            name="status"
                            class="custom-select"
                            id="inputGroupSelect01"
                            onChange={(e) =>
                              this.handleStatusChange(e, application._id)
                            }
                            value={application.status}
                          >
                            {/* <option selected disabled>
                              {application.status}
                            </option> */}
                            <option value="approve">Approve</option>
                            <option value="reject">Reject</option>
                            <option value="pending">Pending</option>
                          </select>
                        </div>
                        {/* <div>{application.status}</div> */}
                      </div>

                      <div>
             {this.state.role == "realtor" ? (
                  
                
                  <div>
                    <label for="date" style={{color:"black"}}>On behalf of Seller</label>
                                <select
                  name="owner"
                  className="custom-select custom-select-sm"
                  onChange={this.handleChange}>
                  <option value="">Select</option>
   {optionItems}
                </select>
                </div>
                   
                 
              
              ) : (
                ""
              )}
            </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default saleApplications;
