import axios from "axios";

class Service {
  constructor() {
    this.service = axios.create({
      baseURL: import.meta.env.VITE_API_UR || "http://localhost:5005",
    });
    this.service.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  test = () => {
    return this.service.get("/");
  };
}

export default Service;
