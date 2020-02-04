import BaseRepository from './BaseRepository';
import productSchema from '../schemas/ProductSchema';
/**
 * @description BaseRepository
 * @class BaseRepository
 */
class ProductRepository extends BaseRepository {
  /**
   * ProductRepository constructor
   */
  constructor({ db }) {
    super('Product', productSchema, db);
  }
}
export default ProductRepository;
