'use strict';
const AWS = require('aws-sdk'); 
const utils = require('common'); 

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getRecolections = async (event) => {
    const params = event.queryStringParameters ?? event.body ?? {};
    const thresshold = params?.thresshold ?? 2400;
    const date = params?.date ?? utils.dateNowDiff(new Date(),-5);
    console.log(`Params to search : => ${thresshold} : ${date}`);
    var paramsThreeshold = {
        FilterExpression: '#recover > :limit',
        ExpressionAttributeNames: {'#recover' : 'ToRecover'},
        ExpressionAttributeValues: {
            ':limit': thresshold,
        },
        TableName: process.env.DYNAMODB_DON_TABLE
    };
    var paramsDate = {
        FilterExpression: '#lastpickup > :lastdate',
        ExpressionAttributeNames: {'#lastpickup' : 'lastrecolection'},
        ExpressionAttributeValues: {
            ':lastdate': date,
        },
        TableName: process.env.DYNAMODB_DON_TABLE
    };
    const dons = await dynamoDb.scan(paramsThreeshold).promise()
    const donsFromDate = await dynamoDb.scan(paramsDate).promise()
    return utils.success({PendingRecolections : [...dons.Items,...donsFromDate.Items]})
}