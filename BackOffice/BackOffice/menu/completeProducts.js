'use strict';
const AWS = require('aws-sdk'); 
const utils = require('common'); 


const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.completeProducts = (event) => {
    var obj = utils.menuTae()
    obj.forEach(function(item) {
        completeInfoProduct(item);
    })
    var srv = utils.menuSrv();
    srv.forEach(function(item) {
        completeInfoProduct(item);
    })
}

const completeInfoProduct = (product) => {
    product.idProducto = parseInt(product.idProducto);
    var params = {
        Key: {
         Sku:product.idProducto
        }, 
        TableName: "Products"
    };
    var updateparams = {
        TableName: "Products",
        Key: {
            Sku: product.idProducto
        },
        UpdateExpression: "set legend = :l",
        ExpressionAttributeValues: {
            ":l": product.legend.cdata
        },
        ReturnValues:"UPDATED_NEW"
    };
    dynamoDb.update(updateparams, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    })
}