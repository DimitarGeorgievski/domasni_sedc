import http from "node:http";
import { URLSearchParams } from "node:url";
import emiter from "./emitter.js";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("This is the main Page");
  } else if (req.url === "/student") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(
      `<h1>Student info</h1> <ul><li>Student Name: Dimitar</li><li>Student LastName: Georgievski</li><li>Academy: Qinshift</li><li>Subject: NodeJS & Express.js</li></ul>`
    );
  } else if (req.url === "/add_student") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(`
        <h1>Add Student to Class</h1>
    <form action="/all_students" method="POST">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Enter your Name">
        <button type="submit">Add Student</button>
    </form>
        `);
  } else if (req.url === "/all_students" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const data = new URLSearchParams(body);
      const name = data.get("name");
      res.writeHead(200, { "content-type": "text/html" });
      if (!name) {
        res.end("Please enter your name");
      } else {
        res.end(`<p>Student's Name: ${name}</p>`);
        emiter.emit("addedStudent", name);
      }
    });
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("404 - Not Found");
  }
});
server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
