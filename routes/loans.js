import express from 'express';
const router = express.Router();
import loan_controller from '../controllers/loanController';
import validation from '../utils/validation';
// import auth from '../utils/auth';

// post request for creating a loan
router.post('/', validation.validate, loan_controller.create);

// post request for loan repayment
router.post('/:loanId/repayment', validation.validate, loan_controller.repay);

// approve or reject a loan application
router.patch('/:loanId', validation.validate, loan_controller.approve);

// get a specific loan
router.get('/:loanId', loan_controller.detail);

// get all current loans
// router.get('/?status=approved&repaid=false', loan_controller.selection);

// get all repaid loans
// router.get('/?status=approved&repaid=true', loan_controller.repaid);

// get all loan applications
router.get('/', loan_controller.list);

// get a specific loan's repayment history
router.get('/:loanId/repayments', loan_controller.log);

export default router;
