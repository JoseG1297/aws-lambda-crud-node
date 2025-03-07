const {v4} = require('uuid');
const AWS = require('aws-sdk');

exports.addTask = async (event) => {

    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const { title, description } = JSON.parse(event.body); // Aquí se corrige el error
    const createdAt = new Date();
    const id = v4();

    const task = {
        id: id,
        title: title,
        description: description,
        createdAt: createdAt
    };
    

    const params = {
        TableName: 'taskTable',
        Item: task
    };

    try {
        await dynamoDB.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Tarea guardada correctamente', data: task }),
        };
        } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al guardar la tarea en DynamoDB', msg: error.message }),
        };
    }
};
  