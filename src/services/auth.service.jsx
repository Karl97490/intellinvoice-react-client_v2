import Service from "./index.service";

class AuthService extends Service {
  constructor(urlPrefixe) {
    super();
    this.urlPrefixe = "/api" + urlPrefixe;
  }

  test = () => {
    return this.service.get(this.urlPrefixe + "/test");
  };
}

const authService = new AuthService("/auth");

export default authService;
