import axios from "axios"

const BASE_URL = "http://localhost:8080/api/v1.0/tweets/"

class TweetService {
  getAllTweets() {
    return axios.get(BASE_URL + "all")
  }

  postTweet(tweet) {
    return axios.post(BASE_URL + "add", tweet)
  }

  deleteTweet(id) {
    return axios.delete(BASE_URL + "delete", {
      headers: {
        tweetId: id
      }
    })
  }

  updateTweet(tweet) {
    return axios.put(BASE_URL + "update", tweet)
  }

  likeTweet(tweetLike) {
    return axios.put(BASE_URL + "like", tweetLike)
  }

  showReply(id) {
    return axios.put(BASE_URL + "showReply", id)
  }

  replyTweet(tweetReply) {
    return axios.post(BASE_URL + "reply", tweetReply)
  }

  searchUserTweets(username) {
    return axios.get(BASE_URL + username)
  }
}

export default new TweetService()
