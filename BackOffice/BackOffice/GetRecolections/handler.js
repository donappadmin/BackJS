'use strict';
const AWS = require('aws-sdk'); 
const utils = require('common'); 

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getRecolections = async (event) => {
    var paramsThreeshold = {
        FilterExpression: '#recover > :limit',
        ExpressionAttributeNames: {'#recover' : 'ToRecover'},
        ExpressionAttributeValues: {
            ':limit': 2400,
        },
        TableName: process.env.DYNAMODB_DON_TABLE
    };
    var paramsDate = {
        FilterExpression: '#lastpickup > :lastdate',
        ExpressionAttributeNames: {'#lastpickup' : 'lastrecolection'},
        ExpressionAttributeValues: {
            ':lastdate': utils.dateNowDiff(new Date(),-5),
        },
        TableName: process.env.DYNAMODB_DON_TABLE
    };
    const dons = await dynamoDb.scan(paramsThreeshold).promise()
    const donsFromDate = await dynamoDb.scan(paramsDate).promise()
    return utils.success({PendingRecolections : [...dons.Items,...donsFromDate.Items]})
}