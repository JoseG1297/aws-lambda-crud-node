const AWS = require('aws-sdk');

exports.getTasks = async (event) => {

    const dynamoDB = new AWS.DynamoDB.DocumentClient();


    try {
        const tasks = await dynamoDB.scan({
            TableName: 'taskTable'
        }).promise();

        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Tareas obtenidas correctamente', data: tasks?.Items }),
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Error al obtener la tarea en DynamoDB', msg: error }),
        };
    }
};
  