const mongoUtil = require("../utils");
const globalSettings = require("../settings");

const loginuser_creation=async(req,res)=>{
  
    try {
        // const { error } = validateUserInput(req.body);
        let data =await mongoUtil.gitdb(mongoUtil.gitdbcollecions.table).create({
          email:req.body.email,
          password:req.body.password,
        })  
      
        return res.status(200).json(
            {
              ...globalSettings.successResponse,
              data:globalSettings.encryptPayload(data, globalSettings.secretKey)
            }
          );
        } catch (error) {
            console.log("hello",error.message)
         return res.status(409).json(
          
            {
              ...globalSettings.failureResponse,
              data:error.message
             
            }
          );
        }
}


module.exports={
    loginuser_creation
};