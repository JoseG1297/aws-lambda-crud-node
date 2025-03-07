const AWS = require('aws-sdk');

exports.getTask = async (event) => {

    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const { id } =  event.pathParameters;


    try {
        const tasks = await dynamoDB.get({
            TableName: 'taskTable',
            Key:{
                id: id
            }
        }).promise();

        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Tareas obtenidas correctamente', data: tasks?.Item }),
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Error al obtener la tarea en DynamoDB', msg: error }),
        };
    }
};
  