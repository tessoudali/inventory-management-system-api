import { Router } from 'express';

const createProductsRoute = ({ productsController }) => {
  // const {
  //   index, show, create, update, destroy,
  // } = productsController;

  const router = Router();
  router.get('/', productsController.index);
  router.get('/:id', productsController.show);
  router.post('/', productsController.create);
  router.put('/:id', productsController.update);
  router.delete('/:id', productsController.destroy);

  return router;
};

export default createProductsRoute;
