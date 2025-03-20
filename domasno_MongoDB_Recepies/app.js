import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.config.js";
import router from "./routes/recipes.routes.js";

dotenv.config();

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use("/recipes", router);
app.get("/health", (req,res) => {
    res.json({ status: "ok"});
});

async function startServer() {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        })
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}
startServer();