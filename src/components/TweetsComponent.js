import React, { Component } from "react"
import TweetService from "../services/TweetService"
import HeaderComponent from "./HeaderComponent"

import { Button, Form } from "react-bootstrap"
import styles from "./styles/TweetItem.module.css"
import { RiMessage2Fill, RiUser3Fill, RiSendPlane2Fill } from "react-icons/ri"

import { AiFillLike, AiOutlineLike } from "react-icons/ai"

import { ImBin } from "react-icons/im"

import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"
import ru from "javascript-time-ago/locale/ru.json"
import ReactTimeAgo from "react-time-ago"

import { EditText } from "react-edit-text"
import "react-edit-text/dist/index.css"

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

class TweetsComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tweets: [],
      username: "",
      tweetMsg: "",
      time: "",
      like: [],
      tagText: "",
      replyTweet: [],
      tweetUpdate: "",
      tweetReplyMsg: "",
      showReplys: false,
      loggedIn: false
    }

    this.postTweet = this.postTweet.bind(this)
    this.replyTweet = this.replyTweet.bind(this)
    this.deleteTweet = this.deleteTweet.bind(this)
    this.likeTweet = this.likeTweet.bind(this)
    this.updateTweet = this.updateTweet.bind(this)
    this.enableReply = this.enableReply.bind(this)
  }

  enableReply(id) {
    let showReply = {
      id: id
    }
    TweetService.showReply(showReply).then(() => {
      this.props.history.push("/allTweets")
      window.location.reload()
    })
  }

  postTweet() {
    let tweet = {
      tweetMsg: this.state.tweetMsg,
      username: localStorage.getItem("username"),
      time: new Date(),
      like: [],
      tagText: this.state.tagText,
      replyTweet: [],
      showReplys: false,
      tweetReply: ""
    }
    console.log("tweet ->" + JSON.stringify(tweet))
    TweetService.postTweet(tweet).then(() => {
      this.props.history.push("/allTweets")
      window.location.reload()
    })
  }

  postTweetHandler = event => {
    this.setState({ tweetMsg: event.target.value })
  }

  postTagHandler = event => {
    this.setState({ tagText: event.target.value })
  }

  replyTweet(tweet) {
    const tweetId = tweet.id
    const newMsg = this.state[tweetId].toString()

    let originalTweet = tweet
    let tweetReply = {
      username: localStorage.getItem("username"),
      tweetMsg: newMsg,
      time: new Date(),
      like: [],
      tagText: "",
      replyTweet: []
    }

    let replyTweet = {
      originalTweet: originalTweet,
      tweetReply: tweetReply
    }
    console.log("tweet ->" + JSON.stringify(replyTweet))
    TweetService.replyTweet(replyTweet).then(() => {
      this.props.history.push("/allTweets")
      window.location.reload()
    })
  }

  deleteTweet(id) {
    console.log(id)
    TweetService.deleteTweet(id).then(() => {
      this.props.history.push("/allTweets")
      window.location.reload()
    })
  }

  likeTweet(id) {
    let tweetLike = {
      tweetId: id,
      userId: localStorage.getItem("username")
    }

    TweetService.likeTweet(tweetLike).then(() => {
      this.props.history.push("/allTweets")
      window.location.reload()
    })
  }

  updateTweet(tweet) {
    let updatedTweet = {
      tweetId: tweet.name,
      tweetMsg: tweet.value
    }
    console.log("tweet ->" + JSON.stringify(updatedTweet))
    TweetService.updateTweet(updatedTweet).then(() => {
      this.props.history.push("/allTweets")
      window.location.reload()
    })
  }

  updateTweetHandler = event => {
    this.setState({ tweetUpdate: event.target.value })
  }

  replyTweetHandler(e) {
    this.setState({ [e.target.id]: e.target.value.length })
    this.setState({ [e.target.name]: [e.target.value] })
  }

  componentDidMount() {
    TweetService.getAllTweets().then(res => {
      this.setState({ tweets: res.data })
    })
  }

  render() {
    if (localStorage.getItem("username") === "") {
      this.state.loggedIn = false
    } else {
      this.state.loggedIn = true
    }

    return (
      <div>
        <HeaderComponent />
        {this.state.loggedIn && (
          <div>
            <div className="border rounded-3 border-success p-3 shadow my-3">
              <Form className="d-flex flex-column">
                <Form.Group className="mb-3">
                  <Form.Label>
                    <div className="d-flex align-items-center mb-1">
                      <div className="mx-3">
                        <RiUser3Fill size={60} className="text-primary" />
                      </div>
                      <div className="fs-4 fw-bold">{localStorage.getItem("username")}</div>
                    </div>
                  </Form.Label>
                  <Form.Control as="textarea" row={4} placeholder="Write your tweet here..." value={this.state.tweetMsg} onChange={this.postTweetHandler} style={{ resize: "none", height: "7rem" }} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control as="textarea" row={4} placeholder="Add your tags here..." value={this.state.tagText} onChange={this.postTagHandler} style={{ resize: "none", height: "2rem" }} />
                </Form.Group>
                <div className="d-flex justify-content-end align-items-center">
                  <span>Characters: {this.state.tweetMsg.length}/144</span>
                  <Button onClick={this.postTweet} variant="success" disabled={this.state.tweetMsg.length > 144} className="col-2 mx-3">
                    Post
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        )}
        {/*  */}
        <div>
          <h2 className="p-3">All Tweets</h2>

          {this.state.tweets.reverse().map(tweet => (
            <div className="border shadow rounded-3 border-primary p-3 mt-3">
              <div className="d-flex align-items-center mb-3">
                <div className="mx-3">
                  <RiUser3Fill size={50} className="text-primary"></RiUser3Fill>
                </div>
                <div className="d-flex flex-column">
                  <div className="fw-bold">{tweet.username}</div>

                  <div className="text-secondary">
                    Posted: <ReactTimeAgo date={tweet.time} locale="en-US" />
                  </div>
                </div>
                <div className="fw-bold ms-auto">Tags: {tweet.tagText}</div>
              </div>

              {!this.state.loggedIn && <p>{tweet.tweetMsg}</p>}

              {this.state.loggedIn && (
                <div>
                  <div className="mx-3">
                    <div>
                      <EditText name={tweet.id} defaultValue={tweet.tweetMsg} onChange={this.updateTweetHandler} onSave={this.updateTweet} showEditButton />
                    </div>
                  </div>

                  <div className="d-flex justify-content-center align-items-center">
                    {/* Like button */}
                    <div className="mx-3">
                      <span className={`${styles.likeButton} mx-1 fs-4`} onClick={() => this.likeTweet(tweet.id)}>
                        {tweet.like.length > 0 ? <AiFillLike className="text-primary" /> : <AiOutlineLike className="text-primary" />}
                      </span>
                      <span>{tweet.like.length > 0 ? tweet.like.length : null}</span>
                    </div>

                    {/* Comment button */}
                    <div className="mx-3">
                      <span className={`${styles.commentButton} mx-1 fs-4`} onClick={() => this.enableReply(tweet.id)}>
                        <RiMessage2Fill className="text-secondary" />
                      </span>
                    </div>

                    {/* Delete button */}
                    <div className="mx-3">
                      <span hidden={localStorage.getItem("username") === tweet.username ? false : true} className={`${styles.commentButton} mx-1 fs-4`} onClick={() => this.deleteTweet(tweet.id)}>
                        <ImBin className="text-danger" />
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {tweet.showReplys === true ? (
                <div className="mt-3">
                  {this.state.loggedIn && (
                    <div className="d-flex align-items-center">
                      <Form className="w-100 mx-1">
                        <Form.Group>
                          <Form.Control id={tweet.time} name={tweet.id} type="text" placeholder="Write a reply..." value={this.state.any} onChange={e => this.replyTweetHandler(e)} />
                        </Form.Group>
                      </Form>

                      <span className="mx-1">{this.state[tweet.time] === undefined ? 0 : this.state[tweet.time]}/144</span>

                      <div className="ms-auto">
                        <Button variant="success" className="p-1" disabled={this.state[tweet.time] > 144} onClick={() => this.replyTweet(tweet)}>
                          <RiSendPlane2Fill className="fs-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  {tweet.replyTweet.map(commentItem => (
                    <div className="border rounded border-info my-3 px-2 pb-2">
                      <div className="d-flex align-items-center my-2">
                        <div className="me-auto mx-1">
                          <RiUser3Fill size={30} className="text-primary" />{" "}
                        </div>
                        <div className="w-100 mx-1 fw-bold">
                          <div className="fw-bold">{commentItem.username}</div>
                          <div className="text-secondary">
                            Posted: <ReactTimeAgo date={commentItem.time} locale="en-US" />
                          </div>
                        </div>
                      </div>
                      <div>{commentItem.tweetMsg}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <span></span>
              )}
            </div>
          ))}
          <br></br>
        </div>
      </div>
    )
  }
}

export default TweetsComponent
