import Service from "./index.service";

class UserService extends Service {
  constructor(urlPrefixe) {
    super();
    this.urlPrefixe = "/api" + urlPrefixe;
  }
}

const userService = new UserService("/users");

export default userService;
