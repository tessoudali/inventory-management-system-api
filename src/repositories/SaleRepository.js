import BaseRepository from './BaseRepository';
import saleSchema from '../schemas/SaleSchema';
/**
 * @description BaseRepository
 * @class BaseRepository
 */
class SaleRepository extends BaseRepository {
  /**
   * SaleRepository constructor
   */
  constructor({ db }) {
    super('Sale', saleSchema, db);
  }
}
export default SaleRepository;
