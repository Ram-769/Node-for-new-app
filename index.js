const express = require("express");
const bodyParser = require("body-parser");
const mongoUtil = require("./utils");
const globalSettings = require("./settings");
const { ObjectId } = require("mongodb");
const loginUserCntl = require("./controler/auth");
// const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
const port = 3000;
const secretKey = "Ram@123";
const CryptoJS = require("crypto-js");
function decryptPayload(encryptedPayload, secretKey) {
  const bytes = CryptoJS.AES.decrypt(encryptedPayload.data, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
}
const corsOptions = {
  origin: "http://localhost:4200", // Allow requests from your Angular application
};
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb" }));
const universalInterceptor = async (req, res, next) => {
  try {
    const encryptedPayload = req.body;

    if (encryptedPayload && encryptedPayload.data) {
      // Decrypt the payload
      const decryptedData = decryptPayload(encryptedPayload, secretKey);
      try {
        req.body = JSON.parse(decryptedData);
      } catch (e) {
        return res.status(400).json({ message: "Invalid payload format" });
      }
    }
    next(); // Pass control to the actual route handler
  } catch (error) {
    console.error("Error in universalInterceptor:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const encryptionMiddleware = (req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    if (typeof body === 'object') {
      body = globalSettings.encryptPayload(body, secretKey);
    }
    originalSend.call(this, body);
  };
  next();
};
app.use(universalInterceptor);
app.post("/login", loginUserCntl.loginuser_creation);
app.post("/otp_request", loginUserCntl.req_otp);
app.post("/sinup", loginUserCntl.sinup);
app.listen(port, async (err1) => {
  if (err1) {
    console.log(
      "\x1b[1m\x1b[31m",
      `Server failed to run on port ${port}: \n Reason: ${err1}`
    );
    return;
  }
  try {
    await mongoUtil.mongoInitializer();
  } catch (err2) {
    console.log(
      "\x1b[1m\x1b[31m",
      `Mongo failed to connect: \n Reason: ${err2}`
    );
    return;
  }
  console.log("\x1b[1m\x1b[32m", `Server is running on port ${port}`);
});
