const mongoUtil = require("../utils");
const globalSettings = require("../settings");
const { sendOtpEmail } = require("../controler/nodemailer");
const loginuser_creation = async (req, res) => {
  try {
    const { email, password } = req.body;
    let existUser = await mongoUtil
      .serverdb(mongoUtil.gitdbcollecions.table)
      .findOne({ email });
    if (!existUser) {
      // email integration here i want if above the email users not existed then send the mail to them
      try {
        const otp = await sendOtpEmail(email);
        return res.status(200).json({
          ...globalSettings.successResponse,
          message: "OTP sent to your email",
          data: globalSettings.encryptPayload(
            { email, otp },
            globalSettings.secretKey
          ),
        });
      } catch (emailError) {
        return res.status(500).json({
          ...globalSettings.failureResponse,
          data: emailError.message,
        });
      }
    } else {
      // email integration here i want if above the email users not existed then send the mail to them
      try {
        const otp = await sendOtpEmail(email);
        return res.status(200).json({
          ...globalSettings.successResponse,
          message: "OTP sent to your email",
          data: globalSettings.encryptPayload(
            { email, otp },
            globalSettings.secretKey
          ),
        });
      } catch (emailError) {
        return res.status(500).json({
          ...globalSettings.failureResponse,
          data: emailError.message,
        });
      }
    }

    //  return res.status(200).json({...globalSettings.failureResponse,  message:"Invalid creditional",data:globalSettings.encryptPayload(existUser, globalSettings.secretKey)})

    // }
    // const checkPassword = await compare(password, existUser.password);
    // if(!checkPassword){
    //   return res.status(200).json({...globalSettings.failureResponse,  message:"Invalid creditional",data:globalSettings.encryptPayload(existUser, globalSettings.secretKey)})
    // }
    // return res.status(200).json(
    //     {
    //       ...globalSettings.successResponse,
    //       data:globalSettings.encryptPayload(existUser, globalSettings.secretKey)
    //     }
    //   );
  } catch (error) {
    console.log("error", error.message);
    return res.status(409).json({
      ...globalSettings.failureResponse,
      data: error.message,
    });
  }
};
const sinup = async (req, res) => {
  try {
    const { email, password } = req.body;
    let collection = await mongoUtil.serverdb(mongoUtil.serverdbcollections.table);;
    let existUser = await collection.findOne({ email });
    if (!existUser) {
    let data=  await mongoUtil.serverdb(mongoUtil.serverdbcollections.table).create(req.body)
        return res.status(200).json({
          ...globalSettings.successResponse,
          data: globalSettings.encryptPayload( data,globalSettings.secretKey)
        });
    } else {
      return res.status(409).json({
        ...globalSettings.successResponse,
        message: "Already this email was existed!",
        data: globalSettings.encryptPayload(
          { existUser },
          globalSettings.secretKey
        ),
      });
    }
  } catch (error) {
    console.log("error", error.message);
    return res.status(409).json({
      ...globalSettings.failureResponse,
      data: error.message,
      message: error.message,
    });
  }
};
const req_otp = async (req, res) => {
  try {
    const { email } = req.body;
    let existUser = await mongoUtil.serverdb(mongoUtil.serverdbcollections.table).findOne( {email} );
    if (!existUser) {
      // email integration here i want if above the email users not existed then send the mail to them
      const otp = await sendOtpEmail(email);
      return res.status(200).json({
        ...globalSettings.successResponse,
        message: "OTP sent to your email",
        data: globalSettings.encryptPayload(
          { email, otp },
          globalSettings.secretKey
        ),
      });
    } else {
      return res.status(200).json({
        ...globalSettings.successResponse,
        message: "Already this email was existed!",
        data: globalSettings.encryptPayload(
          { existUser },
          globalSettings.secretKey
        ),
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(409).json({
      ...globalSettings.failureResponse,
      data: error.message,
      message: error.message,
    });
  }
};
module.exports = {
  loginuser_creation,
  sinup,
  req_otp,
};
