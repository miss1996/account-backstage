let Base64 = require('js-base64').Base64;
export default {
  baseUnilt:{
    "global": {
      "terminalCode": "0",
      "interfaceVersion": "1.0",
      "businessCode": "bookkeeping",
      "interfaceCode": "",
      "password": "123",
      "taxpayerId": "2394293749239X"
    },
    "returnStatus": {
      "code": "0000",
      "message": "5Lia5Yqh5aSE55CG5oiQ5Yqf"
    },
    "data": {
      "encryptCode": "0",
      "zipCode": "0",
      "content": ''
    }
  },
  /*加密*/
  baseEncode(content,interfaceCode){
    this.baseUnilt.data.content = Base64.encode(JSON.stringify(content));
    this.baseUnilt.global.interfaceCode = interfaceCode;
    console.log("接口请求参数:" + JSON.stringify(this.baseUnilt));
    return this.baseUnilt;
  },

  /*解密*/
  baseDecode(content){
    return JSON.parse(Base64.decode(content)) 
  },
  /*不转json 直接解密*/
  baseDecode2(content){
    return Base64.decode(content)
  }

}

