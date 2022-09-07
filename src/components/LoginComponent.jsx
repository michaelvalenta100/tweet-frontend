import React, { Component } from "react"
import UserService from "../services/UserService"
import { message } from "antd"
import "antd/dist/antd.css"

class LoginComponent extends Component {
  constructor(props) {
    super(props)

    this.state = { username: "", password: "" }
    this.login = this.login.bind(this)
    this.register = this.register.bind(this)
  }

  register() {
    this.props.history.push("/register")
  }

  login() {
    let user = { username: this.state.username, password: this.state.password }

    UserService.login(user).then(res => {
      if (res.data.login_status === "Successful") {
        localStorage.setItem("username", this.state.username)
        this.props.history.push("/allTweets")
      } else message.error("Invalid username or password. Please try again")
    })
  }

  usernameHandler = event => {
    this.setState({ username: event.target.value })
  }

  passwordHandler = event => {
    this.setState({ password: event.target.value })
  }

  render() {
    return (
      <div
        className="container"
        style={{
          width: "70%"
        }}
      >
        <h2 class="pt-3">User Login</h2>

        <form>
          <div class="form-outline mb-4">
            <input type="text" id="form2Example1" class="form-control" onChange={this.usernameHandler} />
            <label class="form-label" for="form2Example1">
              Username
            </label>
          </div>
          <div class="form-outline mb-4">
            <input type="password" id="form2Example2" class="form-control" onChange={this.passwordHandler} />
            <label class="form-label" for="form2Example2">
              Password
            </label>
          </div>
          <button type="button" class="btn btn-primary btn-block mb-4" onClick={this.login}>
            Sign in
          </button>
          &nbsp;&nbsp;&nbsp;
          <button type="button" class="btn btn-primary btn-block mb-4" onClick={this.register}>
            Register
          </button>
        </form>
      </div>
    )
  }
}

export default LoginComponent
