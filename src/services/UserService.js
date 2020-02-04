import autoBind from 'auto-bind';

class UserService {
  /**
   * Creates an instance of UserController.
   * @param {object} param
   * @memberof UsersController
   */
  constructor({ userRepository, cache }) {
    this.userRepository = userRepository;
    this.cache = cache;
    autoBind(this);
  }

  /**
   * Retrieves a user's details
   * @param {number} - id
   * @returns {object} - user
   */
  async retrieveUser(id) {
    try {
      let user;

      user = await this.cache.getObject('user', id);
      if (user && Object.entries(user).length > 0) return user;

      user = await this.userRepository.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a user
   * @param {number} - id
   * @returns {object} - user
   */
  async createAUser(options) {
    try {
      const newUser = await this.userRepository.create(options);
      await this.cache.setObject('user', newUser.id, newUser, 86400);
      return newUser;
    } catch (error) {
      throw error;
    }
  }
}
export default UserService;
