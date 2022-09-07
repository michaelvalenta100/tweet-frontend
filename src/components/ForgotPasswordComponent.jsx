import React, { Component } from "react"
import UserService from "../services/UserService"
import { message } from "antd"
import "antd/dist/antd.css"
import HeaderComponent from "./HeaderComponent"

class ForgotPasswordComponent extends Component {
  constructor(props) {
    super(props)

    this.state = { username: localStorage.getItem("username"), password: "", confirmPassword: "" }
    this.reset = this.reset.bind(this)
  }

  reset() {
    let user = { username: this.state.username, password: this.state.password }

    if (this.state.password !== this.state.confirmPassword) {
      message.error("Password and confirm password must be the same!")
    } else {
      UserService.reset(user).then(() => {
        console.log(user)
        this.props.history.push("/login")
      })
    }
  }

  passwordHandler = event => {
    this.setState({ password: event.target.value })
  }

  confirmPasswordHandler = event => {
    this.setState({ confirmPassword: event.target.value })
  }

  render() {
    return (
      <div>
        <HeaderComponent />
        <div
          className="container"
          style={{
            width: "70%"
          }}
        >
          <h2 className="p-3">Reset Password for {localStorage.getItem("username")}</h2>

          <form>
            <div className="form-outline mb-4">
              <input type="password" id="form2Example1" className="form-control" placeholder="New Password" onChange={this.passwordHandler} />
            </div>
            <div className="form-outline mb-4">
              <input type="password" id="form2Example2" className="form-control" placeholder="Confirm Password" onChange={this.confirmPasswordHandler} />
            </div>

            <button type="button" className="btn btn-primary btn-block mb-4" onClick={this.reset}>
              Reset
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default ForgotPasswordComponent
