import React, { Component, Fragment } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { backendServer } from "../../webconfig.js";
import "./rentalApplications.css";
// import { Button } from "react-bootstrap";
// import Icon from "@material-ui/core/Icon";

class rentalApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listingId: this.props.match.params.id,
      applications: [],
      changingState: true,
    };
  }

  async componentDidMount() {
    console.log("rentalApplications componentDidMount before axios");
    axios
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
  }

  handleStatusChange = (e, id) => {
    // e.preventDefault();
    console.log("e", e.target.name, e.target.value, id);
    const data = {
      id: id,
      status: e.target.value,
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
    return (
      // <h1>Heloowww</h1>
      <div className="container">
      <br></br>
      &nbsp;
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
                            <div>Employee Name:</div>
                            <div>Net Income:</div>
                            <div>Credit Score:</div>
                          </div>
                          <div className="col-5">
                            <div>
                              {application.firstName} {application.lastName}
                            </div>
                            <div>{application.empName}</div>
                            <div>{application.netIncome}</div>
                            <div>{application.creditScore}</div>
                          </div>
                        </div>
                        {/* <div>
                          Full Name: {application.firstName}{" "}
                          {application.lastName}
                        </div>
                        <div>Employee Name: {application.empName}</div>
                        <div>Net Income: {application.netIncome}</div>
                        <div>Credit Score: {application.creditScore}</div> */}
                      </div>
                      <div className="col-3">
                        {/* <div className="form-group">
                          <select
                            name="propertyTypes"
                            className="custom-select custom-select-sm"
                            onChange={this.handleChange}
                          >
                            <option value={"" selected disabled}>{application.status}</option>
                            <option value="approve">approve</option>
                            <option value="reject">reject</option>
                            <option value="pending">pending</option>
                          </select>
                        </div> */}
                        <div class="input-group mb-3">
                          {/* <div class="input-group-prepend">
                            <label
                              class="input-group-text"
                              for="inputGroupSelect01"
                            >
                              Options
                            </label>
                          </div> */}
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

export default rentalApplications;
