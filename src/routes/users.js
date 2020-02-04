import { Router } from 'express';

const createUsersRoute = ({ usersController }) => {
  const router = Router();
  router.get('/:id', usersController.show);
  router.post('/', usersController.create);
  return router;
};

export default createUsersRoute;
