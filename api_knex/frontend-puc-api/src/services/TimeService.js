import axios from "../axios.js";

class TimeService {
  
  get() {
    return axios.get("/times");
  }

  getById(id) {
    return axios.get(`/times/${id}`);
  }

  create(data) {
    return axios.post("/times", data);
  }

  update(id, data) {
    return axios.put(`/times/${id}`, data);
  }

  delete(id) {
    return axios.delete(`/times/${id}`);
  }

}

export default new TimeService();