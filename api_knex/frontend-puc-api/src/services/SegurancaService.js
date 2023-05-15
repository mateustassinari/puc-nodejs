import axios from "../axios.js";

class SegurancaService {
  
  register(data) {
    return axios.post("/seguranca/register", data);
  }

  login(data) {
    return axios.post("/seguranca/login", data);
  }

}

export default new SegurancaService();