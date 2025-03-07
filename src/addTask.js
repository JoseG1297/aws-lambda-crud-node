const {v4} = require('uuid');
const AWS = require('aws-sdk');

exports.addTask = async (event) => {

    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const { title, description} = event.body;
    const creatdAt = new Date();
    const id = v4();

    const newTask ={
        id,
        title,
        description,
        creatdAt
    }

    await dynamoDB.put({
        TableName: 'taskTable',
        Item: newTask
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify(newTask)
    }
};
  