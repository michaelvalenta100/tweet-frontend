import axios from "axios"

const BASE_URL = "http://localhost:8080/api/v1.0/tweets/"

class UserService {
  getAllUsers() {
    return axios.get(BASE_URL + "users" + "/all")
  }

  login(user) {
    return axios.post("http://localhost:8080/login", user)
  }

  register(user) {
    return axios.post(BASE_URL + "register", user)
  }

  reset(user) {
    return axios.post(BASE_URL + "forgot", user)
  }

  searchUsers(username) {
    return axios.get(BASE_URL + "user" + "/search/" + username)
  }
}

export default new UserService()
