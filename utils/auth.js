const users = require('../models/users');
const loan_controller = require('../controllers/loanController');

function auth(req){
    let resp;
    if(req.headers.authorization){
        let token = req.headers.authorization.split(' ')[1];
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let buff = new Buffer(base64, 'base64');
        let payloadinit = buff.toString('ascii');
        let payload = JSON.parse(payloadinit);
        if(payload.id){
            let user = users.find(usr._id == payload.id);
            // .exec(function(err, usr){
                // if(err){return next(err);}
            if(!usr){
                resp = 'invalid token';
            } else {
                resp = [payloas.id, usr];
            }
        } else {
            resp = 'invalid token';
        }
    } else {
        resp = 'the resource you requested requires authorization, please login';
    }
    return resp;
}

exports.authClient = function(req, res, next){
    if(typeof(resp) == 'string'){
        res.status(401).json({status: 401, error: auth(req)});
    } else {
        next();
    }
};

// exports.authAdmin = function(req, res, next){
//     let id = auth(req);
//     if(typeof(id)=='object'){
//         id[1].isAdmin == false?res.status(401).json({status: 401,error: 'requires admin'}): next();
//     }
//     else {
//         res.status(401).json({status: 401, error: id});
//     }
// };

// exports.authOwner = function(req, res, next){
//     let id = auth(req);
//     if(typeof(id)=='object'){
//         (id[1]._id != id[0] || !id[1].isAdmin)?res.status(401).json({status: 401,error: 'requires owner'}): next();
//     }
//     else {
//         res.status(401).json({status: 401, error: id});
//     }
// };
