import { Router } from 'express';

const createProductsRoute = ({ productsController }) => {
  const {
    index, show, create, update, destroy,
  } = productsController;

  const router = Router();
  router.get('/', index);
  router.get('/:id', show);
  router.post('/', create);
  router.put('/:id', update);
  router.delete('/:id', destroy);

  return router;
};

export default createProductsRoute;
