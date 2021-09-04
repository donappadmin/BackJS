function buildResponse(statusCode, body) {
    return {
      statusCode,
      body: JSON.stringify(body),
    };
  }
  
export function success(body) {
    return buildResponse(200,{data: body,succeeded: true, message: '',errors: null,statusCode:200, validationErrors: null,metaData: null})
}


export const FailResponse = (message,data) => {
    return JSON.stringify(
        {
            statusCode: 500,
            succeeded: false, 
            message: message,
            errors : null,
            validationErrors : null, 
            data: data,
            metaData : null
        },
        null,
        2
    )
}

export const Response = (statusCode,message,data) => {
    return JSON.stringify(
        {
            statusCode: statusCode,
            succeeded: statusCode === 200, 
            message: message,
            errors : null,
            validationErrors : null, 
            data: data,
            metaData : null
        },
        null,
        2
    )
}