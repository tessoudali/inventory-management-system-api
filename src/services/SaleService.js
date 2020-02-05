import autoBind from 'auto-bind';

class SaleService {
  /**
   * Creates an instance of SaleService.
   * @param {object} param
   * @memberof SalesController
   */
  constructor({ saleRepository, cache }) {
    this.saleRepository = saleRepository;
    this.cache = cache;
    autoBind(this);
  }

  /**
   * Retrieves a sale's details
   * @param {number} - id
   * @returns {object} - sale
   */
  async retrieveOne(id) {
    try {
      let sale;

      if (sale && Object.keys(sale).length > 0) return sale;

      sale = await this.saleRepository.findById(id);

      return sale;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves a sales summary
   * @param {object} - option
   * @returns {object} - sale
   */
  async summary({ monthAgo, product }) {
    try {
      const sales = product
        ? await this.saleRepository.findAll({ createdAt: { $gte: monthAgo }, product })
        : await this.saleRepository.findAll({ createdAt: { $gte: monthAgo } });

      return sales;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves a sale's details where in
   * @param {object} - option
   * @returns {object} - sale
   */
  async retrieveWhereIn(key, collection) {
    try {
      const sale = await this.saleRepository.where({ key, collection });

      return sale;
    } catch (error) {
      throw error;
    }
  }


  /**
   * Retrieves all sales
   * @param {number} - id
   * @returns {object} - sales
   */
  async retrieveAll() {
    try {
      let sales;

      if (sales && Object.keys(sales).length > 0) return sales;

      sales = await this.saleRepository.findAll({});

      return sales;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a sale
   * @param {number} - id
   * @returns {object} - sale
   */
  async createSale(options) {
    try {
      const newsale = await this.saleRepository.create(options);

      return newsale;
    } catch (error) {
      throw error;
    }
  }
}

export default SaleService;
