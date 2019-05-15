import loans from '../models/loans';
import repayments from '../models/repayments';
import {Loan} from '../models/loan';
import {Repayment} from '../models/repayment';

// create loan
export const create = function(req, res){
    let loan = new Loan();
    Object.assign(loan, req.body);
    // check if requesting client has a current loan
    let existing = loans.find((one) => one.user == loan.user && one.status != 'repaid');
    if(existing){
        res.status(403).json({status: 403, error: 'you have a running loan'});
    } else {
        // loan.interest = 0.05*req.body.amount;
        // loan.paymentInstallment = req.body.amount*1.05/req.body.tenor;
        loan.save();
        res.status(201).json({status: 201, data: loan.toLoanJson()});
    }
};

// get all, current or repaid loans
export const list = function(req, res){
    let selection;
    if(req.query.status){
        // convert string status representation inquery to boolean
        let status = req.query.status=='true'?true: false;
        selection = loans.filter(one => one.status === req.query.status &
            one.repaid === status);
    } else {
        selection = loans;
    }
    res.status(200).json({status: 200, data: selection.map(loan => loan.toLoanJson())});
};

// get specific loan details
export const detail = function(req, res){
    let loan = loans.find((target) => target._id == req.params.loanId);
    if(!loan){
        res.status(404).json({status: 404, error: `loan with id ${req.params.loanId} does not exist`});
    } else {
        res.status(200).json({status: 200, data: loan.toLoanJson()});
    }
};

// approve a loan
export const approve = function(req, res){
    let loan = loans.find((one) => one._id == req.params.loanId);
    if(!loan){
        res.status(404).json({status: 404, error: `no loan with id ${req.params.loanId}`});
    } else {
        loan.approve(req.body.status);
        res.status(200).json({status: 200, data: loan.toLoanJson()});
    }
};

// post a repayment installment
export const repay = function(req, res){
    let loan = loans.find(one => one._id == req.params.loanId);
    if(!loan){
        res.status(404).json({status: 404, error: `no loan with id ${req.params.loanId}`});
    }
    else if(loan.status != 'approved'){
        res.status(403).json({status: 403, error: 'loan not approved'});
    }
    else if(loan.repaid==true){
        res.status(403).json({status: 403, error: 'loan already fully serviced!'});
    }
    else {
        let repayment = new Repayment();
        Object.assign(repayment, {amount: req.body.amount, loanId: req.params.loanId});
        repayment.updateLoan(loan);
        repayment.save();
        res.status(200).json({status: 200, data: repayment.toRepaymentJson()});
    }
};

// get repaymnt history
export const log = function(req, res){
    if(!loans.find(one => one._id == req.params.loanId)){
        res.status(404).json({status: 404, error: `loan ${req.params.loanId} not found`});
    } else {
        let log = repayments.filter(rep => rep.loanId == req.params.loanId);
        log.map(one => one.toRepaymentJson());
        res.status(200).json({status: 200, data: log});
    }
};
