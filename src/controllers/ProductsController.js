import autoBind from 'auto-bind';
/**
 * Creates an instance of ProductsController.
 */
class ProductsController {
  /**
   * Creates an instance of ProductsController.
   * @param {object} param
   * @memberof ProductsController
   */
  constructor({ productService }) {
    this.productService = productService;
    autoBind(this);
  }

  /**
   * Retrieves all the products
   * @param {object} req
   * @param {object} res
   * @returns {object} - products
   */
  async index(req, res) {
    try {
      const products = await this.productService.retrieveAll();
      return res.status(200).json(products);
    } catch (error) {
      return res.json(error);
    }
  }

  /**
   * Creates new product
   * @param {object} req
   * @param {object} res
   * @returns {object} - product
   */
  async create(req, res) {
    const { name, price } = req.body;

    try {
      const product = await this.productService.createProduct({ name, price });
      return res.status(200).json(product);
    } catch (error) {
      return res.json(error);
    }
  }

  /**
   * Retrieves a product's details
   * @param {object} req
   * @param {object} res
   * @returns {object} - product
   */
  async show(req, res) {
    const { id } = req.params;

    try {
      const product = await this.productService.retrieveOne(id);
      return res.status(200).json(product);
    } catch (error) {
      return res.json(error);
    }
  }

  /**
   * Updates a product
   * @param {object} req
   * @param {object} res
   * @returns {object} - product
   */
  async update(req, res) {
    const { id } = req.params;
    const updateParams = await this.whitelistParams(req.body);

    try {
      const product = await this.productService.updateProduct(id, updateParams);
      return res.status(200).json(product);
    } catch (error) {
      return res.json(error);
    }
  }

  /**
   * Deletes a product
   * @param {object} req
   * @param {object} res
   * @returns {object} - product
   */
  async destroy(req, res) {
    const { id } = req.params;
    try {
      const product = await this.productService.deleteProduct(id);
      return res.status(200).json(product);
    } catch (error) {
      return res.json(error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async whitelistParams(options) {
    const { name, price } = options;

    const params = { name, price };

    return Object.entries(params).reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = value;
        return acc;
      }
      return acc;
    }, {});
  }
}

export default ProductsController;
