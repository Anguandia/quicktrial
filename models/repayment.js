let repayments = require('./repayments');

exports.Repayment = class Repayment{
    // create repayment object with the given defaults
    constructor(loanId, amount, createdOn=new Date()){
        this.loanId = loanId;
        this.amount = amount;
        this.createdOn = createdOn;
        this._id = Repayment.counter;
    }
    get id(){
        return this._id;
    }

    // initialize the class instance counter
    static get counter() {
        Repayment._counter = (Repayment._counter || 0) + 1;
        return Repayment._counter;
    }

    // update parent loan and set payment history property values
    updateLoan(loan){
        loan.updateBalance(this.amount);
        // set the balance after this repayment
        this.balance = loan.balance;
        // change amount field to paid amount for history
        this.paidAmount = this.amount;
        // set the laon amount for the repayment history item
        this.amount = loan.amount;
        // set the paymentInstallment from the loan object
        this.monthlyInstallment = loan.paymentInstallment;
    }

    // push repayment object to repayments' array
    save(){
        repayments.push(this);
    }

    //return json representation of repayment
    toRepaymentJson(){
        return {
            id: this.id,
            loanId: this.loanId,
            createdOn: this.createdOn,
            amount: this.amount,
            monthlyInstallment: this.monthlyInstallment,
            paidAmount: this.paidAmount,
            balance: this.balance,
        };
    }
};

// define and export valid repayment property specifications to be validated against
exports.specs = {
    'id' : 'integer',
    'tenor' : 'integer',
    'loanId' : 'string',
    'amount' : 'float',
    'paymentInstallment' : 'float',
    'interest' : 'float',
    'paidAmount' : 'string',
    'createdOn' : 'DateTime',
    'repaid': 'boolean',
    'balance': 'float'
};

// declare and export required repayment fields for given routes for use in validation
exports.signup = [
    'tenor', 'loanId', 'amount', 'paymentInstallment', 'address',
];

exports.signin = [
    'tenor', 'paymentInstallment'
];

exports.verify = [
    'tenor', 'paidAmount'
];
