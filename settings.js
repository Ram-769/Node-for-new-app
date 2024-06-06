const CryptoJS = require('crypto-js');

function encryptPayload(data, secretKey) {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return ciphertext;
}

module.exports = {
  successResponse: { status: 200, statusMessage: 'SUCCESS' },
  failureResponse: { status: 500, statusMessage: 'FAIL' },
  mongooseOptions: {
    ssl: true,
    retryWrites: true
  },
  mongoConfigs: [
    // { url: "mongodb://127.0.0.1:27017/RestDoc", name: "restdb" },
    // { url: "mongodb://127.0.0.1:27017/Gitdb", name: "gitdb" },
 { url: "mongodb+srv://ram:ram123@ram.z1yktqb.mongodb.net/ServerDb", name: "serverdb" },
    
  ],

  secretKey: "Ram@123",
  encryptPayload
};
