import autoBind from 'auto-bind';
/**
   * Creates an instance of UserController.
   */
class UsersController {
  /**
   * Creates an instance of UserController.
   * @param {object} param
   * @memberof UsersController
   */
  constructor({ userService }) {
    this.userService = userService;
    autoBind(this);
  }

  /**
   * Retrieves user details
   * @param {object} req
   * @param {object} res
   *@returns {object} - user
   */
  async show(req, res) {
    const { id } = req.params;
    try {
      const user = await this.userService.retrieveUser(id);
      return res.status(200).json(user);
    } catch (error) {
      return res.json(error);
    }
  }


  /**
   * Creates new user
   * @param {object} req
   * @param {object} res
   *@returns {object} - user
   */
  async create(req, res) {
    const { sex, age, name } = req.body;
    try {
      const user = await this.userService.createAUser({ sex, age, name });
      return res.status(200).json(user);
    } catch (error) {
      return res.json(error);
    }
  }
}
export default UsersController;
