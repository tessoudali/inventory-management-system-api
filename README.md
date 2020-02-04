<h1 align="center">Inventory Management System API</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/ebukaume/inventory-management-system-api#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/ebukaume/inventory-management-system-api/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
</p>

<br>

This is a framework for easily setting up a node app (API specifically). Dependecies are mostly injected into an IoC container ([Awilix](https://www.npmjs.com/package/awilix) in this case). It tries to enforce reuseability, separation of concern and SRP (Single Responsiblity Principle).

![App directory structure](./docs/dir_structure.png)


## Dependencies

- [Babel](https://babeljs.io/en/setup)
- [auto-bind](https://www.npmjs.com/package/auto-bind)
- [awilix](https://www.npmjs.com/package/awilix)
- [others...](https://github.com/ebukaume/inventory-management-system-api/blob/master/package.json)


## Usage

> Install [MongoDB](https://www.mongodb.com/what-is-mongodb) and [Redis](https://redis.io/download)

> Clone the repository to your local machine
```sh
$ git clone https://github.com/ebukaume/inventory-management-system-api.git
```

> Navigate into the project directory
```sh
$ cd inventory-management-system-api
```

> Set up environment variables
```sh
$ cp env.sample .env
# [NOTE]: Make sure to provide the necessary environment variables inside the .env file
```

> Fill in the environment variables. NB: `'NODE_ENV', 'PORT', 'API_PREFIX'` are *REQUIRED*

> Install the dependencies
```sh
$ npm install
```

> Start the server. _Make sure your mongoDB deamon and redis client are running_
```sh
$ npm start
```

> Then open your browser and visit `http://127.0.0.1:3000/api/status`. You should see `{"status":"OK"}`. You can also use postman to issue the `GET` request to the status endpoint.

NB: 3000 is the default port when you don't supply a port in the .env; 127.0.0.1 is the default host as well.


## Author

👤 **Ebuka UMEOKONKWO**

- Github: [@ebukaume](https://github.com/ebukaume)
- Twitter: [@ebukaume](https://twitter.com/ebukaume)
- Linkedin: [Ebuka Umeokonkwo](https://www.linkedin.com/in/ebukaume)


## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/ebukaume/inventory-management-system-api/issues).

1. Fork it (https://github.com/ebukaume/inventory-management-system-api.git/fork)
2. Create your working branch (git checkout -b [choose-a-name])
3. Commit your changes (git commit -am 'what this commit will fix/add/improve')
4. Push to the branch (git push origin [chosen-name])
5. Create a new Pull Request


## Show your support

Give a ⭐️ if you like this project!
