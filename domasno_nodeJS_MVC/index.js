import express from "express";
import router from "./route/trainers.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

const currentFilePath = fileURLToPath(import.meta.url);
const filePathFolder= path.dirname(currentFilePath);
const page = path.join(filePathFolder,"client");
console.log(page);
app.use("/home", express.static(page));
app.use("/home/picture.jpg", express.static(page));
app.use("/api/trainers", router)
const port = process.env.port || 3000;
const host = process.env.host || "0.0.0.0";

app.listen(port,host, () => {
    console.log(`Server is listening on port ${port}`);
})