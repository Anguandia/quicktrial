import express from 'express';
const router = express.Router();
import user_controller from '../controllers/userController';
// import validation from '../utils/validation';

/* GET users' listing. */
router.get('/', user_controller.user_list);

//post request for updating a user
router.patch('/:email/verify', user_controller.update);

//post request for deleting a user
router.delete('/:email', user_controller.del);

//route to display a particular user's details
router.get('/:email', user_controller.details);

export default router;
