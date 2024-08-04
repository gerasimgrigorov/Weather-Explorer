const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();

const authenticationRouter = require("./routers/authentication")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use("/api", authenticationRouter)

app.listen(PORT, () => {
  console.log(`LISTENING ON ${PORT}`);
});
