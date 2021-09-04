function buildResponse(statusCode, body) {
    return {
      statusCode,
      body: JSON.stringify(body,null,2),
    };
  }
  
module.exports.success = (body) => {
    return buildResponse(200,{data: body,succeeded: true, message: '',errors: null,statusCode:200, validationErrors: null,metaData: null})
}

module.exports.error = (message,body) => {
  return buildResponse(200,{data: body,succeeded: false, message: message,errors: null,statusCode:500, validationErrors: null,metaData: null})
}

module.exports.forbiden = (message,body) => {
  return buildResponse(403,{data: body,succeeded: false, message: message,errors: null,statusCode:403, validationErrors: null,metaData: null})
}