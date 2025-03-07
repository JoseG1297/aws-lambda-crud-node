const {v4} = require('uuid');

exports.addTask = async (event) => {

    const { title, description} = event.body;
    const creatdAt = new Date();
    const id = v4();

    return {
        statusCode: 200,
        body: JSON.stringify({
        message: "Task created succesfuly",
        }),
    };
};
  