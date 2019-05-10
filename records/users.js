// declare empty array to store users
exports.users = [];

// define and export valid user property specifications to be validated against
exports.specs = {
    'id' : 'Integer' ,
    'email' : 'string' ,
    'firstName' : 'String' ,
    'lastName' : 'String' ,
    'password' : 'String' ,
    'address' : 'String' ,
    'status' : 'String' ,
    'isAdmin' : 'Boolean'
};

// declare and export required user fields for given routes for use in validation
exports.signup = [
    'email', 'firstName', 'lastName', 'password', 'address',
];

exports.signin = [
    'email', 'password'
];

exports.verify = [
    'email', 'status'
];
