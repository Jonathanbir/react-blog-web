import axios from "axios";
const API_URL = "http://localhost:8080/api/v1/users";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(fullname, email, password, role) {
    console.log("register", fullname, email, password, role);
    return axios.post(API_URL + "/register", {
      fullname,
      email,
      password,
      role,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
