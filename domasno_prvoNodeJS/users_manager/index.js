import { greetUser } from "./greetingService.js";
import {
  addUser,
  editUser,
  deleteAllUser,
  deleteUser,
} from "./usersService.js";

let user = {
  firstName: "Jill",
  lastName: "Wayne",
};
addUser(user);
editUser(10,"Dimitar","Georgievski","Password")
// deleteAllUser();
// deleteUser(10);
greetUser(user.firstName);
