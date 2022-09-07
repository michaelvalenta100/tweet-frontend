import "./App.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import TweetsComponent from "./components/TweetsComponent"
import UserSearchComponent from "./components/UserSearchComponent"
import LoginComponent from "./components/LoginComponent"
import RegisterComponent from "./components/RegisterComponent"
import ForgotPasswordComponent from "./components/ForgotPasswordComponent"

import UserComponent from "./components/UserComponent"
import MyTweets from "./components/MyTweets"
import UserTweets from "./components/UserTweets"

function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Switch>
            <Route path="/" exact component={LoginComponent}></Route>
            <Route path="/allTweets" exact component={TweetsComponent}></Route>
            <Route path="/allUsers" exact component={UserComponent}></Route>

            <Route path="/searchUser" exact component={UserSearchComponent}></Route>
            <Route path="/login" exact component={LoginComponent}></Route>
            <Route path="/register" exact component={RegisterComponent}></Route>
            <Route path="/forgotPassword" exact component={ForgotPasswordComponent}></Route>

            <Route path="/myTweets" exact component={MyTweets}></Route>
            <Route path="/userTweets" exact component={UserTweets}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
