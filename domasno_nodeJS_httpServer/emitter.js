import { EventEmitter } from "node:events";
import fs from "fs";

const emiter = new EventEmitter();
const appendFileAsync = function (studentName) {
  try {
    fs.appendFileSync(
      "./students.txt",
      `Added Student's Name: ${studentName}\n`,
      "utf-8"
    );
    console.log("Student successfully added!");
  } catch (error) {
    console.error(`Error adding the student: ${error.message}`);
  }
};
emiter.addListener("addedStudent", (studentName) => {
  console.log(`Student name ${studentName}`);
  appendFileAsync(studentName);
});
export default emiter;
