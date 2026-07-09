import Service from "./index.service";

class AuthService extends Service {
  constructor(urlPrefixe) {
    super();
    this.urlPrefixe = "/api" + urlPrefixe;
  }

  signup = (requestBody) => {
    return this.service.post(this.urlPrefixe + "/signup", requestBody);
  };

  login = (requestBody) => {
    return this.service.post(this.urlPrefixe + "/login", requestBody);
  };

  verify = () => {
    return this.service.get(this.urlPrefixe + "/verify");
  };
}

const authService = new AuthService("/auth");

export default authService;
