exports.authTest = (request, response)=> {
    console.log(request.param('email'), '  OK!!!');
    response.send('OK!');
};