function buildResponse(statusCode, body) {
  return {
    statusCode,
    body: JSON.stringify(body, null, 2),
  };
}


module.exports.success = (body) => {
  return buildResponse(200, { data: body, succeeded: true, message: '', errors: null, statusCode: 200, validationErrors: null, metaData: null })
}

module.exports.error = (message, body) => {
  return buildResponse(200, { data: body, succeeded: false, message: message, errors: null, statusCode: 500, validationErrors: null, metaData: null })
}

module.exports.forbiden = (message, body) => {
  return buildResponse(403, { data: body, succeeded: false, message: message, errors: null, statusCode: 403, validationErrors: null, metaData: null })
}

const formatter = new Intl.DateTimeFormat('sv-SE', { timeZone: 'America/Mexico_City', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })

module.exports.now = () => {
  let date = new Date()
  return formatter.format(date)
}

module.exports.dateNowDiff = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return formatter.format(result);
}