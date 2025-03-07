const AWS = require('aws-sdk');

exports.getTasks = async (event) => {

    const dynamoDB = new AWS.DynamoDB.DocumentClient();


    const tasks = await dynamoDB.scan({
        TableName: 'taskTable'
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(tasks)
    }
};
  