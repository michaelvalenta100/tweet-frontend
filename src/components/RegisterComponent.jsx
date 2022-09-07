import { message } from "antd"
import React, { Component } from "react"
import UserService from "../services/UserService"

class RegisterComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      contactNumber: "",
      password: "",
      confirmPassword: ""
    }
    this.register = this.register.bind(this)
  }

  firstNameHandler = event => {
    this.setState({ firstName: event.target.value })
  }

  lastNameHandler = event => {
    this.setState({ lastName: event.target.value })
  }

  emailHandler = event => {
    this.setState({ email: event.target.value })
  }

  contactNumberHandler = event => {
    this.setState({ contactNumber: event.target.value })
  }

  passwordHandler = event => {
    this.setState({ password: event.target.value })
  }

  confirmPasswordHandler = event => {
    this.setState({ confirmPassword: event.target.value })
  }

  usernameHandler = event => {
    this.setState({ username: event.target.value })
  }

  register() {
    let user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      contactNumber: this.state.contactNumber,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    }
    if (this.state.firstName === "") {
      message.error("First Name required!")
    } else if (this.state.lastName === "") {
      message.error("Last Name required!")
    } else if (this.state.contactNumber === "") {
      message.error("Contact Number required!")
    } else if (this.state.email === "") {
      message.error("Email required!")
    } else if (this.state.username === "") {
      message.error("Username required!")
    } else if (this.state.password === "") {
      message.error("Password required!")
    } else if (this.state.confirmPassword !== this.state.password) {
      message.error("Password and confirm password must be the same!")
    } else {
      UserService.register(user).then(res => {
        console.log(res.data.registration_status)
        if (res.data.registration_status === "Successful") {
          localStorage.setItem("username", this.state.username)
          this.props.history.push("/allTweets")
        } else message.error("Email or Username already in use, please enter new details.")
      })
    }
  }

  render() {
    return (
      <div>
        <div
          className="container"
          style={{
            width: "70%"
          }}
        >
          <h2 class="pt-3">User Registration</h2>
          <form>
            <div className="form-outline mb-4">
              <label class="form-label" for="form2Example1">
                First Name *
              </label>
              <input type="text" id="form2Example1" className="form-control" placeholder="First Name" onChange={this.firstNameHandler} />
            </div>

            <div className="form-outline mb-4">
              <label class="form-label" for="form2Example2">
                Last Name *
              </label>
              <input type="text" id="form2Example2" className="form-control" placeholder="Last Name" onChange={this.lastNameHandler} />
            </div>

            <div className="form-outline mb-4">
              <label class="form-label" for="form2Example3">
                Contact Number *
              </label>
              <input type="text" id="form2Example3" className="form-control" placeholder="Contact Number" onChange={this.contactNumberHandler} />
            </div>

            <div className="form-outline mb-4">
              <label class="form-label" for="form2Example4">
                Email *
              </label>
              <input type="email" id="form2Example4" className="form-control" placeholder="Email" onChange={this.emailHandler} />
            </div>

            <div className="form-outline mb-4">
              <label class="form-label" for="form2Example5">
                Username *
              </label>
              <input type="text" id="form2Example5" className="form-control" placeholder="Username" onChange={this.usernameHandler} />
            </div>

            <div className="form-outline mb-4">
              <label class="form-label" for="form2Example6">
                Password *
              </label>
              <input type="password" id="form2Example6" className="form-control" placeholder="Password" onChange={this.passwordHandler} />
            </div>

            <div className="form-outline mb-4">
              <label class="form-label" for="form2Example7">
                Confirm Password *
              </label>
              <input type="password" id="form2Example7" className="form-control" placeholder="Confirm Password" onChange={this.confirmPasswordHandler} />
            </div>

            <div>
              <h6 className="text-danger mb-3">All fields marked with * are required</h6>
            </div>

            <button type="button" className="btn btn-primary btn-block mb-4" onClick={() => this.register()}>
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default RegisterComponent
