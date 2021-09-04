'use strict';
import { success } from './libs/response'; 

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const params = {
    TableName: process.env.DYNAMODB_MENU_TABLE,
};

module.exports.GetMenu = async (event) => {
    const menuobject = await dynamoDb.scan(params).promise();
    return {
        statusCode: 200,
        body: success(menuobject.Items),
    };
};
