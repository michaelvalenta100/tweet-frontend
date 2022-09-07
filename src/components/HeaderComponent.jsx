import React, { Component } from "react"
import { withRouter } from "react-router-dom"

import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { AiFillHome } from "react-icons/ai"
import { RiLogoutBoxRLine, RiLoginBoxLine } from "react-icons/ri"

import "./styles/nav.css"

import { NavLink } from "react-router-dom"

class HeaderComponent extends Component {
  constructor(props) {
    super(props)

    this.state = { username: "", loggedIn: false }
    this.searchUser = this.searchUser.bind(this)
    this.logOut = this.logOut.bind(this)
    this.login = this.login.bind(this)
  }

  searchUser() {
    localStorage.setItem("searchUserName", this.state.username)
    this.props.history.push("/searchUser")
    window.location.reload(false)
  }

  searchUserHandler = event => {
    this.setState({ username: event.target.value })
  }

  login() {
    this.props.history.push("/login")
  }

  logOut() {
    localStorage.setItem("username", "")
    localStorage.setItem("password", "")
    this.props.history.push("/login")
  }

  render() {
    if (localStorage.getItem("username") === "") {
      this.state.loggedIn = false
    } else {
      this.state.loggedIn = true
    }

    return (
      <Navbar bg="light" expand="lg" style={{ fontSize: "18px" }}>
        <Container fluid>
          <Navbar.Brand href="/allTweets">
            <AiFillHome size={50}></AiFillHome>
          </Navbar.Brand>

          <NavLink activeClassName="active" to="/allTweets">
            All Tweets
          </NavLink>
          <NavLink activeClassName="active" to="/allUsers">
            All Users
          </NavLink>
          {this.state.loggedIn && (
            <>
              <NavLink to="/myTweets">My Tweets</NavLink>
              <NavLink to="/forgotPassword">Forgot Password</NavLink>
            </>
          )}
          {this.state.loggedIn && (
            <Nav.Link onClick={this.logOut}>
              Logout <RiLogoutBoxRLine size={20}></RiLogoutBoxRLine>
            </Nav.Link>
          )}

          {!this.state.loggedIn && (
            <Nav.Link onClick={this.login}>
              Login <RiLoginBoxLine size={20}></RiLoginBoxLine>
            </Nav.Link>
          )}

          <Form className="d-flex">
            <Form.Control type="search" placeholder="Search by username" className="me-2" aria-label="Search" onChange={this.searchUserHandler} />
            <Button variant="outline-success" onClick={this.searchUser}>
              Search
            </Button>
          </Form>
        </Container>
      </Navbar>
    )
  }
}

export default withRouter(HeaderComponent)
