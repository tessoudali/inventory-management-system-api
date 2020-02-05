import { Router } from 'express';

const createProductsRoute = ({ productsController }) => {
  const router = Router();
  const {
    index, show, create, update, destroy,
  } = productsController;

  router.get('/', index);
  router.get('/:id', show);
  router.post('/', create);
  router.put('/:id', update);
  router.delete('/:id', destroy);

  return router;
};

export default createProductsRoute;
