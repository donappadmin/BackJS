'use strict';
const AWS = require('aws-sdk'); 
const response = require('./libs/response'); 

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const params = {
    TableName: process.env.DYNAMODB_MENU_TABLE,
};

module.exports.GetMenu = async (event) => {
    const menuobject = await dynamoDb.scan(params).promise();
    return response.success(menuobject.Items);
};
