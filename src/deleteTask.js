const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.deleteTask = async (event) => {
    const { id } = event.pathParameters; // Obtener el ID de la URL

    // Verificar si la tarea existe
    const existingTask = await dynamoDB.get({ TableName: 'taskTable', Key: { id } }).promise();
    if (!existingTask.Item) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: 'La tarea no existe' }),
        };
    }

    // Parámetros para la eliminación
    const params = {
        TableName: 'taskTable',
        Key: { id }
    };

    try {
        await dynamoDB.delete(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Tarea eliminada correctamente' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al eliminar la tarea en DynamoDB', msg: error.message }),
        };
    }
};