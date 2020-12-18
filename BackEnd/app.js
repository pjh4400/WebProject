const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan"); //logging
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const nunjucks = require("nunjucks");
const cors = require('cors');

const connect = require("./models");

dotenv.config();
const authRouter = require("./routes/auth");
const boardRouter = require("./routes/board");
const galleryRouter = require("./routes/gallery");
const msgRouter = require("./routes/msg");
const passportConfig = require("./passport");

const app = express();
passportConfig(passport);
app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
connect();

app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json()); // 유저로부터 json 형태로 받음
app.use(bodyParser.urlencoded({ extended: true })); //유저로부터 form형태로 받음
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/img", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRouter);
app.use("/board", boardRouter);
app.use("/gallery", galleryRouter);
app.use("/msg", msgRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  console.log(err.message);
  res.status(500).json({ message: "서버 에러 발생" });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
