import App from "./classes/App";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.KEY_SECRET);

new App();
