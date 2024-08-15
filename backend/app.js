const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session")
const cors = require("cors");
dotenv.config();

const authenticationRouter = require("./routers/authentication")
const userRouter = require("./routers/user")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

const sessionConfig = { 
  name: 'session',
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false, 
  cookie: {
      httpOnly: true, //not accesable through javascript
      // secure: true,
      expires: Date.now() * 1000 * 60 * 60 * 24 * 1,
      maxAge: 1000 * 60 * 60 * 24 * 1
  } 
}

app.use(session(sessionConfig));

app.use(async (req, res, next) => {
  console.log("Current session: ", req.session)
  console.log("Available cookies: ", req.cookies)
  next()
})

app.use("/api", authenticationRouter)
app.use("/api/user/", userRouter)

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
