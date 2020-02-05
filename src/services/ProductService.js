import autoBind from 'auto-bind';

class ProductService {
  /**
   * Creates an instance of ProductService.
   * @param {object} param
   * @memberof ProductController
   */
  constructor({ productRepository, cache }) {
    this.productRepository = productRepository;
    this.cache = cache;
    autoBind(this);
  }

  /**
   * Retrieves a product's details
   * @param {number} - id
   * @returns {object} - product
   */
  async retrieveOne(id) {
    try {
      let product;

      product = await this.cache.getObject('product', id);
      if (product && Object.keys(product).length > 0) return product;

      product = await this.productRepository.findById(id);
      this.cache.setObject('product', id, product);

      return product;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves all products
   * @param {number} - id
   * @returns {object} - products
   */
  async retrieveAll(options = {}) {
    try {
      let products;

      products = await this.cache.get('products');
      if (products && Object.keys(products).length > 0) return products;

      products = await this.productRepository.findAll(options);
      this.cache.set('products', products, 86400);

      return products;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a product
   * @param {number} - id
   * @returns {object} - product
   */
  async createProduct(options) {
    try {
      const newProduct = await this.productRepository.create(options);

      await this.cache.deleteKey('products');
      this.cache.setObject('product', newProduct.id, newProduct, 86400);

      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a product
   * @param {number} - id
   * @returns {object} - product
   */
  async updateProduct(id, options) {
    try {
      const product = await this.productRepository.update(id, options);

      await this.cache.deleteKey('products');
      this.cache.setObject('product', product.id, product, 86400);

      return product;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a product
   * @param {number} - id
   * @returns {object} - product
   */
  async deleteProduct(id) {
    try {
      const product = await this.productRepository.delete(id);

      await this.cache.deleteKey('products');
      this.cache.deleteKey('product');

      return product;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;
