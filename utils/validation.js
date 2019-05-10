// import record object field specs and required listings
const user = require('../models/user');
const loan = require('../models/loan');

// assign required lists to routes
const signin = user.signin;
const signup = user.signup;
const verify = user.verify;
// const specs = user.specs;
const apply = loan.loan;
const repayment = loan.payment;
const approve = loan.approve;

function validateEmail(email, next){
    let re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return re.test(email);
}

exports.validate = function(req, res, next){
    let must = required(req);
    let flag;
    for(let i=0; i<must.length; i++){
        if(Object.keys(req.body).indexOf(must[i])==-1){
            flag = true;
            res.status(400).json({status: 400, error: `${must[i]} missing`});
        } else if(req.body[must[i]]==''){
            flag = true;
            res.status(400).json({status: 400, error: `${must[i]} required`});
        } else if(validateType(req)){
            flag = true;
            res.status(400).json({status: 400, error: validateType(req, res)});
        } else if(must[i]==='email' && !validateEmail(req.body[must[i]])){
            flag = true;
            res.status(400).json({status: 400, error: 'invalid email'});
        }
    }
    if(!flag){
        next();
    }
};

function required(req){
    let res = '';
    if(req.url == '/signup'){
        res = signup;
    } else if(req.url == '/signin'){
        res = signin;
    } else if(req.url == '/:email/verify'){
        res = verify;
    } else if(req.url == '/loans'){
        res = apply;
    } else if(req.url == '/loans/:loanId'){
        res = approve;
    } else {
        res = repayment;
    }
    return res;
}

function validateType(req){
    let resp = '';
    let specs =  /loans/.test(req.url)?loan.specs: user.specs;
    for(let key in req.body){
        if(!(Object.keys(specs).includes(key))){
            resp += `, unknown field ${key}`;
        }
        else if(specs.key=='Float' && !parseFloat(req.body.key)){
            resp += `, ${key} should be a float`;
        }
        else if(specs.key =='Integer' && !parseInt(req.body.key)){
            resp += `, ${key} should be an integer`;
        }
        else if(typeof(req.body[key]) !== specs[key]){
            resp += `, ${key} should be a ${specs[key]}`;
        }
    }
    if(resp){
        // clean error output
        return resp.slice(2);
    }
}
