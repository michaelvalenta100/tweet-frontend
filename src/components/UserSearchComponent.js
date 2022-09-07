import React, { Component } from "react"
import UserService from "../services/UserService"
import HeaderComponent from "./HeaderComponent"
import Button from "react-bootstrap/Button"

class UserSearchComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      user: ""
    }
  }

  setUser(theUser) {
    localStorage.setItem("userTweets", theUser)
    this.props.history.push("/userTweets")
  }

  componentDidMount() {
    UserService.searchUsers(localStorage.getItem("searchUserName")).then(res => {
      this.setState({ users: res.data })
    })
  }

  render() {
    return (
      <div>
        <HeaderComponent />

        <div>
          <h2 className="p-3">User Search Results</h2>

          {this.state.users.reverse().map(user => (
            <div className="border rounded-3 border-success p-3 shadow my-3" style={{ width: "fit-content" }}>
              <div className="fw-bold">
                {user.username}
                <Button className="ms-3" variant="outline-success" onClick={() => this.setUser(user.username)}>
                  View Tweets
                </Button>
              </div>
            </div>
          ))}
          <br></br>
        </div>
      </div>
    )
  }
}

export default UserSearchComponent
