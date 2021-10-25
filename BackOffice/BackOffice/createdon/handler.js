'use strict';
const AWS = require('aws-sdk'); 
const utils = require('common'); 
const { v4: uuidv4 } = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createDon = async (event) => {
  const don = buildDonObject(event.body);
  const insertedDon = await dynamoDb.put({ TableName: process.env.DYNAMODB_DON_TABLE, Item : don.don }).promise();
  const insertedUser = await dynamoDb.put({ TableName: process.env.DYNAMODB_USER_TABLE, Item : don.user }).promise();
  return utils.success({BranchNumber: don.don.BranchNumber});
};

function buildDonObject(request)
{
  if(typeof request === 'string')
    request = JSON.parse(request);
  let don = {
    Adress : request.Address,
    BranchID : uuidv4(), 
    BranchName : request.BranchName,
    BranchNumber : request.BranchNumber,
    City : request.City, 
    State : request.State, 
    CreatedDate : utils.now(),
    LastRecolection : undefined,
    Fees : 0, 
    Sales : 0,
    ToRecover : 0, 
    Phone : request.Phone, 
    UserName : request.Phone,
    IsActive : true, 
    FeeConfig : {Tae : 4, Services : 30 }
  } 

  let user = {
    IsActive : true,
    BranchID : don.BranchID,
    Fullname : request.FullName,
    Id : don.BranchID,
    mail : request.eMail,
    Password : request.Password, 
    Phone : request.Phone, 
    Token : '', 
    Username : request.Phone
  }
  return {don , user };
}
