import { error } from "console";
import fs from "fs";
import { json } from "stream/consumers";

// Function to read existing users from users.json file
try {
  const existingUsers = fs.readFileSync("users.json", "utf8");
  const parsedUsers = JSON.parse(existingUsers);
  console.log(parsedUsers);
} catch (error) {
  console.log("Error reading file", error);
}

const getUserById = (userId) => {
  const existingUsers = fs.readFileSync("users.json", "utf8");
  const parsedUsers = JSON.parse(existingUsers);
  const foundUser = parsedUsers.find((user) => user.id === userId);
  //   if (!foundUser) {
  //     return {};
  //   }
  //   return foundUser;

  //   return foundUser ? foundUser : {}; // ternary operator
  return foundUser ?? {}; // nullish coalescing operator
};

const foundUser = getUserById(100);
console.log(foundUser);

export const addUser = (user) => {
  const existingUsers = fs.readFileSync("users.json", "utf8");
  const parsedUsers = JSON.parse(existingUsers);
  const newUserId = parsedUsers.length + 1;
  const newUser = {
    id: newUserId,
    name: user.name,
    username: user.username,
    email: user.email,
  };
  parsedUsers.push(newUser);
  fs.writeFileSync("users.json", JSON.stringify(parsedUsers), null, 2);
  fs.appendFileSync(
    "logs.txt",
    `\n[${new Date().toISOString()}] Action Performed: Added User ${newUser.id}`
  );
};
export const editUser = (id, name, username, password) => {
  const users = fs.readFileSync("users.json", "utf-8");
  const parsedUsers = JSON.parse(users);
  const user = parsedUsers.find((user) => user.id === id);
  if (user) {
    user.name = name;
    user.username = username;
    user.password = password;
  } else {
    console.log("User not found");
  }
  fs.writeFileSync("users.json", JSON.stringify(parsedUsers), null, 2);
  fs.appendFileSync(
    "logs.txt",
    `\n[${new Date().toISOString()}] Action Performed: Edited user ${id}`
  );
};
export const newUser = {
  name: "Bob",
  username: "bobbobsky",
  email: "bob@email.com",
};
export const deleteUser = (id) => {
  const users = fs.readFileSync("users.json", "utf-8");
  const parsedUsers = JSON.parse(users);
  const user = parsedUsers.find((user) => user.id === id);
  if (user) {
    parsedUsers.splice(parsedUsers.indexOf(user));
  }
  fs.writeFileSync("users.json", JSON.stringify(parsedUsers), null, 2);
  fs.appendFileSync(
    "logs.txt",
    `\n[${new Date().toISOString()}] Action Performed: Deleted User ${id}`
  );
};
export const deleteAllUser = () => {
  fs.writeFileSync("users.json", JSON.stringify([], null, 2));
  fs.appendFileSync(
    "logs.txt",
    `\n[${new Date().toISOString()}] Action Performed: Deleted All Users`
  );
}
// addUser(newUser);
// editUser(12, "Petar", "Shengovski", "123456");
// deleteUser(16);
// deleteAllUser();