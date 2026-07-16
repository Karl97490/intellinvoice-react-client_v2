import Service from "./index.service";

class UserService extends Service {
  constructor(urlPrefixe) {
    super();
    this.urlPrefixe = "/api" + urlPrefixe;
  }

  updateUser = (id, requestBody) => {
    return this.service.patch(this.urlPrefixe + `/${id}`, requestBody);
  };
}

const userService = new UserService("/users");

export default userService;
