import DocumentNotFound from './RepositoryErrors';
/**
 * @description BaseRepository
 * @class BaseRepository
 */
export default class BaseRepository {
  /**
   * constructor
   * @param {string} name
   * @param {string} schema
   */
  constructor(name, schema, db) {
    this.name = name;
    this.model = db.model(this.name, schema);
  }

  /**
   * @description Creates a new document
   * @param {object} options
   * @returns {document} Returns a newly created document
   */
  async create(options) {
    try {
      const document = await this.model.create(options);

      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Returns all documents
   * @param {object} options Query options
   * @returns {document} Returns an array of documents.
   */
  async findAll(options) {
    try {
      const documents = this.model.find(options).sort({ createdAt: -1 });

      if (!documents) throw new DocumentNotFound(`${this.name} not found`);

      return documents;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Returns all documents meeting the where clause
   * @param {object} options Query options
   * @returns {document} Returns an array of documents.
   */
  async whereIn({ key, collection }) {
    try {
      const documents = this.model.find().where(key).in(collection).exec();

      if (!documents) throw new DocumentNotFound(`${this.name} not found`);

      return documents;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Fetch document by id
   * @param {string} id Document id
   * @returns {Document} Resolves to found document.
   */
  async findById(id) {
    try {
      const document = await this.model.findOne({ _id: id });

      if (!document) throw new DocumentNotFound(`${this.name} not found`);

      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Update a document by id
   * @param {string} id
   * @param {any} options
   * @returns {Document} Updated document
   */
  async update(id, options) {
    try {
      const document = await this.model.findOneAndUpdate({ _id: id }, options, { new: true });

      if (!document) throw new DocumentNotFound(`${this.name} not found`);

      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Delete a document by id
   * @param {string} id
   * @returns {Document} Deleted document
   */
  async delete(id) {
    try {
      await this.model.deleteOne({ _id: id });

      return {
        id,
        status: 'Deleted!',
      };
    } catch (error) {
      throw error;
    }
  }
}
