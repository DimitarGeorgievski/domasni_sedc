import * as fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = `${__dirname}/homework.txt`;

const creatingFile =  (filePath, content) => {
  try {
    const fileMaker =  fs.writeFileSync(filePath, content, "utf-8");
    console.log("Your file has been created successfully!");
  } catch (error) {
    console.error(`There is a problem creating file: ${error.message}`);
  }
};
// creatingFile(filePath,"I tried to created a file")
const appendFile =  (filePath, content) => {
  try {
    const addingText =  fs.appendFileSync(
      filePath,
      `\n${content}`,
      "utf-8"
    );
    console.log("Your text has been added successfully");
  } catch (error) {
    console.error(
      `There is a problem adding your text to the file: ${error.message}`
    );
  }
};
const readFile =  (filePath) => {
  try {
    const readText = fs.readFileSync(filePath, "utf-8");
    console.log(
      `You've read your content successfully sir from: ${filePath} , also here is your data: \n${readText}`
    );
  } catch (error) {
    console.error(`There is a problem reading your file: ${error.message}`);
  }
};
// appendFile(filePath,"Ova e mojot dodaden tekst")
// appendFile(filePath,"FINISHED!")
readFile(filePath);
