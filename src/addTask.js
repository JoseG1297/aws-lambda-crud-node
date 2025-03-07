const {v4} = require('uuid');
const AWS = require('aws-sdk');

exports.addTask = async (event) => {

    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const { title, description} = event.body;
    const creatdAt = new Date();
    const id = v4();

    const task = {
        id: id,
        title: title,
        description: description,
        creatdAt
    };
    

    const params = {
        TableName: 'taskTable',
        Item: task
    };

    try {
        await dynamoDb.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Tarea guardada correctamente', data: task }),
        };
        } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al guardar la tarea en DynamoDB' }),
        };
    }
};
  