const users = require('../models/users');
const User = require('../models/user').User;
// let async = require('async');

//helpers
// let val = function(arr, msg='^ is required'){
//     let errors = [];
//     for(let v of arr){
//         errors.push(body(v).not().isEmpty().withMessage(msg.replace('^', v)).trim());
//     }
//     return errors;
// };

// function queryString(obj){
//     return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
// }

//get a list of all users
exports.user_list = function(req, res){
    res.status(200).json({status: 200, data: users});
};

//handle post request for signup
exports.signup = function(req, res, next){
    let data = req.body;
    let user = new User();
    Object.assign(user, data);
    if(users.find(target => target.email===user.email)){
        res.status(400).json(
            {status: 400, error: `Account '${user.email}' exists, please signin`}
            );
    } else {
        user.setPassword(data.password);
        res.status(201).json({status: 201, data: user.toAuthJson()});
        user.save();
    }
};

//handle signin post request
exports.signin = function(req, res){
    // check if email and paassword key names in request
    // for(let key of ['email', 'password']){
    //     if(Object.keys(req.body).indexOf(key)==-1){
    //         res.status(400).json({status: 400, error: `${key} key missing or wrong`});
    //     }
    // }
    let user = users.find((target) => target.email === req.body.email);
    if(!user){
        res.status(404).json({status: 404, error: 'user not found'});
    } else if(user.validatePassword(req.body.password)){
        res.status(200).json({status: 200, data: user.toAuthJson()});
    } else {
        res.status(401).json({error: 'Wrong password'});
    }
};

//hanle signout post request
exports.signout = function(req, res){
    // res.redirect('/users/signin?msg=signout successful')
};

//handle user update post request
exports.update = function(req, res){
    let data = req.body;
    let user = users.find((target) => target.email === req.params.email);
    if(!user){
        res.status(400).json({status: 400, error: 'wrong email'});
    } else if(['verified', 'unverified'].includes(data.status)){
        Object.assign(user, {status: data.status});
        // filter out properties unwanted in the response
        // let {tel, username, salt, _id, hash, isAdmin, ...filtered} = user;
        res.status(200).json({status: 200, data: user});
    } else {
        res.status(400).json({error: 'invalid status'});
    }
};

//handle user deletion post request
exports.delete = function(req, res){
    let user = users.find((target) => target.email === req.params.email);
    if(!user){
        res.status(404).json({status: 404, error: 'user does not exist'});
    } else {
        res.status(200).json({status: 200, data: {id: user.id, msg: `user ${user.firstName +' '+ user.lastName} deleted`}});
    }
};

//display a particular user's profile page
exports.details = function(req, res){
    let user = users.find((target) => target.email === req.params.email);
    if(!user){
        res.status(404).json({status: 404, error: `user with email ${req.params.email} does not exist`});
    } else {
        // filter out undisplay-worthy properties of user by estructuring
        // const {hash, salt, ...filtered} = user;
        res.status(200).json({status: 200, data: user});
    }
};
