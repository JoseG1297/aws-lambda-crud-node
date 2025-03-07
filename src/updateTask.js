const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.updateTask = async (event) => {
    // Parsear el cuerpo de la solicitud
    const { title, description } = JSON.parse(event.body);
    const { id } =  event.pathParameters;


    // Parámetros para la actualización
    const params = {
        TableName: 'taskTable',
        Key: {
            id: id // Clave primaria
        },
        UpdateExpression: 'set #title = :title, #description = :description',
        ExpressionAttributeNames: {
            '#title': 'title',
            '#description': 'description'
        },
        ExpressionAttributeValues: {
            ':title': title,
            ':description': description
        },
        ReturnValues: 'UPDATED_NEW' // Retorna solo los atributos actualizados
    };

    try {
        const result = await dynamoDB.update(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Tarea actualizada correctamente', data: result.Attributes }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al actualizar la tarea en DynamoDB', msg: error.message }),
        };
    }
};