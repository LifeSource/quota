module.exports = function () {

	/*
	 *  Environment details
	 */

	var port = process.env.PORT || 3000,
		environment = process.env.NODE_ENV || "dev",
		database = {
			connectionString: "mongodb://localhost/quota"
		};
	/*
	 * File path to resources
	 */
	var root = "./",
		source = root + "src/",
		build = root + "build/",
		server = root + "src/server/",
		client = root + "src/client/",
		clientApp = client + "app/",
		css = client + "css/",
		styles = server + "styles/",
		nodeModules = root + "node_modules/",
		bowerComponents = root + "bower_components/",
		ignore = [nodeModules + "**/*", bowerComponents + "**/*"];

	var config = {
		/*
		 *  Environment and server specific configurations
		 */
		port: port,
		environment: environment,
		database: database,
		root: root,
		server: server,
		nodeServer: server + "server.js",
		nodeModules: nodeModules,
		bowerComponents: bowerComponents,
		ignore: ignore,
		/*
		 * Js files
		 */

		allJs: [
			root + "*.js",
			root + "src/**/*.js",
			"!" + ignore,
		],
		js: [
			clientApp + "common/**/*.js",
			clientApp + "*.js",
			client + "**/*.js"
		],
		/*
		 *  Client side specific configurations
		 */
		client: client,
		clientApp: clientApp,
		css: css,
		stylus: styles + "site.styl",
		index: client + "index.html",
		/*
		 * Bower and NPM specific configurations
		 */
		bower: {
			json: root + "bower.json",
			directory: bowerComponents,
			ignorePath: "../.."
		},
		/*
		 * Browser Sync configurations
		 */
		browserReloadDelay: 1000	
	};

	config.getWiredepDefaultOptions = function () {

		var options = {
			json: config.bower.json,
			directory: config.bower.directory,
			ignorePath: config.bower.ignorePath
		};
		
		return options;
	};

	return config;
};
