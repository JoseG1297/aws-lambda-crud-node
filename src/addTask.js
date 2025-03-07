exports.addTask = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
        message: "Task created succesfuly",
        }),
    };
};
  