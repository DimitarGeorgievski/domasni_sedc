import { greetUser } from "./greetingService.js";
import {
  addUser,
  editUser,
  deleteAllUser,
  deleteUser,
} from "./usersService.js";

let user = {
  name: "Jill",
  username: "Wayne",
  email: "JillWayne@gmail.com"
};
addUser(user);
editUser(1,"Dimitar","Georgievski","Password")
// deleteAllUser();
// deleteUser(10);
greetUser(user.name);
