import autoBind from 'auto-bind';
import moment from 'moment';
/**
 * Creates an instance of SalesController.
 */
class SalesController {
  /**
   * Creates an instance of SalesController.
   * @param {object} param
   * @memberof SalesController
   */
  constructor({ saleService, productService }) {
    this.saleService = saleService;
    this.productService = productService;
    autoBind(this);
  }

  /**
   * Retrieves all the sales
   * @param {object} req
   * @param {object} res
   * @returns {object} - sales
   */
  async index(req, res) {
    const { product_id: productId } = req.query;
    const monthOffset = req.query.month_offset || 0;
    const monthAgo = moment().subtract(monthOffset, 'months').startOf('month');
    let queryOptions = {};

    if (productId) {
      const product = await this.productService.retrieveOne(productId);
      queryOptions = { product, monthAgo };
    } else {
      queryOptions = { monthAgo };
    }

    try {
      const sales = await this.saleService.summary(queryOptions);
      return res.status(200).json(sales);
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
    const saleObject = await this.buildSaleObject(req.body.sale);

    try {
      const sale = await this.saleService.createSale(saleObject);

      return res.status(200).json(sale);
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
      const product = await this.saleService.retrieveOne(id);
      return res.status(200).json(product);
    } catch (error) {
      return res.json(error);
    }
  }

  async buildSaleObject({ product_id: productId, quantity }) {
    const product = await this.productService.retrieveOne(productId);

    return { product, quantity, amount: product.price * quantity };
  }
}

export default SalesController;
